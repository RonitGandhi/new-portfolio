import { ExternalLink } from "lucide-react";

interface Publication {
  id: number;
  title: string;
  journal: string;
  date: string;
  doi: string;
  description: string;
}

const publications: Publication[] = [
  {
    id: 1,
    title: "Machine Learning Model-Based Design and Model Predictive Control of a Bioreactor for the Improved Production of Mammalian Cell-Based Bio-Therapeutics",
    journal: "Control Engineering Practice",
    date: "March 2025",
    doi: "https://doi.org/10.1016/j.conengprac.2024.106198",
    description: "A novel approach leveraging ML models and model predictive control to optimize bioreactor performance, improving production efficiency of mammalian cell-based bio-therapeutics. Includes advanced predictive techniques and real-world experimental validation.",
  },
  {
    id: 2,
    title: "Integrating population balance modeling and machine learning for real-time control and optimization of granulation processes",
    journal: "Chemical Engineering Research and Design",
    date: "April 2026",
    doi: "https://doi.org/10.1016/j.cherd.2026.04.044",
    description: "Hybrid framework combining population balance modeling with machine learning to enable real-time monitoring, control, and optimization of pharmaceutical granulation processes — improving product quality and process efficiency in manufacturing.",
  },
  {
    id: 3,
    title: "Heuristic Approach of Over-Sampling and Under-Sampling in Fraud Detection",
    journal: "International Journal of Creative Research Thoughts (IJCRT)",
    date: "January 2023",
    doi: "https://www.researchgate.net/publication/367510232_Heuristic_Approach_of_Over-Sampling_and_Under-_Sampling_in_Fraud_Detection",
    description: "A heuristic approach to over-sampling and under-sampling in fraud detection, demonstrating how balanced sampling techniques improve model performance in heavily imbalanced classification settings.",
  },
];

export default function Publications() {
  return (
    <section id="publications" className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <div className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">
            // publications
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "Fraunces, var(--font-serif)" }}
          >
            Publications
          </h2>
        </div>

        <div>
          {publications.map((pub, index) => (
            <div key={pub.id} className="group border-t border-border">
              <div className="py-8 grid md:grid-cols-[2.5rem_1fr] gap-4 md:gap-8">
                {/* Index */}
                <div className="font-mono text-sm text-muted-foreground/30 pt-0.5 select-none">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="space-y-3">
                  {/* Journal + date */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs px-2 py-0.5 border border-border text-muted-foreground/60 rounded">
                      {pub.journal}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/40">
                      {pub.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-semibold leading-snug group-hover:text-primary transition-colors"
                    style={{ fontFamily: "Fraunces, var(--font-serif)" }}
                  >
                    {pub.title}
                  </h3>

                  {/* Abstract */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pub.description}
                  </p>

                  {/* Link */}
                  <a
                    href={pub.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Read Publication
                  </a>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
