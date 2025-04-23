
import { FormData, predictHeartDisease } from "./heart-disease-utils";

// This simulates saving the prediction to a database and returns the prediction
// In a real application, this would be an API call to the backend
export async function savePrediction(formData: FormData) {
  // Add a small delay to simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Get prediction from our ML model
  const result = await predictHeartDisease(formData);
  
  return result;
}
