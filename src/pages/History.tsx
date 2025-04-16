
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AlertCircle, BarChart2, ChartPieIcon, CircleAlert, ClipboardList, Presentation } from "lucide-react";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPredictions } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { HeartIcon } from "@/components/ui/heart-icon";
import { featureExplanations } from "@/types/heart-disease";

export default function History() {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPredictions() {
      try {
        setLoading(true);
        const data = await getPredictions();
        setPredictions(data || []);
      } catch (err) {
        setError("Failed to load prediction history");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPredictions();
  }, []);

  // Process data for charts
  const riskDistribution = [
    { name: "High Risk", value: predictions.filter(p => p.prediction_result).length },
    { name: "Low Risk", value: predictions.filter(p => !p.prediction_result).length }
  ];

  const COLORS = ["#ef4444", "#22c55e"];

  // Aggregate risk factors across all predictions
  const aggregateRiskFactors = () => {
    const factorCount: Record<string, number> = {};
    
    predictions.forEach(prediction => {
      if (prediction.risk_factors) {
        prediction.risk_factors.forEach((factor: any) => {
          const factorName = factor.name;
          if (factorCount[factorName]) {
            factorCount[factorName] += Math.abs(factor.contribution);
          } else {
            factorCount[factorName] = Math.abs(factor.contribution);
          }
        });
      }
    });
    
    return Object.entries(factorCount)
      .map(([name, value]) => ({
        name: featureExplanations[name]?.name || name,
        value: parseFloat(value.toFixed(1))
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); // Get top 10 risk factors
  };

  const topRiskFactors = aggregateRiskFactors();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12 px-4 input-gradient">
          <div className="container mx-auto max-w-4xl text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-muted-foreground">Loading prediction history...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12 px-4 input-gradient">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Prediction History</h1>
            <p className="text-muted-foreground mt-2">
              View your past heart disease risk assessments and insights
            </p>
          </div>
          
          {error && (
            <Card className="mb-8 border-destructive">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <p>{error}</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {predictions.length === 0 ? (
            <Card className="glass-card animate-in">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ClipboardList className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Predictions Yet</h2>
                <p className="text-muted-foreground mb-6 text-center max-w-md">
                  You haven't made any heart disease risk predictions yet. Start by making your first prediction.
                </p>
                <Button onClick={() => navigate('/predict')}>
                  Make a Prediction
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="graphs" className="space-y-6">
              <TabsList>
                <TabsTrigger value="graphs" className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  <span>Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  <span>History</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="graphs" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glass-card animate-in">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <ChartPieIcon className="h-5 w-5 text-primary" />
                          Risk Distribution
                        </CardTitle>
                        <Badge variant="outline">{predictions.length} Predictions</Badge>
                      </div>
                      <CardDescription>
                        Distribution of high vs. low risk predictions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={riskDistribution}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {riskDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [value, name]} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card animate-in" style={{ animationDelay: "100ms" }}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart2 className="h-5 w-5 text-primary" />
                        Top Risk Factors
                      </CardTitle>
                      <CardDescription>
                        Most significant factors across all predictions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={topRiskFactors}
                            layout="vertical"
                            margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={80} />
                            <Tooltip formatter={(value) => [`${value}`, 'Contribution']} />
                            <Bar dataKey="value" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="history">
                <Card className="glass-card animate-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="h-5 w-5 text-primary" />
                      Prediction Records
                    </CardTitle>
                    <CardDescription>
                      Your previous heart disease risk assessments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Result</TableHead>
                            <TableHead>Risk Score</TableHead>
                            <TableHead>Top Risk Factor</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {predictions.map((prediction) => {
                            const topFactor = prediction.risk_factors ? 
                              [...prediction.risk_factors].sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))[0] : 
                              null;
                              
                            return (
                              <TableRow key={prediction.id}>
                                <TableCell>{formatDate(prediction.created_at)}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <HeartIcon 
                                      className={`h-5 w-5 ${prediction.prediction_result ? "text-risk" : "text-healthy"}`} 
                                      beating={prediction.prediction_result}
                                    />
                                    <span>{prediction.prediction_result ? "High Risk" : "Low Risk"}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={prediction.prediction_result ? "destructive" : "default"}>
                                    {Math.round(prediction.probability * 100)}%
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {topFactor ? (
                                    <span>{featureExplanations[topFactor.name]?.name || topFactor.name}</span>
                                  ) : (
                                    <span className="text-muted-foreground">N/A</span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => navigate('/results', { state: { 
                                      formData: prediction.prediction_data,
                                      savedResult: {
                                        prediction: prediction.prediction_result ? 1 : 0,
                                        probability: prediction.probability,
                                        riskFactors: prediction.risk_factors
                                      }
                                    }})}
                                  >
                                    View Details
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
