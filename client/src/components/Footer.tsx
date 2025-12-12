import { Heart } from "lucide-react";
import { SiPython, SiReact, SiTensorflow } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Designed & Built with</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>using</span>
            <div className="flex items-center gap-2 ml-1">
              <SiReact className="w-4 h-4" />
              <SiPython className="w-4 h-4" />
              <SiTensorflow className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-primary transition-colors"
            >
              Back to Top ↑
            </button>
            <span className="hidden md:inline">•</span>
            <p>© {new Date().getFullYear()} Ronit Gandhi. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

