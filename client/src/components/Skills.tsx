const stackManifest = [
  {
    category: "Languages",
    tags: ["Python", "R", "SQL / MySQL", "Java", "MATLAB"],
  },
  {
    category: "ML / AI",
    tags: [
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "XGBoost",
      "HuggingFace Transformers",
      "Neural Networks",
      "EconML",
      "RAG",
      "LLM integration",
      "Text-to-SQL",
    ],
  },
  {
    category: "Cloud & Infra",
    tags: [
      "AWS EC2",
      "AWS Lambda",
      "AWS RDS",
      "AWS S3",
      "AWS Bedrock",
      "AWS SageMaker",
      "Google BigQuery",
      "Cloud Functions",
      "Docker",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  {
    category: "Backend & Data",
    tags: [
      "Django",
      "REST APIs",
      "PostgreSQL",
      "pgvector",
      "Semantic Search",
      "Pandas",
      "NumPy",
      "Selenium",
    ],
  },
  {
    category: "Analysis & Visualization",
    tags: [
      "Statistical Analysis",
      "Causal Inference",
      "A/B Testing",
      "Time Series",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "LookerStudio",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <div className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">
            // stack.manifest
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "Fraunces, var(--font-serif)" }}
          >
            Skills
          </h2>
        </div>

        <div className="space-y-10">
          {stackManifest.map((section) => (
            <div key={section.category}>
              <div className="font-mono text-xs text-muted-foreground/50 uppercase tracking-[0.15em] mb-3">
                {section.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {section.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-sm px-3 py-1.5 border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors rounded cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
