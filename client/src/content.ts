/* All portfolio copy lives here so the 3D world and Classic view stay word-for-word identical. */

export interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  period: string;
  duration: string;
  status: "LIVE" | "ARCHIVED";
  stack: string[];
  achievements: string[];
}

export const experiences: ExperienceItem[] = [
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

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  url: string;
  urlLabel: string;
}

export const projects: Project[] = [
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

export interface Publication {
  id: number;
  title: string;
  journal: string;
  date: string;
  doi: string;
  description: string;
}

export const publications: Publication[] = [
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

export const stackManifest = [
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

export const stackChips = [
  "AWS EKS · Lambda · RDS · S3",
  "Python · Django",
  "PostgreSQL · pgvector",
  "Bedrock · SageMaker",
  "Docker · GitHub Actions",
  "RAG · Semantic Search",
];

export const identity = {
  name: "Ronit Gandhi",
  role: "AI Platform Engineer @ Exo Imaging Inc.",
  tagline:
    "Building scalable backends and AI integrations for hospital-facing medical imaging systems. M.S. Statistics, Rutgers.",
};

/** Text with optional emphasis, so styling never changes the words. */
export type Rich = { text: string; em?: boolean }[];

export const aboutStatement: Rich = [
  { text: "I'm a " },
  { text: "AI Platform Engineer", em: true },
  {
    text: " at Exo Imaging, building the backend infrastructure and AI systems behind hospital-facing medical imaging products. My work sits at the intersection of scalable services and applied ML — REST microservices, cloud architecture, and LLM integrations that run in production.",
  },
];

export const aboutParagraphs: Rich[] = [
  [
    {
      text: "Before Exo, I spent a year as an ML Engineer in research at Rutgers School of Engineering, applying predictive models to pharmaceutical and bioprocess problems — including a published paper in ",
    },
    { text: "Control Engineering Practice", em: true },
    {
      text: ". I started building in industry with a data science internship at Google via DKSH Smollan, where I led a small team shipping BI tooling on Google Cloud.",
    },
  ],
  [
    {
      text: "My foundation is a B.Tech in Electronics Engineering (University of Mumbai) and an M.S. in Statistics — Data Science from Rutgers. The engineering background shapes how I think about systems; the statistics background shapes how I think about uncertainty.",
    },
  ],
];

export const aboutFacts = ["New Jersey, USA", "3+ years exp.", "3 publications"];

export const education = [
  {
    title: "M.S. Statistics — Data Science",
    meta: "Rutgers University · 2023 — 2025 · GPA 3.8",
    body: "ML, statistical inference, causal inference, predictive modeling",
  },
  {
    title: "B.Tech — Electronics Engineering",
    meta: "University of Mumbai · 2019 — 2023 · CGPA 8.26",
    body: "Systems thinking, embedded systems, signal processing",
  },
];

export const research = {
  title: "Published Research",
  meta: "Control Engineering Practice · March 2025",
  label: "ML Model-Based Design and MPC of a Bioreactor",
  href: "https://doi.org/10.1016/j.conengprac.2024.106198",
};

export const contactLinks = [
  { href: "https://github.com/RonitGandhi", label: "GitHub", kind: "github", external: true },
  { href: "https://www.linkedin.com/in/ronit-gandhi-5a65941aa/", label: "LinkedIn", kind: "linkedin", external: true },
  { href: "mailto:ronitgandhi1610@gmail.com", label: "ronitgandhi1610@gmail.com", kind: "mail", external: false },
] as const;

export const contactLocation = "New Brunswick, New Jersey, USA";

export const openTo = {
  title: "Open to Conversations",
  body: "Always happy to talk about interesting backend, infra, or AI engineering problems — full-time, consulting, or just a good conversation.",
};

/** Section eyebrows and titles, used for both the page headers and the 3D building signs. */
export const sections = [
  { id: "about", eyebrow: "// profile", title: "About Me", nav: "About" },
  { id: "experience", eyebrow: "// deployment.log", title: "Experience", nav: "Experience" },
  { id: "skills", eyebrow: "// stack.manifest", title: "Skills", nav: "Skills" },
  { id: "projects", eyebrow: "// projects", title: "Projects", nav: "Projects" },
  { id: "publications", eyebrow: "// publications", title: "Publications", nav: "Publications" },
  { id: "contact", eyebrow: "// contact", title: "Get In Touch", nav: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
