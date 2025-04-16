
import { Link } from "react-router-dom";
import { HeartIcon } from "@/components/ui/heart-icon";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <HeartIcon className="h-8 w-8 text-medical" beating />
          <span className="text-xl font-bold">HeartInsight</span>
        </Link>
        <nav className="ml-auto flex items-center space-x-4">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-medical">
            Home
          </Link>
          <Link to="/predict" className="text-sm font-medium transition-colors hover:text-medical">
            Predict
          </Link>
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-medical">
            About
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link to="/predict">
              Get Started
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
