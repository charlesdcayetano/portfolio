export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId: string;
  category: string;
  verifyUrl?: string;
}

export const certifications: CertificationItem[] = [
  {
    id: "fcu-bsit",
    title: "Bachelor of Science in Information Technology",
    issuer: "Filamer Christian University",
    year: "2025",
    credentialId: "BSIT-2025-FCU",
    category: "Academic Degree",
    verifyUrl: "https://charlesdcayetano.github.io/portfolio/",
  },
  {
    id: "dict-ict",
    title: "ICT Proficiency Diagnostic Exam (Written)",
    issuer: "DICT — Dept. of Information & Communications Tech.",
    year: "2025",
    credentialId: "DICT-ICT-P1",
    category: "Government Credential",
    verifyUrl: "https://dict.gov.ph",
  },
  {
    id: "dbtc-py3",
    title: "Python Level III Developer Residency (486 Hours)",
    issuer: "Digital Business Training Center (DBTC)",
    year: "2025",
    credentialId: "DBTC-PY3-486H",
    category: "Software Engineering",
  },
  {
    id: "ms-cyber",
    title: "Microsoft Cybersecurity Foundations",
    issuer: "Microsoft Learning Pathway",
    year: "2025",
    credentialId: "MS-CYBER-FND",
    category: "Cloud Security",
  },
  {
    id: "vue-adv",
    title: "Vue.js Advanced Engineering Bootcamp",
    issuer: "Frontend Development Track",
    year: "2025",
    credentialId: "VUE-ADV-ENG",
    category: "Frontend Architecture",
  },
  {
    id: "srv-setup",
    title: "Setting Up & Configuring Computer Servers",
    issuer: "Server Administration Core",
    year: "2025",
    credentialId: "SRV-SETUP-TIC",
    category: "Infrastructure",
  },
  {
    id: "ms-cip",
    title: "Critical Infrastructure Protection",
    issuer: "Microsoft Security Track",
    year: "2025",
    credentialId: "MS-CIP-INTRO",
    category: "Cybersecurity",
  },
  {
    id: "ama-mous",
    title: "Business Applications Software (BAS / MOUS)",
    issuer: "AMA Computer College",
    year: "2014",
    credentialId: "AMA-BAS-MOUS",
    category: "Productivity",
  },
];
