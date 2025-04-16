
// Types for heart disease dataset

export interface HeartDiseaseDataset {
  age: number;          // Age in years
  sex: number;          // Sex (1 = male, 0 = female)
  cp: number;           // Chest pain type (0-3)
  trestbps: number;     // Resting blood pressure in mm Hg
  chol: number;         // Serum cholesterol in mg/dl
  fbs: number;          // Fasting blood sugar > 120 mg/dl (1 = true, 0 = false)
  restecg: number;      // Resting electrocardiographic results (0-2)
  thalach: number;      // Maximum heart rate achieved
  exang: number;        // Exercise induced angina (1 = yes, 0 = no)
  oldpeak: number;      // ST depression induced by exercise relative to rest
  slope: number;        // Slope of the peak exercise ST segment (0-2)
  ca: number;           // Number of major vessels colored by fluoroscopy (0-4)
  thal: number;         // Thalassemia (0-3)
  target: number;       // Heart disease target (1 = disease, 0 = no disease)
}

export interface FeatureExplanation {
  name: string;
  description: string;
  range?: string;
  values?: Record<string, string>;
  unit?: string;
  importance: string;
}

export const featureExplanations: Record<string, FeatureExplanation> = {
  age: {
    name: "Age",
    description: "Age of the patient in years",
    importance: "Higher age correlates with increased risk of heart disease"
  },
  sex: {
    name: "Sex",
    description: "Gender of the patient",
    values: { "0": "Female", "1": "Male" },
    importance: "Males are statistically at higher risk for heart disease"
  },
  cp: {
    name: "Chest Pain Type",
    description: "Type of chest pain experienced",
    values: { 
      "0": "Typical Angina", 
      "1": "Atypical Angina", 
      "2": "Non-Anginal Pain", 
      "3": "Asymptomatic" 
    },
    importance: "Different types of chest pain indicate different levels of heart disease risk"
  },
  trestbps: {
    name: "Resting Blood Pressure",
    description: "Resting blood pressure measured in mm Hg",
    unit: "mm Hg",
    importance: "High blood pressure is a major risk factor for heart disease"
  },
  chol: {
    name: "Serum Cholesterol",
    description: "Serum cholesterol level measured in mg/dl",
    unit: "mg/dl",
    importance: "High cholesterol can lead to arterial plaque buildup and heart disease"
  },
  fbs: {
    name: "Fasting Blood Sugar",
    description: "Fasting blood sugar > 120 mg/dl",
    values: { "0": "False", "1": "True" },
    importance: "High blood sugar may indicate diabetes, a risk factor for heart disease"
  },
  restecg: {
    name: "Resting ECG",
    description: "Resting electrocardiographic results",
    values: { 
      "0": "Normal", 
      "1": "ST-T Wave Abnormality", 
      "2": "Left Ventricular Hypertrophy" 
    },
    importance: "Abnormal ECG results can indicate existing heart problems"
  },
  thalach: {
    name: "Maximum Heart Rate",
    description: "Maximum heart rate achieved during exercise",
    unit: "bpm",
    importance: "Lower max heart rate can indicate cardiovascular issues"
  },
  exang: {
    name: "Exercise Induced Angina",
    description: "Angina (chest pain) induced by exercise",
    values: { "0": "No", "1": "Yes" },
    importance: "Exercise-induced chest pain is a strong indicator of heart disease"
  },
  oldpeak: {
    name: "ST Depression",
    description: "ST depression induced by exercise relative to rest",
    unit: "mm",
    importance: "Greater ST depression can indicate serious heart issues"
  },
  slope: {
    name: "ST Slope",
    description: "Slope of the peak exercise ST segment",
    values: { "0": "Upsloping", "1": "Flat", "2": "Downsloping" },
    importance: "The slope pattern can indicate different heart conditions"
  },
  ca: {
    name: "Major Vessels",
    description: "Number of major vessels colored by fluoroscopy",
    range: "0-4",
    importance: "More colored vessels indicates more severe coronary artery disease"
  },
  thal: {
    name: "Thalassemia",
    description: "Blood disorder called thalassemia",
    values: { 
      "0": "Normal", 
      "1": "Fixed Defect", 
      "2": "Reversible Defect",
      "3": "Unknown"
    },
    importance: "Abnormal thalassemia results can indicate heart issues"
  }
};
