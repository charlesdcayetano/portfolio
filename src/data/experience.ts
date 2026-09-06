export interface ExperienceItem {
  year: string;
  role: string;
  organization: string;
  badge?: string;
  description: string[];
}

export const experiences: ExperienceItem[] = [
  {
    year: "2025 — Present",
    role: "Freelance Front-End & Full-Stack Developer",
    organization: "Independent Practice · Philippines",
    badge: "Active",
    description: [
      "Architect and ship custom web applications, business platforms, and internal operational tools for local organizations and private clients.",
      "Build dynamic SPAs and full-stack solutions with React, Vue 3, Inertia.js, Laravel 11, and MySQL.",
      "Develop secure REST APIs, role-based authorization gates, dynamic reporting dashboards, and invoice/receipt generators.",
    ],
  },
  {
    year: "2025",
    role: "IT Intern · Public Health Operations",
    organization: "Bailan District Hospital (DOLE GIP Program)",
    badge: "Government Internship",
    description: [
      "Assigned to rotations across Hospital Administration, HR, Medical Supply, and Pharmacy departments.",
      "Maintained operational reliability of internal patient registration computers and barcode inventory terminals.",
      "Designed software specifications that directly inspired the architecture of MediCore.",
    ],
  },
  {
    year: "2025",
    role: "Python Level III Developer Residency",
    organization: "Digital Business Training Center (DBTC)",
    badge: "486 Hours Intensive",
    description: [
      "Completed 486 hours of rigorous hands-on software development focusing on OOP architecture, data structures, and automation scripting in Python 3.",
      "Built database adapters, automated batch parsers, and algorithmic problem-solving suites.",
    ],
  },
  {
    year: "2014",
    role: "Computer Servicing & Productivity Intern",
    organization: "AMA Computer Learning Center",
    badge: "Foundations",
    description: [
      "Hardware diagnostic and assembly, network cabling configuration, OS provisioning, and workstation maintenance.",
    ],
  },
];
