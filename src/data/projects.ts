export type Project = {
  index: string
  name: string
  fullName?: string
  category: string
  description: string
  technologies: string[]
  repo?: string
  live?: string
  focus?: string[]
  note?: string
}

export const projects: Project[] = [
  {
    index: '01',
    name: 'Cheap Resume',
    category: 'SaaS Application',
    description:
      'Real-time resume builder and ATS-oriented document platform built with Laravel, Vue 3, Inertia.js, and Tailwind CSS.',
    technologies: ['Laravel 11', 'Vue 3', 'Inertia.js', 'Tailwind CSS', 'MySQL'],
    repo: 'https://github.com/charlesdcayetano/cheapresume',
    focus: [
      'Resume creation',
      'Live preview',
      'Resume sections',
      'PDF export',
      'Shareable resume URLs',
      'ATS-oriented formatting',
    ],
  },
  {
    index: '02',
    name: 'CSAS',
    fullName: 'Chep Smart Academic System',
    category: 'Academic Management',
    description:
      'Academic management system covering enrollment, grading, and administrative workflows for schools.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    repo: 'https://github.com/charlesdcayetano/csas',
    focus: [
      'Student enrollment',
      'Grading',
      'Faculty loading',
      'Scheduling',
      'Scholastic records',
      'Administrative workflows',
    ],
  },
  {
    index: '03',
    name: 'MediCore',
    category: 'Healthcare Management',
    description:
      'Healthcare management system supporting records, pharmacy, and appointment workflows.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'Bootstrap'],
    repo: 'https://github.com/charlesdcayetano/medicore',
    focus: [
      'Electronic health records',
      'Pharmacy workflows',
      'Appointment / triage workflows',
      'Physician scheduling',
      'Audit-related workflows',
    ],
    note: 'A healthcare workflow system built as a development project, not a currently deployed hospital system.',
  },
  {
    index: '04',
    name: 'CBMS',
    fullName: 'Booking Management System',
    category: 'Booking Platform',
    description:
      'Booking management platform handling reservations, availability, and payment tracking.',
    technologies: ['Laravel 11', 'PHP', 'MySQL', 'Redis', 'Tailwind CSS'],
    repo: 'https://github.com/charlesdcayetano/bms',
    focus: [
      'Reservations',
      'Scheduling',
      'Availability',
      'Customer records',
      'Booking status',
      'Payment tracking',
      'Administrative dashboard',
    ],
  },
  {
    index: '05',
    name: 'Byahe Ta',
    category: 'Transit & Travel',
    description:
      'Transit information tool for route, fare, and terminal information.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Leaflet'],
    repo: 'https://github.com/charlesdcayetano/byahe-ta',
    focus: ['Route information', 'Fare estimation', 'Terminal information', 'Schedule tracking'],
  },
  {
    index: '07',
    name: 'Barangay TAS',
    category: 'Public Service / GovTech',
    description:
      'Online appointment and service-request platform for a local government unit.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    repo: 'https://github.com/charlesdcayetano/barangay-timpas-appointment',
    live: 'https://barangay-timpas-appointment.vercel.app/',
    focus: [
      'Online service requests',
      'Appointment scheduling',
      'Application status',
      'Administrative processing',
      'Constituent records',
    ],
  },
]
