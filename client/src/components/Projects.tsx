import { ExternalLink } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  url: string;
  urlLabel: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "FortuneFlow",
    description: "A platform helping young adults learn personal finance and invest intelligently — combining professional financial planning with state-of-the-art AI models for personalized guidance.",
    category: "FinTech · AI",
    date: "Sep 2025",
    url: "https://fortuneflow.net",
    urlLabel: "fortuneflow.net",
  },
  {
    id: 2,
    title: "Rossmann Retail Sales Forecasting",
    description: "End-to-end ML pipeline for predicting Rossmann daily sales using causal impact analysis and SHAP for promotion effect quantification.",
    category: "ML · Analytics",
    date: "Apr 2025",
    url: "https://github.com/RonitGandhi/rossmann_forecasting",
    urlLabel: "GitHub",
  },
  {
    id: 3,
    title: "Job Postings Insights — NLP & ML",
    description: "Hybrid LLM + NLP pipeline extracting structured insights (skills, salary, remote status) from 120K+ real-world job postings with clustering and trend visualizations.",
    category: "NLP · Analytics",
    date: "Apr 2025",
    url: "https://github.com/RonitGandhi/Multi-BIONER",
    urlLabel: "GitHub",
  },
  {
    id: 4,
    title: "Multi-BIONER",
    description: "Multi-task learning for Biomedical Named Entity Recognition using a cross-sharing knowledge architecture across multiple biomedical corpora.",
    category: "NLP · Deep Learning",
    date: "Dec 2024",
    url: "https://github.com/RonitGandhi/Multi-BIONER",
    urlLabel: "GitHub",
  },
  {
    id: 5,
    title: "Gold Trading Strategies",
    description: "Evaluation of three gold trading strategies using Pytrends data, technical indicators (RSI, MACD, Bollinger Bands, SMA/EMA), and hybrid quantitative approaches.",
    category: "Finance · Quant",
    date: "Dec 2024",
    url: "https://github.com/RonitGandhi/GoldTradingStratergy",
    urlLabel: "GitHub",
  },
  {
    id: 6,
    title: "NLP Stock Analysis",
    description: "NLP techniques applied to stock data for pattern identification and sentiment analysis, with a published interactive visualization site.",
    category: "Finance · NLP",
    date: "Jan 2025",
    url: "https://github.com/RonitGandhi/FinancialEngineering",
    urlLabel: "GitHub",
  },
  {
    id: 7,
    title: "Deep Learning for Image Classification",
    description: "Comparative evaluation of three deep learning architectures for land image classification — benchmarking accuracy, training efficiency, and generalization.",
    category: "Deep Learning · CV",
    date: "Feb 2025",
    url: "https://github.com/RonitGandhi/DL-for-Image-Classification",
    urlLabel: "GitHub",
  },
  {
    id: 8,
    title: "Credit Card Fraud Detection",
    description: "ML pipeline using SMOTE, Random Forest, and XGBoost to address class imbalance in fraud detection — high precision and recall through feature engineering.",
    category: "ML · Security",
    date: "Jan 2024",
    url: "https://github.com/RonitGandhi/Credit-Card-Fraud-Detection",
    urlLabel: "GitHub",
  },
  {
    id: 9,
    title: "Distributed Hash Table System",
    description: "Decentralized DHT infrastructure where nodes collectively manage key-value pairs with fault-tolerant replication and consistent hashing for scalable storage.",
    category: "Systems · DSA",
    date: "Dec 2023",
    url: "https://github.com/RonitGandhi/DTH-System",
    urlLabel: "GitHub",
  },
];

const featured = projects[0];
const rest = projects.slice(1);

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <div className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">
            // projects
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "Fraunces, var(--font-serif)" }}
          >
            Projects
          </h2>
        </div>

        {/* Featured */}
        <div
          className="group mb-8 p-8 md:p-10 border border-border rounded-lg cursor-pointer hover:border-primary/40 transition-all duration-300"
          onClick={() => window.open(featured.url, "_blank")}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs text-primary border border-primary/30 px-2 py-0.5 rounded">
                featured
              </span>
              <span className="font-mono text-xs text-muted-foreground/60">
                {featured.category}
              </span>
            </div>
            <span className="font-mono text-xs text-muted-foreground/40 flex-shrink-0">
              {featured.date}
            </span>
          </div>

          <h3
            className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors"
            style={{ fontFamily: "Fraunces, var(--font-serif)" }}
          >
            {featured.title}
          </h3>

          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
            {featured.description}
          </p>

          <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
            <ExternalLink className="w-4 h-4" />
            <span>{featured.urlLabel}</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((project, i) => (
            <div
              key={project.id}
              className="group p-6 border border-border rounded-lg cursor-pointer hover:border-primary/40 transition-all duration-300 flex flex-col"
              onClick={() => window.open(project.url, "_blank")}
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <span className="font-mono text-xs text-muted-foreground/50">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-muted-foreground/35 flex-shrink-0">
                  {project.date}
                </span>
              </div>

              <h3
                className="text-lg font-semibold leading-snug mb-3 group-hover:text-primary transition-colors"
                style={{ fontFamily: "Fraunces, var(--font-serif)" }}
              >
                {project.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                {project.description}
              </p>

              <div className="mt-5 pt-4 border-t border-border flex items-center gap-1.5 text-xs font-medium text-primary">
                <ExternalLink className="w-3 h-3" />
                <span>{project.urlLabel} →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
