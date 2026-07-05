interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  period: string;
  duration: string;
  status: "LIVE" | "ARCHIVED";
  stack: string[];
  achievements: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "Exo Imaging Inc.",
    role: "AI Platform Engineer",
    period: "Aug 2025 — Present",
    duration: "11 mo",
    status: "LIVE",
    stack: ["Python", "Django", "PostgreSQL", "pgvector", "AWS EC2/Lambda/S3/RDS", "Bedrock", "Docker", "CI/CD"],
    achievements: [
      "Engineered scalable REST microservices using Python, Django, and PostgreSQL/pgvector for low-latency medical imaging retrieval and intelligent search.",
      "Integrated and fine-tuned LLM endpoints (AWS Bedrock: Titan, Nova Pro, Cohere) to support RAG, generative text-to-SQL, and semantic search across clinical data systems.",
      "Deployed end-to-end AI workflows on AWS (EC2, Lambda, S3, RDS) with containerized services, CI/CD pipelines, and observability dashboards for latency, drift, and system health.",
      "Collaborated cross-functionally with product and ML teams to design secure, reliable backend components aligned with HIPAA-compliant system requirements.",
    ],
  },
  {
    id: 2,
    company: "Rutgers School of Engineering",
    role: "Machine Learning Engineer — Research",
    period: "Jun 2024 — Jul 2025",
    duration: "13 mo",
    status: "ARCHIVED",
    stack: ["Python", "MATLAB", "Random Forest", "GLM", "Neural Networks", "Scikit-learn"],
    achievements: [
      "Developed and deployed predictive models (Random Forest, GLM, neural networks) for pharmaceutical, agrochemical, and petrochemical process engineering.",
      "Integrated artificial neural networks with MATLAB simulations to optimize control strategies and enhance process efficiency.",
      "Contributed to a published study in Control Engineering Practice on data-driven bioprocess engineering solutions.",
    ],
  },
  {
    id: 3,
    company: "Rutgers Business School",
    role: "Data Analysis — Research",
    period: "Jun 2024 — Aug 2024",
    duration: "3 mo",
    status: "ARCHIVED",
    stack: ["Python", "R", "EconML", "Causal Forests", "Scikit-learn", "MySQL"],
    achievements: [
      "Developed causal forest models using Python, R, and EconML to analyze the impact of robot umpires on MLB player performance, uncovering strategic adjustments and mitigating human bias in decision-making.",
    ],
  },
  {
    id: 4,
    company: "Google via DKSH Smollan",
    role: "Data Science Intern",
    period: "Oct 2021 — Jun 2022",
    duration: "9 mo",
    status: "ARCHIVED",
    stack: ["Python", "BigQuery", "Cloud Functions", "LookerStudio", "Selenium"],
    achievements: [
      "Designed and built a BI tool on Google Cloud (BigQuery, Cloud Functions, LookerStudio), increasing data processing efficiency by 40% and enabling data-driven decision-making.",
      "Led a team of five engineers managing 40+ Python scripts and cloud functions, accelerating project delivery by 30%.",
      "Optimized query runtimes by 75% through BigQuery integration for large-scale operational data analysis.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 bg-muted/20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <div className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">
            // deployment.log
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "Fraunces, var(--font-serif)" }}
          >
            Experience
          </h2>
        </div>

        <div className="relative">
          {/* Vertical connector */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border hidden md:block"></div>

          <div className="space-y-14">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative md:pl-12">
                {/* Node */}
                <div className="absolute left-0 top-1 w-6 h-6 hidden md:flex items-center justify-center">
                  {exp.status === "LIVE" ? (
                    <div className="w-3 h-3 rounded-full bg-teal-500 ring-4 ring-teal-500/20"></div>
                  ) : (
                    <div className="w-3 h-3 rounded-full border-2 border-muted-foreground/40 bg-background"></div>
                  )}
                </div>

                {/* Status + duration */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`font-mono text-xs font-medium tracking-wider ${
                      exp.status === "LIVE" ? "text-teal-500" : "text-muted-foreground/50"
                    }`}
                  >
                    {exp.status === "LIVE" ? "● LIVE" : "◎ ARCHIVED"}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/40">
                    {exp.duration}
                  </span>
                </div>

                {/* Role */}
                <h3
                  className="text-2xl font-semibold mb-1 text-foreground"
                  style={{ fontFamily: "Fraunces, var(--font-serif)" }}
                >
                  {exp.role}
                </h3>

                {/* Company + period */}
                <div className="font-mono text-sm text-muted-foreground mb-4">
                  {exp.company}
                  <span className="mx-2 text-muted-foreground/40">·</span>
                  {exp.period}
                </div>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {exp.stack.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2 py-0.5 border border-border text-muted-foreground/60 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Achievements */}
                <ul className="space-y-2.5">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground text-sm leading-relaxed">
                      <span className="text-primary mt-0.5 flex-shrink-0">—</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
