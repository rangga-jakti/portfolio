export const siteConfig = {
  name: "Mirangga Jakti",
  title: "AI-Powered Full-Stack Engineer",
  email: "miranggajakti@gmail.com",
  github: "https://github.com/rangga-jakti",
  linkedin: "https://www.linkedin.com/in/mirangga-jakti-8b0a69334/",
  twitter: "https://twitter.com/mirangga",
  location: "Indonesia 🇮🇩",
  locationFull: "Based in Indonesia 🇮🇩 — Open to global remote opportunities",
  heroDescription:
    "I design and build AI-powered web applications that solve real-world problems. From market trend analysis tools to full-stack SaaS platforms, I focus on speed, scalability, and intelligent automation. Currently building products that combine data, AI, and user experience into powerful digital solutions.",
};

export const heroStats = [
  { number: "15+", label: "Projects Built" },
  { number: "2",   label: "AI SaaS Products" },
  { number: "5+",  label: "Machine Learning Models" },
  { number: "∞",   label: "Real-world AI Applications" },
];

export const skills = [
  { name: "Python",       category: "language" },
  { name: "TypeScript",   category: "language" },
  { name: "React",        category: "frontend" },
  { name: "Next.js",      category: "frontend" },
  { name: "Node.js",      category: "backend" },
  { name: "FastAPI",      category: "backend" },
  { name: "LangChain",    category: "ai" },
  { name: "Groq API",     category: "ai" },
  { name: "LLaMA",        category: "ai" },
  { name: "Scikit-learn", category: "ai" },
  { name: "Prophet",      category: "ai" },
  { name: "PostgreSQL",   category: "database" },
  { name: "Supabase",     category: "database" },
  { name: "Docker",       category: "devops" },
  { name: "Vercel",       category: "devops" },
];

export const featuredProjects = [
  {
    id: 1,
    title: "TrendPulse AI",
    description:
      "AI-powered market trend analysis platform that aggregates real-time signals from Google Trends and live news, then generates deep strategic insights using LLaMA via Groq API — with time-series forecasting powered by Prophet.",
    tech: ["Next.js", "Python", "Groq API", "LLaMA", "Prophet", "Google Trends API"],
    github: "https://github.com/rangga-jakti/trendpulse-ai",
    live: null,
    gradient: "from-cyan-glow/10 to-blue-500/5",
    type: "SaaS Product",
    typeColor: "text-cyan-glow border-cyan-glow/30 bg-cyan-dim",
  },
  {
    id: 2,
    title: "VentureLens AI",
    description:
      "AI startup idea validator that generates comprehensive market analysis in seconds. Built for founders and indie hackers who need fast, data-driven validation before committing to an idea.",
    tech: ["Next.js", "TypeScript", "LangChain", "OpenAI", "Supabase", "Tailwind"],
    github: "https://github.com/rangga-jakti/venturelens-ai",
    live: null,
    gradient: "from-amber-glow/10 to-orange-500/5",
    type: "SaaS Product",
    typeColor: "text-amber-glow border-amber-glow/30 bg-amber-dim",
  },
];

export const mlProjects = [
  {
    id: 3,
    title: "Credit Risk Classification",
    description:
      "Machine learning model to predict loan default risk. Features comprehensive feature engineering, model evaluation pipeline, and explainability reports for financial decision-making.",
    tech: ["Python", "Scikit-learn", "Pandas", "XGBoost", "Matplotlib"],
    github: null,
    live: null,
    icon: "shield",
    private: true,
  },
  {
    id: 4,
    title: "Stock Price Prediction",
    description:
      "Time-series forecasting model for stock price prediction. Applies advanced predictive analytics with temporal pattern recognition to forecast market movements.",
    tech: ["Python", "Prophet", "LSTM", "Pandas", "yFinance"],
    github: null,
    live: null,
    icon: "trending",
    private: true,
  },
  {
    id: 5,
    title: "Malware Detection",
    description:
      "ML-based malware classification system for cybersecurity threat analysis. Classifies binary samples using behavioral and static feature extraction.",
    tech: ["Python", "Scikit-learn", "Random Forest", "Feature Engineering"],
    github: null,
    live: null,
    icon: "bug",
    private: true,
  },
  {
    id: 6,
    title: "Sales Analysis & Prediction",
    description:
      "Data-driven sales forecasting model combining historical trend analysis with ML prediction. Helps businesses anticipate demand and optimize inventory.",
    tech: ["Python", "Prophet", "Scikit-learn", "Seaborn", "Streamlit"],
    github: null,
    live: null,
    icon: "bar-chart",
    private: true,
  },
];

export const experiences = [
  {
    id: 1,
    company: "Independent Builder",
    role: "AI-Powered Full-Stack Engineer",
    period: "2023 — Present",
    description:
      "Self-directed journey building real AI products from scratch. Designed and shipped multiple AI-powered SaaS tools focusing on market intelligence and startup validation — integrating LLMs, data pipelines, and modern web interfaces.",
    highlights: ["AI SaaS", "LLM Integration", "Full-Stack"],
    logo: "MJ",
  },
  {
    id: 2,
    company: "Self-Learning & Projects",
    role: "ML Engineer & Full-Stack Developer",
    period: "2022 — 2023",
    description:
      "Intensive learning phase covering machine learning, modern web development, and data science. Built 15+ projects spanning web apps, ML models, and data dashboards to develop a strong technical foundation.",
    highlights: ["Machine Learning", "Web Dev", "15+ Projects"],
    logo: "SL",
  },
];
