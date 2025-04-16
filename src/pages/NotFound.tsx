import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@/components/ui/heart-icon";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center hero-gradient text-white">
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <HeartIcon className="h-24 w-24 mx-auto opacity-50" />
            </div>
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-8">We couldn't find the page you were looking for.</p>
            <Button asChild size="lg" className="bg-white text-medical hover:bg-white/90">
              <Link to="/">
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
