import React from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with lazy loading */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background">
        <img 
          src="/assets/images/hero-background.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000"
          loading="lazy"
          onLoad={(e) => {
            (e.target as HTMLImageElement).classList.remove('opacity-0');
            (e.target as HTMLImageElement).classList.add('opacity-100');
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="space-y-6 animate-fade-up">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-muted-foreground">
            <span className="animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
              Data Scientist
            </span>
            <span className="text-primary">•</span>
            <span className="animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
              ML Engineer
            </span>
            <span className="text-primary">•</span>
            <span className="animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
              Researcher
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight" style={{ fontFamily: "Space Grotesk, var(--font-sans)" }}>
            Ronit Gandhi
            <br />
            <span className="text-primary">Data-Driven Solutions</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Building intelligent systems and transforming raw data into actionable insights through machine learning and data science.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              onClick={() => scrollToSection("projects")}
            >
              View Projects
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </Button>
          </div>
        </div>
        
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer animate-float"
          onClick={() => scrollToSection("about")}
        >
          <ArrowDown className="w-6 h-6 text-primary animate-pulse-glow" />
        </div>
      </div>
    </section>
  );
}

