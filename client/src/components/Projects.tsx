import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "FortuneFlow",
    description: "A company that allows young adults and earners to learn about personal finance and invest in the future, through proper financial planning done by professionals and state of the art AI models.",
    image: "/assets/images/fortuneflow.png",
    category: "Personal Finance",
    date: "September, 2025",
    githubUrl: "https://fortuneflow.net"
  },
  {
    id: 2,
    title: "Rossmann Retail Sales Forecasting",
    description: "Accurate Retail Sales Forecasting using Machine Learning, Causal Impact Analysis, and Explainable AI (SHAP). Full end-to-end pipeline for predicting Rossmann daily sales and quantifying promotion effects.",
    image: "/assets/images/rossman_forecasting.png",
    category: "Analytics & Machine Learning",
    date: "April, 2025",
    githubUrl: "https://github.com/RonitGandhi/rossmann_forecasting"
  },
  {
    id: 3,
    title: "Job Postings Insights Extraction Using NLP and ML",
    description: "Extraction of structured insights (skills, salary, remote status) from real-world job postings using NLP, ML embeddings, and clustering. Visualized trends across 120,000+ jobs. Hybrid LLM + NLP pipeline.",
    image: "/assets/images/job_posting.png",
    category: "Analytics & Machine Learning",
    date: "April, 2025",
    githubUrl: "https://github.com/RonitGandhi/Multi-BIONER"
  },
  {
    id: 4,
    title: "Multi-BIONER",
    description: "Multi-Task Learning for Biomedical Named Entity Recognition (BioNER) with Cross-Sharing Knowledge",
    image: "/assets/images/bioner.webp",
    category: "NLP",
    date: "Dec, 2024",
    githubUrl: "https://github.com/RonitGandhi/Multi-BIONER"
  },
  {
    id: 5,
    title: "Gold Trading Strategies",
    description: "This project explores and evaluates three gold trading strategies using Pytrends data, technical indicators (RSI, MACD, Bollinger Bands, SMA/EMA), and hybrid approaches.",
    image: "/assets/images/gold.webp",
    category: "Finance & Data Science",
    date: "Dec, 2024",
    githubUrl: "https://github.com/RonitGandhi/GoldTradingStratergy"
  },
  {
    id: 6,
    title: "NLP Stock Analysis",
    description: "This project uses natural language processing (NLP) techniques to analyze stock data and identify patterns, includes a published website",
    image: "/assets/images/nlp_stocks.webp",
    category: "Finance & Data Science",
    date: "Jan, 2025",
    githubUrl: "https://github.com/RonitGandhi/FinancialEngineering"
  },
  {
    id: 7,
    title: "Deep Learning for Image Classification",
    description: "This project uses deep learning to classify land images into different categories. It evaluates 3 different DL models and draws a comparison between them",
    image: "/assets/images/image_classification.webp",
    category: "Deep Learning",
    date: "Feb, 2025",
    githubUrl: "https://github.com/RonitGandhi/DL-for-Image-Classification"
  },
  {
    id: 8,
    title: "Credit Card Fraud Detection",
    description: "Developed and optimized machine learning models using SMOTE, Random Forest, and XGBoost to address class imbalance in fraud detection, achieving high precision and recall through feature engineering and data preprocessing.",
    image: "/assets/images/credit.webp",
    category: "ML & Data Science",
    date: "Jan, 2024",
    githubUrl: "https://github.com/RonitGandhi/Credit-Card-Fraud-Detection"
  },
  {
    id: 9,
    title: "DTH System",
    description: "Implementing a Distributed Hash Table (DHT) System for Scalable and Fault-Tolerant Key-Value Storage involves creating a decentralized infrastructure where nodes collectively manage key-value pairs.",
    image: "/assets/images/dth.webp",
    category: "DSA",
    date: "Dec, 2023",
    githubUrl: "https://github.com/RonitGandhi/DTH-System"
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Space Grotesk, var(--font-sans)" }}>
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-world applications of machine learning and data science
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id}
              className="overflow-hidden hover-elevate transition-all duration-300 group cursor-pointer"
              onClick={() => window.open(project.githubUrl, "_blank")}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "both"
              }}
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x225?text=Project+Image";
                  }}
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{project.category}</Badge>
                  <span className="text-xs text-muted-foreground">{project.date}</span>
                </div>
                <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {project.description}
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary group-hover:underline">
                    View on GitHub →
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

