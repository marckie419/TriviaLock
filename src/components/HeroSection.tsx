import { Shield, Lock, Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center space-y-4 py-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-primary opacity-10 blur-3xl rounded-full"></div>
        <div className="relative flex justify-center">
          <img src="/LOGO.svg" alt="TriviaLock Logo" className="h-16 w-auto" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          TriviaLock
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Generate secure passwords from your personal memories.
          <span className="block text-accent font-medium text-sm md:text-base">Secure, memorable, and completely private.</span>
        </p>
      </div>
      
      <div className="flex justify-center space-x-6 text-xs md:text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-accent" />
          <span>100% Private</span>
        </div>
        <div className="flex items-center space-x-2">
          <Lock className="h-4 w-4 text-accent" />
          <span>No Storage</span>
        </div>
        <div className="flex items-center space-x-2">
          <Heart className="h-4 w-4 text-accent" />
          <span>Memorable</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;