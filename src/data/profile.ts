export interface ProfileData {
  title: string;
  name: string;
  role: string;
  location: string;
  email: string;
  avatarUrl: string;
  bio1: string;
  bio2: string;
  socials: {
    label: string;
    href: string;
  }[];
  stats: {
    value: string;
    label: string;
    detail?: string;
  }[];
}



// src/data/profile.ts

export const profile: ProfileData = {
  name: "Charles D. Cayetano",
  role: "Front-End & Full-Stack Developer",
  location: "Roxas City, Capiz, Philippines",
  email: "cayetanocharlesd92000@gmail.com",
  avatarUrl: "./images/Portfolio.webp", // Fixed: Removed /public
  bio1: "I'm a front-end and full-stack developer based in the Philippines. I build applications where the interface, backend, database, and business rules seamlessly connect.",
  bio2: "Most of my work centers around operational business platforms and management systems, hospital workflows, local government registries, and ATS resume tools.",
  socials: [
    { label: "github ↗", href: "https://github.com/charlesdcayetano" },
    { label: "linkedin ↗", href: "https://www.linkedin.com/in/charlesdcayetano/" },
    { label: "facebook ↗", href: "https://www.facebook.com/parengchep" },
    { label: "x ↗", href: "https://x.com/ch4rlescayetano" },
  ],
  stats: [
    { value: "6+", label: "featured systems", detail: "End-to-end platforms shipped" },
    { value: "14+", label: "credentials", detail: "Diplomas & specialized trainings" },
    { value: "BSIT", label: "Filamer Christian University.", detail: "Batch 2025 Graduate" },
    { value: "GMT+8", label: "Philippines", detail: "Available for remote & Full-time" },
  ],
  title: "Front-End & Full-Stack Developer"
};
