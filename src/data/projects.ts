export interface Project {
  id: string;
  number: string;
  badge: string;
  tags: string[];
  title: string;
  subtitle: string;
  description: string;
  niche: string;
  features: string[];
  tech: string[];
  github: string;
  demo?: string;
  image: string;
}

export const flagshipProjects: Project[] = [
  {
    id: "chep-pos",
    number: "01",
    badge: "Retail Platform",
    tags: ["POS Terminal", "Offline-Tolerant", "Inventory"],
    title: "Chep-POS",
    subtitle: "Retail Management & Point of Sale System",
    description:
      "A centralized POS platform with real-time barcode scanning, inventory auditing, sales tracking, and transaction reporting designed for Philippine retail counters.",
    niche:
      "Built specifically for sari-sari stores and community retailers that need an immediate, lightweight checkout workflow rather than bloated enterprise software.",
    features: [
      "POS Checkout Terminal",
      "Inventory Management",
      "Sales Tracking",
      "Customer Ledger",
      "Daily Shift Reports",
    ],
    tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/charlesdcayetano/chep-pos",
    demo: "https://github.com/charlesdcayetano/chep-pos",
    image:
      "https://charlesdcayetano.github.io/portfolio/images/system/POS.webp",
  },

  {
    id: "cheap-resume",
    number: "02",
    badge: "SaaS Application",
    tags: ["ATS-Friendly", "PDF Generator", "Split-Screen"],
    title: "Cheap Resume",
    subtitle: "Real-Time Resume Builder & SaaS Platform",
    description:
      "A real-time split-screen editor with cloud persistence, instantaneous PDF export, and shareable preview links built on Laravel 11, Vue 3, and Inertia.js.",
    niche:
      "Solves the gap between free-but-ugly templates and aggressive paid builders that lock document downloads behind a paywall.",
    features: [
      "Split-Screen Live Preview",
      "ATS Optimization",
      "Vector PDF Export",
      "Cloud Profile Storage",
      "Shareable URLs",
    ],
    tech: ["Laravel 11", "Vue 3", "Inertia.js", "Tailwind CSS", "MySQL"],
    github: "https://github.com/charlesdcayetano/cheapresume",
    demo: "https://github.com/charlesdcayetano/cheapresume",
    image:
      "https://charlesdcayetano.github.io/portfolio/images/system/chepresume.webp",
  },

  {
    id: "medicore",
    number: "03",
    badge: "Healthcare System",
    tags: ["Hospital Records", "Pharmacy", "Clinical Ops"],
    title: "MediCore",
    subtitle: "District Hospital Management Platform",
    description:
      "An integrated healthcare information system unifying electronic patient medical records, pharmacy inventory dispatch, appointment triage, and doctor rounds.",
    niche:
      "Directly modeled on actual district hospital workflows observed during public health IT rotations in Capiz, Philippines.",
    features: [
      "Electronic Health Records",
      "Pharmacy Batch Tracking",
      "Patient Appointment Triage",
      "Physician Scheduling",
      "Audit Trails",
    ],
    tech: ["Laravel", "PHP", "MySQL", "REST APIs", "Bootstrap"],
    github: "https://github.com/charlesdcayetano/medicore",
    demo: "https://github.com/charlesdcayetano/medicore",
    image:
      "https://charlesdcayetano.github.io/portfolio/images/system/medicore.webp",
  },

  {
    id: "cbms",
    number: "04",
    badge: "Booking Platform",
    tags: ["Reservations", "Scheduling", "Payments"],
    title: "CBMS — Booking Management System",
    subtitle: "Reservation, Scheduling & Payment Management Platform",
    description:
      "A web-based booking management system that centralizes customer reservations, service schedules, availability, booking status, and payment records into a single administrative platform.",
    niche:
      "Designed for businesses that manage appointments or reservations manually through chat, spreadsheets, and paper records, providing a structured workflow from booking creation to confirmation and payment tracking.",
    features: [
      "Online Booking & Reservation Management",
      "Real-Time Availability Scheduling",
      "Customer & Booking Records",
      "Booking Status Management",
      "Payment & Transaction Tracking",
      "Administrative Dashboard",
    ],
    tech: ["Laravel 11", "PHP", "MySQL", "Redis", "Tailwind CSS"],
    github: "https://github.com/charlesdcayetano/bms",
    demo: "https://github.com/charlesdcayetano/bms",
    image:
      "https://charlesdcayetano.github.io/portfolio/images/UI/BMS.webp",
  },

  {
    id: "byahe-ta",
    number: "05",
    badge: "Transit & Travel",
    tags: ["Commute Guide", "Fare Calculator", "Terminals"],
    title: "Byahe Ta",
    subtitle: "Public Commute & Transit Information Portal",
    description:
      "A public transit guide centralizing local jeepney and bus routes, timetable schedules, fare matrices, and terminal locations for daily commuters.",
    niche:
      "Provides transparent route information and fare calculation for provincial travelers navigating public transit networks.",
    features: [
      "Interactive Route Directory",
      "Fare Estimation Calculator",
      "Terminal Directory",
      "Schedule Tracker",
    ],
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "Leaflet"],
    github: "https://github.com/charlesdcayetano/byahe-ta",
    demo: "https://github.com/charlesdcayetano/byahe-ta",
    image:
      "https://charlesdcayetano.github.io/portfolio/images/UI/ByaheTa.webp",
  },

  {
    id: "filtracer",
    number: "06",
    badge: "Capstone Thesis",
    tags: ["Alumni Registry", "Survey Analytics", "Filamer Univ."],
    title: "FilTracer",
    subtitle: "Alumni Tracking System for Filamer Christian University",
    description:
      "A university-wide alumni engagement and employment tracking portal developed as a 4th-year BSIT capstone to automate alumni surveys and accreditation data.",
    niche:
      "Replaced an entire physical filing cabinet of alumni registration cards with a secure searchable institutional database.",
    features: [
      "Graduate Directory",
      "Career Placement Tracking",
      "Accreditation Reports",
      "Employment Analytics",
    ],
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    github: "https://github.com/charlesdcayetano/filtracer",
    demo: "https://github.com/charlesdcayetano/filtracer",
    image:
      "https://charlesdcayetano.github.io/portfolio/images/system/filtracer.webp",
  },
];

export interface SecondaryProject {
  title: string;
  category: string;
  description: string;
  tech: string;
  link?: string;
}

export const secondaryProjects: SecondaryProject[] = [
  {
    title: "CSAS — Chep Smart Academic System",
    category: "Higher Education",
    description:
      "Smart academic management platform covering enrollment workflows, grading sheets, faculty loads, and student scholastic records.",
    tech: "Laravel · MySQL · Bootstrap",
  },

  {
    title: "Staff-Sync",
    category: "Human Resources",
    description:
      "HR and employee portal with biometric attendance records, payroll computation, leave management, and evaluation forms.",
    tech: "HTML5 · CSS3 · JavaScript · PHP",
  },

  {
    title: "EnrollMate",
    category: "Enrollment Workflow",
    description:
      "Streamlined registration portal designed for student onboarding and document validation.",
    tech: "Laravel · MySQL · PHP",
  },

  {
    title: "PanitCart",
    category: "E-Commerce & POS",
    description:
      "Online catalog and inventory counter built for local small-business product catalogs and order processing.",
    tech: "Laravel · MySQL · PHP",
  },
];