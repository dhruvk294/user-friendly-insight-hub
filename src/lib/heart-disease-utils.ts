
export interface FormData {
  age: number;
  sex: string;
  cp: string;
  trestbps: number;
  chol: number;
  fbs: string;
  restecg: string;
  thalach: number;
  exang: string;
  oldpeak: number;
  slope: string;
  ca: string;
  thal: string;
}

export interface RiskFactor {
  name: string;
  contribution: number;
}

export interface PredictionResult {
  prediction: number;
  probability: number;
  riskFactors: RiskFactor[];
}

export const riskFactorLabels: Record<string, string> = {
  age: "Age",
  sex: "Gender",
  cp: "Chest Pain",
  trestbps: "Blood Pressure",
  chol: "Cholesterol",
  fbs: "Blood Sugar",
  restecg: "Resting ECG",
  thalach: "Max Heart Rate",
  exang: "Exercise Angina",
  oldpeak: "ST Depression",
  slope: "ST Slope",
  ca: "Major Vessels",
  thal: "Thalassemia"
};

export const fieldDescriptions: Record<string, string> = {
  age: "Age in years",
  sex: "Gender (1 = male, 0 = female)",
  cp: "Chest pain type (0-3)",
  trestbps: "Resting blood pressure (mm Hg)",
  chol: "Serum cholesterol (mg/dl)",
  fbs: "Fasting blood sugar > 120 mg/dl (1 = true, 0 = false)",
  restecg: "Resting electrocardiographic results (0-2)",
  thalach: "Maximum heart rate achieved",
  exang: "Exercise induced angina (1 = yes, 0 = no)",
  oldpeak: "ST depression induced by exercise relative to rest",
  slope: "Slope of the peak exercise ST segment (0-2)",
  ca: "Number of major vessels colored by fluoroscopy (0-4)",
  thal: "Thalassemia (0-3)"
};

// Default form values
export const defaultFormValues: FormData = {
  age: 45,
  sex: "1",
  cp: "0",
  trestbps: 120,
  chol: 200,
  fbs: "0",
  restecg: "0",
  thalach: 150,
  exang: "0",
  oldpeak: 1.0,
  slope: "1",
  ca: "0",
  thal: "2"
};

// This is a simplified implementation for frontend purposes
// In a real application, prediction would happen on the backend
export const predictHeartDisease = (formData: FormData): PredictionResult => {
  // Generate a probability score - this is just a dummy implementation
  const factors = {
    age: formData.age > 50 ? 0.2 : 0.05,
    sex: formData.sex === "1" ? 0.1 : 0.05,
    cp: parseInt(formData.cp) >= 2 ? 0.15 : 0.02,
    trestbps: formData.trestbps > 140 ? 0.1 : 0.02,
    chol: formData.chol > 240 ? 0.15 : 0.03,
    thalach: formData.thalach < 140 ? 0.1 : 0,
    exang: formData.exang === "1" ? 0.15 : 0,
    oldpeak: formData.oldpeak > 2 ? 0.15 : formData.oldpeak > 1 ? 0.05 : 0,
    ca: parseInt(formData.ca) > 0 ? 0.1 * parseInt(formData.ca) : 0,
  };
  
  // Calculate a weighted probability
  const baseProb = 0.2; // Base probability
  const weightedSum = Object.values(factors).reduce((sum, factor) => sum + factor, 0);
  let probability = baseProb + weightedSum;
  
  // Ensure probability is between 0 and 1
  probability = Math.min(Math.max(probability, 0), 0.95);
  
  // Calculate risk factors with their relative contributions
  const riskFactors = Object.entries(factors)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: key,
      contribution: (value / weightedSum) * 100
    }))
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 5); // Top 5 risk factors
  
  return {
    prediction: probability > 0.5 ? 1 : 0,
    probability: probability,
    riskFactors: riskFactors
  };
};
