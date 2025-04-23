
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Blank page content */}
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <p className="text-muted-foreground mt-4">This page is currently blank.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
