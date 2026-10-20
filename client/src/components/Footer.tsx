import { Heart } from "lucide-react";
import { SiPython, SiReact, SiTensorflow } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-wide flex flex-col items-center justify-between gap-4 py-10 text-[0.875rem] text-muted-foreground md:flex-row">
        <p className="flex flex-wrap items-center justify-center gap-2">
          <span>Designed & Built with</span>
          <Heart className="h-4 w-4 fill-primary text-primary" aria-label="love" role="img" />
          <span>using</span>
          <span className="ml-1 flex items-center gap-2">
            <SiReact className="h-4 w-4" aria-label="React" role="img" />
            <SiPython className="h-4 w-4" aria-label="Python" role="img" />
            <SiTensorflow className="h-4 w-4" aria-label="TensorFlow" role="img" />
          </span>
        </p>

        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <a
            href="#top"
            className="inline-flex min-h-11 items-center rounded-full px-2 transition-colors hover:text-primary-hi"
          >
            Back to Top ↑
          </a>
          <span className="hidden md:inline" aria-hidden="true">•</span>
          <p>© {new Date().getFullYear()} Ronit Gandhi. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
