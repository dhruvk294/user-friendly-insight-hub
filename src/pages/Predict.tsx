
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import { FormData, defaultFormValues } from "@/lib/heart-disease-utils";

export default function Predict() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(defaultFormValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would send this data to the backend for prediction
    // For now, we'll just navigate to the results page with the data as state
    navigate("/results", { state: { formData } });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12 px-4 input-gradient">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Heart Disease Risk Prediction</h1>
            <p className="text-muted-foreground mt-2">
              Fill in your health parameters below to get your personalized prediction
            </p>
          </div>

          <Card className="glass-card animate-in">
            <CardHeader>
              <CardTitle>Enter Your Health Data</CardTitle>
              <CardDescription>
                All fields are required for an accurate prediction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Age */}
                  <div className="space-y-2">
                    <Label htmlFor="age">Age (years)</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      min="20"
                      max="100"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Sex */}
                  <div className="space-y-2">
                    <Label htmlFor="sex">Sex</Label>
                    <Select 
                      value={formData.sex} 
                      onValueChange={(value) => handleSelectChange("sex", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Female</SelectItem>
                        <SelectItem value="1">Male</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Chest Pain Type */}
                  <div className="space-y-2">
                    <Label htmlFor="cp">Chest Pain Type</Label>
                    <Select 
                      value={formData.cp} 
                      onValueChange={(value) => handleSelectChange("cp", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Typical Angina</SelectItem>
                        <SelectItem value="1">Atypical Angina</SelectItem>
                        <SelectItem value="2">Non-Anginal Pain</SelectItem>
                        <SelectItem value="3">Asymptomatic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Resting Blood Pressure */}
                  <div className="space-y-2">
                    <Label htmlFor="trestbps">Resting Blood Pressure (mm Hg)</Label>
                    <Input
                      id="trestbps"
                      name="trestbps"
                      type="number"
                      min="90"
                      max="200"
                      value={formData.trestbps}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Cholesterol */}
                  <div className="space-y-2">
                    <Label htmlFor="chol">Serum Cholesterol (mg/dl)</Label>
                    <Input
                      id="chol"
                      name="chol"
                      type="number"
                      min="120"
                      max="600"
                      value={formData.chol}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Fasting Blood Sugar */}
                  <div className="space-y-2">
                    <Label htmlFor="fbs">Fasting Blood Sugar {`>`} 120 mg/dl</Label>
                    <Select 
                      value={formData.fbs} 
                      onValueChange={(value) => handleSelectChange("fbs", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No</SelectItem>
                        <SelectItem value="1">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Resting ECG */}
                  <div className="space-y-2">
                    <Label htmlFor="restecg">Resting Electrocardiographic Results</Label>
                    <Select 
                      value={formData.restecg} 
                      onValueChange={(value) => handleSelectChange("restecg", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select result" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Normal</SelectItem>
                        <SelectItem value="1">ST-T Wave Abnormality</SelectItem>
                        <SelectItem value="2">Left Ventricular Hypertrophy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Max Heart Rate */}
                  <div className="space-y-2">
                    <Label htmlFor="thalach">Maximum Heart Rate Achieved</Label>
                    <Input
                      id="thalach"
                      name="thalach"
                      type="number"
                      min="70"
                      max="220"
                      value={formData.thalach}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Exercise Induced Angina */}
                  <div className="space-y-2">
                    <Label htmlFor="exang">Exercise Induced Angina</Label>
                    <Select 
                      value={formData.exang} 
                      onValueChange={(value) => handleSelectChange("exang", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No</SelectItem>
                        <SelectItem value="1">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* ST Depression */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="oldpeak">ST Depression Induced by Exercise</Label>
                      <span className="text-sm text-muted-foreground">{formData.oldpeak}</span>
                    </div>
                    <Slider
                      defaultValue={[1.0]}
                      max={6.0}
                      step={0.1}
                      onValueChange={(value) => 
                        setFormData({...formData, oldpeak: value[0]})
                      }
                    />
                  </div>

                  {/* Slope of Peak Exercise ST Segment */}
                  <div className="space-y-2">
                    <Label htmlFor="slope">Slope of Peak Exercise ST Segment</Label>
                    <Select 
                      value={formData.slope} 
                      onValueChange={(value) => handleSelectChange("slope", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select slope" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Upsloping</SelectItem>
                        <SelectItem value="1">Flat</SelectItem>
                        <SelectItem value="2">Downsloping</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Number of Major Vessels */}
                  <div className="space-y-2">
                    <Label htmlFor="ca">Number of Major Vessels</Label>
                    <Select 
                      value={formData.ca} 
                      onValueChange={(value) => handleSelectChange("ca", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Thalassemia */}
                  <div className="space-y-2">
                    <Label htmlFor="thal">Thalassemia</Label>
                    <Select 
                      value={formData.thal} 
                      onValueChange={(value) => handleSelectChange("thal", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Normal</SelectItem>
                        <SelectItem value="1">Fixed Defect</SelectItem>
                        <SelectItem value="2">Reversible Defect</SelectItem>
                        <SelectItem value="3">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <Info className="h-4 w-4 mt-0.5" />
                    <p>
                      Your data is processed securely and not stored permanently.
                    </p>
                  </div>
                  <Button type="submit" size="lg" className="w-full md:w-auto">
                    Get Prediction
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
