import { Card } from "@/components/ui/card";
import { Building2, Calendar } from "lucide-react";

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "Exo Imaging Inc.",
    role: "Software Engineer",
    period: "Aug 2025 — Present",
    achievements: [
      "Engineered scalable REST microservices using Python, Django, and PostgreSQL/pgvector for low-latency medical imaging retrieval and intelligent search.",
      "Integrated and fine-tuned LLM endpoints (AWS Bedrock: Titan, Nova Pro, Cohere) to support RAG, generative text-to-SQL, and semantic search across clinical data systems.",
      "Deployed end-to-end AI workflows on AWS (EC2, Lambda, S3, RDS) with containerized services, CI/CD pipelines, and observability dashboards for latency, drift, and system health.",
      "Collaborated cross-functionally with product and ML teams to design secure, reliable backend components aligned with HIPAA-compliant system requirements."
    ]
  },
  {
    id: 1,
    company: "Rutgers School of Engineering",
    role: "Machine Learning Engineer - Research",
    period: "Jun 2024 — July 2025",
    achievements: [
      "Developed and deployed predictive models, including Random Forest, GLM, and neural networks, using Python and MATLAB, for pharmaceutical, agrochemical, petrochemical, and energy processes.",
      "Integrated artificial neural networks with MATLAB simulations to optimize control strategies and enhance process efficiency.",
      "Conducted experimental validation to ensure model accuracy and reliability in real-world applications.",
      "Contributed to a published study showcasing data-driven solutions for complex bioprocess engineering challenges.",
    ]
  },
  {
    id: 2,
    company: "Rutgers Business School",
    role: "Data Analysis - Research",
    period: "Jun 2024 — Aug 2024",
    achievements: [
      "Developed and deployed machine learning models, including causal forests, using Python, R, Scikit-learn, MySQL and EconML to analyze the impact of robot umpires on player performance, uncovering strategic adjustments and mitigating human bias in decision-making.",
    ]
  },
  {
    id: 3,
    company: "Google via DKSH Smollan",
    role: "Data Science Intern",
    period: "Oct 2021 — Jun 2022",
    achievements: [
      "Designed and developed a business intelligence tool leveraging Python, Google Cloud (BigQuery, Cloud Functions), and LookerStudio, increasing data processing efficiency by 40% and enabling data-driven decision-making.",
      "Led a team of five engineers to manage and optimize over 40 Python scripts and cloud functions, streamlining workflows and accelerating project delivery timelines by 30%.",
      "Automated competitor data extraction through advanced web scraping techniques with Selenium, enhancing market insights and improving competitive strategy formulation.",
      "Optimized query runtimes by 75% and improved system responsiveness by integrating BigQuery for large-scale data analysis and operational efficiency.",
    ]
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Space Grotesk, var(--font-sans)" }}>
            Experience
          </h2>
          <p className="text-muted-foreground text-lg">
            Building data-driven solutions across industries
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className="relative animate-fade-up"
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  animationFillMode: "both"
                }}
              >
                <div className="absolute left-8 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block z-10"></div>
                
                <Card className="md:ml-20 p-6 md:p-8 hover-elevate transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.role}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                          <Building2 className="w-4 h-4" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex gap-3 text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

