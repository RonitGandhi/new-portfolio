import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Brain, Code, Database, LineChart, Wrench, Cloud } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skillsData: Skill[] = [
  // Programming Languages
  { name: "Python", level: 90, category: "Programming" },
  { name: "Java", level: 75, category: "Programming" },
  { name: "R", level: 85, category: "Programming" },
  { name: "SQL/MySQL", level: 88, category: "Programming" },
  { name: "MATLAB", level: 80, category: "Programming" },
  
  // ML/AI Frameworks & Libraries
  { name: "Scikit-learn", level: 90, category: "ML/AI" },
  { name: "TensorFlow", level: 80, category: "ML/AI" },
  { name: "PyTorch", level: 75, category: "ML/AI" },
  { name: "HuggingFace Transformers", level: 80, category: "ML/AI" },
  { name: "XGBoost", level: 85, category: "ML/AI" },
  { name: "Random Forest", level: 90, category: "ML/AI" },
  { name: "Neural Networks", level: 85, category: "ML/AI" },
  { name: "EconML", level: 75, category: "ML/AI" },
  
  // Data Analysis & Statistics
  { name: "Statistical Analysis", level: 90, category: "Analysis" },
  { name: "Causal Inference", level: 80, category: "Analysis" },
  { name: "A/B Testing", level: 85, category: "Analysis" },
  { name: "Time Series Analysis", level: 80, category: "Analysis" },
  
  // Data Visualization
  { name: "Matplotlib", level: 88, category: "Visualization" },
  { name: "Seaborn", level: 85, category: "Visualization" },
  { name: "Plotly", level: 80, category: "Visualization" },
  { name: "LookerStudio", level: 75, category: "Visualization" },
  
  // Cloud Platforms
  { name: "AWS", level: 70, category: "Cloud" },
  { name: "Google Cloud Platform", level: 75, category: "Cloud" },
  { name: "BigQuery", level: 80, category: "Cloud" },
  { name: "Cloud Functions", level: 75, category: "Cloud" },
  
  // Tools & Frameworks
  { name: "Git", level: 88, category: "Tools" },
  { name: "Docker", level: 75, category: "Tools" },
  { name: "Jupyter Notebooks", level: 90, category: "Tools" },
  { name: "Selenium", level: 80, category: "Tools" },
  { name: "Web Scraping", level: 85, category: "Tools" },
  { name: "Pandas", level: 92, category: "Tools" },
  { name: "NumPy", level: 90, category: "Tools" },
];

const categories = [
  { name: "All", icon: Brain },
  { name: "ML/AI", icon: Brain, color: "text-chart-1" },
  { name: "Programming", icon: Code, color: "text-chart-2" },
  { name: "Analysis", icon: LineChart, color: "text-chart-3" },
  { name: "Visualization", icon: Database, color: "text-chart-4" },
  { name: "Tools", icon: Wrench, color: "text-chart-5" },
  { name: "Cloud", icon: Cloud, color: "text-chart-1" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleSkills, setVisibleSkills] = useState<Skill[]>([]);

  useEffect(() => {
    if (activeCategory === "All") {
      setVisibleSkills(skillsData);
    } else {
      setVisibleSkills(skillsData.filter(skill => skill.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Space Grotesk, var(--font-sans)" }}>
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for turning data into actionable insights
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover-elevate ${
                  activeCategory === category.name 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-card hover:bg-accent"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleSkills.map((skill, index) => (
            <Card 
              key={skill.name} 
              className="p-6 hover-elevate transition-all duration-300"
              style={{ 
                animationDelay: `${index * 0.05}s`,
                animationFillMode: "both"
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                  <span className="text-sm font-medium text-primary">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">{skill.category}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

