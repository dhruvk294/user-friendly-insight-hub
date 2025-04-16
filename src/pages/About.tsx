
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About HeartInsight</h1>
              <p className="text-xl text-muted-foreground">
                HeartInsight is an advanced heart disease prediction platform powered by machine learning. Our mission is to make early detection of heart disease risk accessible to everyone.
              </p>
              
              <div className="mt-10 space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
                  <p className="text-muted-foreground">
                    Our platform uses a logistic regression model trained on clinical heart disease data. The model analyzes various health parameters to predict the likelihood of heart disease with high accuracy.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">The Dataset</h2>
                  <p className="text-muted-foreground mb-4">
                    Our model is trained on a comprehensive heart disease dataset that includes 303 patients and 14 different attributes including:
                  </p>
                  <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium">Feature</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="px-4 py-3 text-sm font-medium">Age</td>
                            <td className="px-4 py-3 text-sm">Age in years</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 text-sm font-medium">Sex</td>
                            <td className="px-4 py-3 text-sm">Gender (1 = male, 0 = female)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 text-sm font-medium">CP</td>
                            <td className="px-4 py-3 text-sm">Chest pain type (0-3)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 text-sm font-medium">Trestbps</td>
                            <td className="px-4 py-3 text-sm">Resting blood pressure (mm Hg)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 text-sm font-medium">Chol</td>
                            <td className="px-4 py-3 text-sm">Serum cholesterol (mg/dl)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 text-sm font-medium">Fbs</td>
                            <td className="px-4 py-3 text-sm">Fasting blood sugar {`>`} 120 mg/dl (1 = true, 0 = false)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 text-sm font-medium">Restecg</td>
                            <td className="px-4 py-3 text-sm">Resting electrocardiographic results (0-2)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 text-sm font-medium">Thalach</td>
                            <td className="px-4 py-3 text-sm">Maximum heart rate achieved</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 text-sm font-medium">Exang</td>
                            <td className="px-4 py-3 text-sm">Exercise induced angina (1 = yes, 0 = no)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 text-sm font-medium">Oldpeak</td>
                            <td className="px-4 py-3 text-sm">ST depression induced by exercise relative to rest</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 text-sm font-medium">Slope</td>
                            <td className="px-4 py-3 text-sm">Slope of the peak exercise ST segment (0-2)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 text-sm font-medium">Ca</td>
                            <td className="px-4 py-3 text-sm">Number of major vessels colored by fluoroscopy (0-4)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 text-sm font-medium">Thal</td>
                            <td className="px-4 py-3 text-sm">Thalassemia (0-3)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium">Target</td>
                            <td className="px-4 py-3 text-sm">Presence of heart disease (1 = yes, 0 = no)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Model Accuracy</h2>
                  <p className="text-muted-foreground">
                    Our logistic regression model achieves over 80% accuracy on the test data. We continuously refine and improve our model to enhance prediction accuracy while ensuring it remains interpretable for healthcare practitioners.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
                  <p className="text-muted-foreground">
                    We take your privacy seriously. All data submitted for predictions is processed securely and is not stored permanently on our servers. We do not share any personal information with third parties.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
                  <p className="text-muted-foreground">
                    HeartInsight is designed to be an informational tool and should not be considered a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider regarding any medical conditions or health concerns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
