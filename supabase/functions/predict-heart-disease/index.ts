
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const HUGGINGFACE_API_TOKEN = Deno.env.get('HUGGINGFACE_API_TOKEN');
const MODEL_ENDPOINT = "https://api-inference.huggingface.co/models/sinansahinbas/heart-disease-prediction";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData } = await req.json();
    
    // Format the data for the model
    const modelInput = prepareModelInput(formData);
    
    // Make prediction request to Hugging Face
    const response = await fetch(MODEL_ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: modelInput }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error("Model API error:", error);
      throw new Error(`Model API error: ${error}`);
    }

    const result = await response.json();
    console.log("Raw model result:", result);
    
    // Process the model output into our expected format
    const processedResult = processModelOutput(result, formData);
    
    return new Response(
      JSON.stringify(processedResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in prediction:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to process prediction", 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Prepare the model input in the format expected by the HF model
function prepareModelInput(formData) {
  // Convert categorical variables to numerical values as expected by the model
  return [
    parseInt(formData.age),
    parseInt(formData.sex),
    parseInt(formData.cp),
    parseInt(formData.trestbps),
    parseInt(formData.chol),
    parseInt(formData.fbs),
    parseInt(formData.restecg),
    parseInt(formData.thalach),
    parseInt(formData.exang),
    parseFloat(formData.oldpeak),
    parseInt(formData.slope),
    parseInt(formData.ca),
    parseInt(formData.thal)
  ];
}

// Process the model output into our application's expected format
function processModelOutput(modelOutput, formData) {
  // Extract probability from model output (adjust based on actual model response)
  // This example assumes the model returns a probability score
  let probability = 0.5; // Default fallback
  
  if (Array.isArray(modelOutput) && modelOutput.length > 0) {
    if (modelOutput[0].hasOwnProperty('score')) {
      probability = modelOutput[0].score;
    } else if (modelOutput[0].hasOwnProperty('probability')) {
      probability = modelOutput[0].probability;
    } else if (typeof modelOutput[0] === 'number') {
      probability = modelOutput[0];
    }
  }
  
  // Determine predicted class (1 for disease, 0 for no disease)
  const prediction = probability > 0.5 ? 1 : 0;
  
  // Generate risk factors with relative contributions
  // This is a simplified approach - in a real scenario, you might use SHAP values or other methods
  // to determine feature importance from the model
  const riskFactors = generateRiskFactors(formData);
  
  return {
    prediction,
    probability,
    riskFactors
  };
}

// Generate risk factors based on input data
// This is still simplified but more realistic than the current implementation
function generateRiskFactors(formData) {
  const factors = [
    { name: 'age', contribution: formData.age > 50 ? 25 : 5 },
    { name: 'sex', contribution: formData.sex === "1" ? 15 : 5 },
    { name: 'cp', contribution: parseInt(formData.cp) >= 2 ? 20 : 3 },
    { name: 'trestbps', contribution: formData.trestbps > 140 ? 12 : 2 },
    { name: 'chol', contribution: formData.chol > 240 ? 18 : 3 },
    { name: 'thalach', contribution: formData.thalach < 140 ? 10 : 2 },
    { name: 'exang', contribution: formData.exang === "1" ? 15 : 0 },
    { name: 'oldpeak', contribution: formData.oldpeak > 2 ? 20 : formData.oldpeak > 1 ? 10 : 2 },
    { name: 'ca', contribution: parseInt(formData.ca) > 0 ? 12 * parseInt(formData.ca) : 1 },
    { name: 'thal', contribution: parseInt(formData.thal) !== 2 ? 15 : 0 }
  ];
  
  // Sort and normalize contributions
  factors.sort((a, b) => b.contribution - a.contribution);
  const totalContribution = factors.reduce((sum, factor) => sum + factor.contribution, 0);
  
  return factors.map(factor => ({
    name: factor.name,
    contribution: (factor.contribution / totalContribution) * 100
  })).slice(0, 5); // Return top 5 factors
}
