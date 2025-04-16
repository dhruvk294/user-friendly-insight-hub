
import { FormData, PredictionResult, predictHeartDisease } from "./heart-disease-utils";

// Simulated user history storage
let predictionHistory: Array<{
  id: string;
  timestamp: string;
  formData: FormData;
  result: PredictionResult;
}> = [];

// Generate a random ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Save prediction to history
export const savePrediction = async (formData: FormData): Promise<PredictionResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Get prediction
  const result = predictHeartDisease(formData);
  
  // Save to history
  const entry = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    formData,
    result
  };
  
  predictionHistory.push(entry);
  
  return result;
};

// Get prediction history
export const getPredictionHistory = async (): Promise<any[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [...predictionHistory];
};

// Clear prediction history
export const clearPredictionHistory = async (): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  predictionHistory = [];
};

// Export some sample data for testing/development
export const sampleFormData: FormData = {
  age: 62,
  sex: "0",
  cp: "0",
  trestbps: 140,
  chol: 268,
  fbs: "0",
  restecg: "0",
  thalach: 160,
  exang: "0",
  oldpeak: 3.6,
  slope: "0",
  ca: "2",
  thal: "2"
};
