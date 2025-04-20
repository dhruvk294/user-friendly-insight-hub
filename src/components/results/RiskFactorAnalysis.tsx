
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { riskFactorLabels } from "@/lib/heart-disease-utils";

interface RiskFactorAnalysisProps {
  riskFactors: Array<{ name: string; contribution: number }>;
}

export const RiskFactorAnalysis = ({ riskFactors }: RiskFactorAnalysisProps) => {
  const chartData = riskFactors.map((factor) => ({
    name: riskFactorLabels[factor.name] || factor.name,
    value: parseFloat(factor.contribution.toFixed(1))
  }));

  return (
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
                Monitor your identified risk factors and discuss them with your healthcare provider
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
  );
};
