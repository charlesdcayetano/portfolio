export interface TechCategory {
  title: string;
  skills: string[];
}

export const techStackCategories: TechCategory[] = [
  {
    title: "Frontend & UI",
    skills: ["React", "Vue.js 3", "Inertia.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3", "Bootstrap"],
  },
  {
    title: "Backend & Database",
    skills: ["Laravel 11", "PHP", "Python 3", "MySQL", "RESTful APIs", "Authentication / RBAC", "CRUD Architecture"],
  },
  {
    title: "AI Tools & Pair Programming",
    skills: ["Claude Code", "GitHub Copilot", "ChatGPT", "Gemini", "Grok", "n8n Automation"],
  },
  {
    title: "Tooling & Design",
    skills: ["Git", "GitHub", "Vite", "VS Code", "Figma", "Canva", "Shopify"],
  },
  {
    title: "Automation & Deployment",
    skills: ["n8n", "Vercel", "Namecheap", "Netlify", "Cloudflare", "Docker", "cPanel", "WHM"],
  },
];

// Flat list for horizontal marquee / stack cloud
export const featuredStackPills = [
  "TypeScript",
  "React",
  "Vue 3",
  "Laravel 11",
  "PHP",
  "MySQL",
  "Tailwind CSS",
  "Inertia.js",
  "Python 3",
  "REST APIs",
  "Claude Code",
  "GitHub",
  "Figma",
  "Docker",
];
