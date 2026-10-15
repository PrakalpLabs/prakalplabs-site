export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  capabilities: string[];
  businessProblems: string[];
  deliverables: string[];
  technologies: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  order?: number;
  featured?: boolean;
}

export type ProjectCategory =
  | "Web Development"
  | "Custom Software"
  | "Web Application Development"
  | "UI/UX Design"
  | "Digital Products"
  | "Business Automation"
  | "Automation"
  | "Technology Consulting"
  | "Consulting"
  | "Innovative Software Solutions"
  | "Enterprise Systems";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  overview: string;
  problemStatement: string;
  solution: string;
  category: ProjectCategory;
  technologies: string[];
  features: string[];
  image: string;
  demoUrl?: string;
  repositoryUrl?: string;
  status: "draft" | "published";
  featured?: boolean;
  publishedAt?: string;
}

export interface InquiryInput {
  fullName: string;
  email: string;
  companyName?: string;
  projectType: string;
  estimatedBudget?: string;
  projectDescription: string;
  preferredContactMethod?: "email" | "phone" | "video_call";
  honeypot?: string; // spam protection
}

export interface Inquiry extends InquiryInput {
  id: string;
  status: "New" | "Contacted" | "In Discussion" | "Converted" | "Closed";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  positioning: string;
  shortDescription: string;
  longDescription: string;
  mission: string;
  vision: string;
  engineeringPhilosophy: {
    title: string;
    description: string;
    icon: string;
  }[];
  values: {
    title: string;
    description: string;
  }[];
  approach: {
    step: string;
    title: string;
    description: string;
  }[];
  contactEmail: string;
  socials: {
    platform: string;
    label: string;
    url: string;
  }[];
  statusText: string;
  addressPlaceholder: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "superadmin";
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    dataSource?: "mock" | "api";
  };
}
