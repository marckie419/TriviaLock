import HeroSection from "@/components/HeroSection";
import PasswordGenerator from "@/components/PasswordGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <HeroSection />
          <div className="mt-8 md:mt-12 pb-8">
            <PasswordGenerator />
          </div>
        </div>
      </div>
      
      <footer className="shrink-0 py-4 border-t border-border/30 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground text-center">
            Built with privacy in mind. Your data never leaves your device.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
