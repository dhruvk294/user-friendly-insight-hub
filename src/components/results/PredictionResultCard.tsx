
import { HeartIcon } from "@/components/ui/heart-icon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, CheckCircle2, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "@/components/loading-spinner";

interface PredictionResultCardProps {
  result: any;
  isSaving: boolean;
  saved: boolean;
  onSave: () => void;
}

export const PredictionResultCard = ({ result, isSaving, saved, onSave }: PredictionResultCardProps) => (
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
            className={`h-24 w-24 ${result.prediction === 1 ? "text-risk" : "text-healthy"}`} 
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
              onClick={onSave} 
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
);
