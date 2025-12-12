import { GraduationCap, Zap, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Space Grotesk, var(--font-sans)" }}>
            About Me
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A journey from electronics engineering to data science, powered by curiosity
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              I'm a <span className="font-semibold text-foreground">Data Scientist and Machine Learning Enthusiast</span> based in New Jersey, specializing in building intelligent systems and data-driven solutions. I thrive on solving challenging problems and transforming raw data into actionable insights.
            </p>
            <p className="text-lg leading-relaxed">
              My goal is to design solutions that are not only robust and efficient but also user-focused and intuitive. Whether it's developing predictive models, optimizing workflows, or creating interactive visualizations, I bring a unique blend of technical expertise and creativity to every project.
            </p>
            <div className="flex items-center gap-3 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">3+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">8+ Projects</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6 hover-elevate transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">Masters of Science in Statistics</h3>
                      <p className="text-sm text-muted-foreground">Rutgers University - Data Science</p>
                      <p className="text-sm text-muted-foreground">2023 — 2025 (GPA: 3.8/4.0)</p>
                    </div>
                    <div className="w-1 h-16 bg-primary rounded-full"></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Specialized in machine learning, statistical inference, and predictive modeling
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover-elevate transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">Bachelors of Technology</h3>
                      <p className="text-sm text-muted-foreground">University of Mumbai - Electronics Engineering</p>
                      <p className="text-sm text-muted-foreground">2019 — 2023 (CGPA: 8.26/10.0)</p>
                    </div>
                    <div className="w-1 h-16 bg-chart-2 rounded-full"></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Foundation in systems thinking, problem-solving, and technical implementation
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover-elevate transition-all duration-300 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Published Research</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Control Engineering Practice (March 2025)
                  </p>
                  <a 
                    href="https://doi.org/10.1016/j.conengprac.2024.106198" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Machine Learning Model-Based Design and Model Predictive Control of a Bioreactor
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

