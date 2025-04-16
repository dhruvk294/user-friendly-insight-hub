
import { HeartIcon } from "@/components/ui/heart-icon";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <HeartIcon className="h-6 w-6 text-medical" />
            <span className="font-semibold">HeartInsight</span>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm hover:underline">Privacy Policy</a>
            <a href="#" className="text-sm hover:underline">Terms of Service</a>
            <a href="#" className="text-sm hover:underline">Contact</a>
          </div>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            © {currentYear} HeartInsight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
