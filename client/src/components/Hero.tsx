import { Button } from "@/components/ui/button";

const stackChips = [
  "AWS EKS · Lambda · RDS · S3",
  "Python · Django",
  "PostgreSQL · pgvector",
  "Bedrock · SageMaker",
  "Docker · GitHub Actions",
  "RAG · Semantic Search",
];

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 py-32 w-full">
        <div className="space-y-8">
          <div className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase select-none">
            // init.identity
          </div>

          <h1
            className="text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight text-foreground"
            style={{ fontFamily: "Fraunces, var(--font-serif)" }}
          >
            Ronit
            <br />
            Gandhi
          </h1>

          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse flex-shrink-0"></span>
            <span className="font-mono text-sm text-muted-foreground">
              AI Platform Engineer @ Exo Imaging Inc.
            </span>
          </div>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Building scalable backends and AI integrations for hospital-facing medical imaging systems. M.S. Statistics, Rutgers.
          </p>

          <div className="flex flex-wrap gap-2">
            {stackChips.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-3 py-1.5 border border-border text-muted-foreground rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button size="lg" onClick={() => scrollToSection("experience")}>
              View Work
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
      </div>
    </section>
  );
}
