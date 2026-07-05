import { GraduationCap, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <div className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">
            // profile
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "Fraunces, var(--font-serif)" }}
          >
            About Me
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-5">
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm a{" "}
              <span className="text-foreground font-medium">AI Platform Engineer</span> at
              Exo Imaging, building the backend infrastructure and AI systems behind
              hospital-facing medical imaging products. My work sits at the intersection
              of scalable services and applied ML — REST microservices, cloud
              architecture, and LLM integrations that run in production.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Before Exo, I spent a year as an ML Engineer in research at Rutgers School
              of Engineering, applying predictive models to pharmaceutical and bioprocess
              problems — including a published paper in{" "}
              <span className="text-foreground">Control Engineering Practice</span>. I
              started building in industry with a data science internship at Google via
              DKSH Smollan, where I led a small team shipping BI tooling on Google Cloud.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              My foundation is a B.Tech in Electronics Engineering (University of Mumbai)
              and an M.S. in Statistics — Data Science from Rutgers. The engineering
              background shapes how I think about systems; the statistics background
              shapes how I think about uncertainty.
            </p>

            <div className="flex flex-wrap gap-3 pt-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>
                <span className="font-mono text-xs text-muted-foreground">New Jersey, USA</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                <span className="font-mono text-xs text-muted-foreground">3+ years exp.</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                <span className="font-mono text-xs text-muted-foreground">3 publications</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="p-5">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-md mt-0.5 flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">M.S. Statistics — Data Science</h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    Rutgers University · 2023 — 2025 · GPA 3.8
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    ML, statistical inference, causal inference, predictive modeling
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-md mt-0.5 flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">B.Tech — Electronics Engineering</h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    University of Mumbai · 2019 — 2023 · CGPA 8.26
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Systems thinking, embedded systems, signal processing
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-md mt-0.5 flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Published Research</h3>
                  <p className="font-mono text-xs text-muted-foreground mb-2">
                    Control Engineering Practice · March 2025
                  </p>
                  <a
                    href="https://doi.org/10.1016/j.conengprac.2024.106198"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    ML Model-Based Design and MPC of a Bioreactor →
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
