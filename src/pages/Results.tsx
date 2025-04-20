
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/loading-spinner";
import { HeartIcon } from "@/components/ui/heart-icon";
import { FormData as HeartFormData } from "@/lib/heart-disease-utils";
import { savePrediction } from "@/lib/api-mock";
import { savePredictionToSupabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { PredictionResultCard } from "@/components/results/PredictionResultCard";
import { RiskFactorAnalysis } from "@/components/results/RiskFactorAnalysis";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [result, setResult] = useState<any>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  
  useEffect(() => {
    if (location.state?.savedResult) {
      setResult(location.state.savedResult);
      setSaved(true);
      return;
    }

    if (!location.state?.formData) {
      navigate("/predict");
      return;
    }
    
    const fetchPrediction = async () => {
      try {
        const prediction = await savePrediction(location.state.formData as HeartFormData);
        setResult(prediction);
      } catch (error) {
        console.error("Error getting prediction:", error);
      }
    };
    
    fetchPrediction();
  }, [location.state, navigate]);
  
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
              <PredictionResultCard 
                result={result}
                isSaving={isSaving}
                saved={saved}
                onSave={handleSaveToDatabase}
              />
              <RiskFactorAnalysis riskFactors={result.riskFactors} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
