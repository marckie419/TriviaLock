import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TriviaAnswers {
  pet: string;
  city: string;
  job: string;
}

const PasswordGenerator = () => {
  const [answers, setAnswers] = useState<TriviaAnswers>({ pet: "", city: "", job: "" });
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const leetMap: { [key: string]: string } = {
    'a': '@', 'e': '3', 'i': '!', 'o': '0', 's': '$', 't': '7', 'l': '1'
  };

  const generatePassword = () => {
    if (!answers.pet || !answers.city || !answers.job) {
      toast({
        title: "Missing Information",
        description: "Please fill in all three fields to generate your password.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation delay for better UX
    setTimeout(() => {
      let combined = answers.pet + answers.city + answers.job;
      combined = combined.replace(/\s+/g, ''); // Remove spaces
      
      // Apply leetspeak
      let transformed = combined.toLowerCase().split('').map(char => {
        return Math.random() > 0.7 && leetMap[char] ? leetMap[char] : char;
      }).join('');
      
      // Random capitalization
      transformed = transformed.split('').map(char => {
        return Math.random() > 0.5 ? char.toUpperCase() : char;
      }).join('');
      
      // Add random symbols and numbers
      const symbols = ['!', '@', '#', '$', '%', '&', '*'];
      const numbers = '0123456789';
      
      // Ensure we have some numbers and symbols
      for (let i = 0; i < 2; i++) {
        const randomPos = Math.floor(Math.random() * transformed.length);
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        transformed = transformed.slice(0, randomPos) + randomSymbol + transformed.slice(randomPos);
      }
      
      for (let i = 0; i < 2; i++) {
        const randomPos = Math.floor(Math.random() * transformed.length);
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
        transformed = transformed.slice(0, randomPos) + randomNumber + transformed.slice(randomPos);
      }
      
      // Ensure exactly 16 characters
      if (transformed.length > 16) {
        transformed = transformed.slice(0, 16);
      } else if (transformed.length < 16) {
        const padding = 16 - transformed.length;
        for (let i = 0; i < padding; i++) {
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
          transformed += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      setGeneratedPassword(transformed);
      setIsGenerating(false);
      setShowPassword(true);
    }, 1000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPassword);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy password to clipboard.",
        variant: "destructive"
      });
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 16) score += 25;
    if (/[a-z]/.test(password)) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    return Math.min(score, 100);
  };

  const strength = getPasswordStrength(generatedPassword);

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Card className="p-6 shadow-security border-2 border-primary/10">
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <Shield className="h-8 w-8 text-accent mx-auto" />
            <h2 className="text-xl font-bold text-primary">Personal Trivia</h2>
            <p className="text-sm text-muted-foreground">Answer these questions to generate your secure password</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pet" className="text-sm font-medium">What was your childhood pet's name?</Label>
              <Input
                id="pet"
                value={answers.pet}
                onChange={(e) => setAnswers({ ...answers, pet: e.target.value })}
                placeholder="e.g., Whiskers"
                className="transition-all duration-200 focus:shadow-glow"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">What's a city you'd love to visit?</Label>
              <Input
                id="city"
                value={answers.city}
                onChange={(e) => setAnswers({ ...answers, city: e.target.value })}
                placeholder="e.g., Tokyo"
                className="transition-all duration-200 focus:shadow-glow"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="job" className="text-sm font-medium">What was your dream job as a child?</Label>
              <Input
                id="job"
                value={answers.job}
                onChange={(e) => setAnswers({ ...answers, job: e.target.value })}
                placeholder="e.g., Astronaut"
                className="transition-all duration-200 focus:shadow-glow"
              />
            </div>
          </div>
          
          <Button 
            onClick={generatePassword}
            disabled={isGenerating}
            className="w-full bg-gradient-primary hover:shadow-security transition-all duration-300"
          >
            {isGenerating ? "Generating..." : "Generate Secure Password"}
          </Button>
        </div>
      </Card>

      {generatedPassword && (
        <Card className="p-6 shadow-glow border-2 border-accent/20 bg-gradient-subtle">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary">Your Secure Password</h3>
              <div className="flex items-center space-x-2">
                <div className={`h-2 w-16 rounded-full ${
                  strength >= 75 ? 'bg-success' : strength >= 50 ? 'bg-yellow-500' : 'bg-destructive'
                }`} />
                <span className="text-xs text-muted-foreground">
                  {strength >= 75 ? 'Strong' : strength >= 50 ? 'Medium' : 'Weak'}
                </span>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex items-center space-x-2 p-3 bg-card rounded-lg border">
                <code className="flex-1 font-mono text-sm break-all">
                  {showPassword ? generatedPassword : '••••••••••••••••'}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="h-8 w-8 p-0"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              Your password is generated locally and never stored or transmitted.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PasswordGenerator;