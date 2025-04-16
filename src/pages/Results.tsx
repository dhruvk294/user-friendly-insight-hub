
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@/components/ui/heart-icon";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, ArrowRight, CheckCircle2, Database } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LoadingSpinner } from "@/components/loading-spinner";
import { 
  PredictionResult, 
  riskFactorLabels, 
  FormData as HeartFormData 
} from "@/lib/heart-disease-utils";
import { savePrediction } from "@/lib/api-mock";
import { savePredictionToSupabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [result, setResult] = useState<any>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  
  useEffect(() => {
    // If we have a saved result from history, use it directly
    if (location.state?.savedResult) {
      setResult(location.state.savedResult);
      setSaved(true);
      return;
    }

    // If formData is not provided, redirect to the prediction page
    if (!location.state?.formData) {
      navigate("/predict");
      return;
    }
    
    // Call our API mock for new predictions
    const fetchPrediction = async () => {
      try {
        const prediction = await savePrediction(location.state.formData as HeartFormData);
        setResult(prediction);
      } catch (error) {
        console.error("Error getting prediction:", error);
        // In a real app, we would handle the error more gracefully
      }
    };
    
    fetchPrediction();
  }, [location.state, navigate]);
  
  // Save prediction to Supabase
  const handleSaveToDatabase = async () => {
    if (!result || !location.state?.formData) return;
    
    try {
      setIsSaving(true);
      await savePredictionToSupabase({
        formData: location.state.formData,
        ...result
      });
      setSaved(true);
      toast({
        title: "Prediction saved",
        description: "Your prediction has been saved to your history.",
        variant: "default"
      });
    } catch (error) {
      console.error("Error saving prediction:", error);
      toast({
        title: "Error saving prediction",
        description: "Failed to save prediction to database.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Format risk factors for chart
  const chartData = result?.riskFactors.map((factor: any) => ({
    name: riskFactorLabels[factor.name] || factor.name,
    value: parseFloat(factor.contribution.toFixed(1))
  })) || [];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12 px-4 input-gradient">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Your Heart Disease Risk Assessment</h1>
            <p className="text-muted-foreground mt-2">
              Based on the health data you provided
            </p>
          </div>
          
          {!result ? (
            <Card className="glass-card animate-in">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <LoadingSpinner size="lg" />
                  <HeartIcon className="h-16 w-16 text-medical/50" beating />
                  <p className="text-lg text-muted-foreground">Analyzing your health data...</p>
                  <p className="text-sm text-muted-foreground">This may take a few moments</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="glass-card animate-in mb-8">
                <CardHeader>
                  <CardTitle>Prediction Result</CardTitle>
                  <CardDescription>
                    Our model has analyzed your health data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative mb-4">
                      <HeartIcon 
                        className={`h-24 w-24 ${
                          result.prediction === 1 ? "text-risk" : "text-healthy"
                        }`} 
                        beating={result.prediction === 1}
                      />
                      {result.prediction === 1 ? (
                        <AlertCircle className="h-8 w-8 text-white absolute -top-1 -right-1 p-1 rounded-full bg-risk" />
                      ) : (
                        <CheckCircle2 className="h-8 w-8 text-white absolute -top-1 -right-1 p-1 rounded-full bg-healthy" />
                      )}
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-2">
                      {result.prediction === 1 
                        ? "Elevated Risk of Heart Disease" 
                        : "Low Risk of Heart Disease"
                      }
                    </h2>
                    
                    <Badge variant={result.prediction === 1 ? "destructive" : "default"} className="mb-4">
                      {Math.round(result.probability * 100)}% Risk Score
                    </Badge>
                    
                    <div className="w-full max-w-md mb-6">
                      <div className="flex justify-between mb-2 text-sm">
                        <span>Low Risk</span>
                        <span>High Risk</span>
                      </div>
                      <Progress 
                        value={result.probability * 100} 
                        className={`h-3 ${
                          result.probability > 0.5 
                            ? "bg-muted [&>div]:bg-risk" 
                            : "bg-muted [&>div]:bg-healthy"
                        }`}
                      />
                    </div>
                    
                    <p className="text-center text-muted-foreground mb-6 max-w-md">
                      {result.prediction === 1 
                        ? "Based on the provided health data, our model suggests an elevated risk of heart disease. This is not a diagnosis but an indicator that you may want to consult with a healthcare professional."
                        : "Based on the provided health data, our model suggests a low risk of heart disease. Continue maintaining a healthy lifestyle and regular check-ups with your healthcare provider."
                      }
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      {!saved && (
                        <Button 
                          onClick={handleSaveToDatabase} 
                          disabled={isSaving || saved}
                          className="gap-2"
                        >
                          {isSaving ? <LoadingSpinner size="sm" /> : <Database className="h-4 w-4" />}
                          Save to History
                        </Button>
                      )}
                      
                      <Button asChild variant={saved ? "default" : "outline"}>
                        <Link to="/history">
                          View History
                        </Link>
                      </Button>
                      
                      <Button asChild variant="outline">
                        <Link to="/predict">
                          Try Again
                        </Link>
                      </Button>
                      
                      {result.prediction === 1 && (
                        <Button asChild variant="outline">
                          <a href="https://www.heart.org/en/health-topics/heart-attack/warning-signs-of-a-heart-attack" target="_blank" rel="noopener noreferrer">
                            Heart Health Resources <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card animate-in" style={{animationDelay: "100ms"}}>
                <CardHeader>
                  <CardTitle>Risk Factor Analysis</CardTitle>
                  <CardDescription>
                    Key contributors to your risk assessment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-64 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" label={{ value: 'Contribution (%)', position: 'insideBottom', offset: -5 }} />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip formatter={(value) => [`${value}%`, 'Contribution']} />
                        <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Recommended Next Steps</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-medical mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          {result.prediction === 1 
                            ? "Consult with your healthcare provider about these results" 
                            : "Continue with regular health check-ups and screenings"}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-medical mr-2 flex-shrink-0 mt-0.5" />
                        <span>Maintain a heart-healthy diet rich in fruits, vegetables, and whole grains</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-medical mr-2 flex-shrink-0 mt-0.5" />
                        <span>Engage in regular physical activity (at least 150 minutes per week)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-medical mr-2 flex-shrink-0 mt-0.5" />
                        <span>Monitor your blood pressure, cholesterol, and blood sugar levels</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-medical mr-2 flex-shrink-0 mt-0.5" />
                        <span>If you smoke, seek resources to help you quit</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
