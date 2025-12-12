import { Card } from "@/components/ui/card";
import { ExternalLink, Calendar, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    description: "This publication presents a novel approach leveraging machine learning models and model predictive control to optimize bioreactor performance, improving the production efficiency of mammalian cell-based bio-therapeutics. It highlights advanced predictive techniques and real-world validation for bioprocess engineering.",
  },
  {
    id: 2,
    title: "Heuristic Approach of Over-Sampling and Under-Sampling in Fraud Detection",
    journal: "International Journal of Creative Research Thoughts (IJCRT)",
    date: "January 2023",
    doi: "https://www.researchgate.net/publication/367510232_Heuristic_Approach_of_Over-Sampling_and_Under-_Sampling_in_Fraud_Detection",
    description: "This publication presents a heuristic approach to over-sampling and under-sampling in fraud detection. It highlights the importance of using different sampling techniques to improve the performance of fraud detection models.",
  }
];

export default function Publications() {
  return (
    <section id="publications" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Space Grotesk, var(--font-sans)" }}>
            Publications
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Research contributions in machine learning and process control
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {publications.map((pub, index) => (
            <Card 
              key={pub.id}
              className="p-8 hover-elevate transition-all duration-300 group border-l-4 border-l-primary"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "both"
              }}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge variant="secondary" className="text-xs font-medium">
                        {pub.journal}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{pub.date}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-xl leading-tight group-hover:text-primary transition-colors">
                      {pub.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {pub.description}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-border">
                  <a
                    href={pub.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all group/link"
                  >
                    <span>Read Publication</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {publications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">More publications coming soon...</p>
          </div>
        )}
      </div>
    </section>
  );
}

