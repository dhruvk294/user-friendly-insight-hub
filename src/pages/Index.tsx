
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@/components/ui/heart-icon";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, 
  Activity, 
  Heart, 
  Brain, 
  LineChart, 
  Stethoscope, 
  BadgeCheck
} from "lucide-react";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient py-20 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="animate-in space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Heart Disease Prediction with AI
                </h1>
                <p className="text-lg text-white/90 md:text-xl">
                  Predict your risk of heart disease using advanced machine learning. Get insights based on your health data.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="bg-white text-medical hover:bg-white/90">
                    <Link to="/predict">
                      Get Your Prediction
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                    <Link to="/about">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute -top-2 -left-2 w-72 h-72 bg-white/10 rounded-full filter blur-xl opacity-50"></div>
                <div className="relative glass-card rounded-lg p-8 flex justify-center items-center">
                  <HeartIcon className="h-48 w-48 text-risk" beating />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
              <p className="text-muted-foreground md:w-2/3 mx-auto">
                Our advanced machine learning model analyzes your health data to predict your risk of heart disease.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="animate-in" style={{animationDelay: "100ms"}}>
                <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-medical/10 text-medical">
                    <Activity className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-xl">Input Your Data</h3>
                  <p className="text-muted-foreground">
                    Fill in your medical parameters like age, cholesterol levels, blood pressure, and more.
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-in" style={{animationDelay: "200ms"}}>
                <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-medical/10 text-medical">
                    <Brain className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-xl">AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Our machine learning model processes your data using patterns learned from thousands of cases.
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-in" style={{animationDelay: "300ms"}}>
                <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-medical/10 text-medical">
                    <LineChart className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-xl">Get Results</h3>
                  <p className="text-muted-foreground">
                    Receive an instant prediction of your heart disease risk level with detailed insights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Backed by Data Science</h2>
                <p className="text-muted-foreground">
                  Our heart disease prediction model is trained on extensive medical datasets, achieving over 80% accuracy in identifying potential heart conditions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <BadgeCheck className="h-5 w-5 text-medical" />
                    <span>Trained on real medical data</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BadgeCheck className="h-5 w-5 text-medical" />
                    <span>Validated by healthcare professionals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BadgeCheck className="h-5 w-5 text-medical" />
                    <span>Continuously improved algorithm</span>
                  </li>
                </ul>
                <Button asChild className="mt-2">
                  <Link to="/predict">
                    Try It Now
                  </Link>
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden border">
                <img 
                  src="/lovable-uploads/c909c66d-c35a-48e1-9e35-30d87f7a6ee2.png"
                  alt="Heart disease prediction data" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Why Choose HeartInsight</h2>
              <p className="text-muted-foreground md:w-2/3 mx-auto">
                Our platform combines medical expertise with cutting-edge AI to provide accurate heart health insights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="animate-in" style={{animationDelay: "100ms"}}>
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="p-3 rounded-full bg-medical/10 w-fit text-medical">
                      <Stethoscope className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-xl">Medical Accuracy</h3>
                    <p className="text-muted-foreground">
                      Developed with healthcare professionals to ensure reliable predictions based on clinical parameters.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-in" style={{animationDelay: "200ms"}}>
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="p-3 rounded-full bg-medical/10 w-fit text-medical">
                      <Heart className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-xl">Preventive Care</h3>
                    <p className="text-muted-foreground">
                      Early detection helps you take preventive measures before symptoms appear, potentially saving lives.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-in" style={{animationDelay: "300ms"}}>
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="p-3 rounded-full bg-medical/10 w-fit text-medical">
                      <BarChart className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-xl">Detailed Insights</h3>
                    <p className="text-muted-foreground">
                      Understand the factors contributing to your risk level and get personalized recommendations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Check Your Heart Health?</h2>
              <p className="text-lg text-white/90">
                Get your personalized heart disease risk prediction in minutes. No registration required.
              </p>
              <Button asChild size="lg" className="bg-white text-medical hover:bg-white/90">
                <Link to="/predict">
                  Start Your Prediction
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
