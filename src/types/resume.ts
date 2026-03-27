export interface ContactInfo {
  location: string
  phone: string
  email: string
  linkedinUrl: string
  linkedinLabel: string
}

export interface SkillRow {
  label: string
  value: string
}

export interface Experience {
  id: string
  company: string
  dates: string
  role: string
  bullets: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  bullets: string[]
}

export interface EducationLine {
  left: string
  right: string
}

export interface ResumeData {
  name: string
  tagline: string
  contact: ContactInfo
  /** Use **text** for bold segments */
  summary: string
  skills: SkillRow[]
  experience: Experience[]
  projects: Project[]
  education: EducationLine[]
  /** Each string is a certification line (can include **bold**) */
  certifications: string[]
}
