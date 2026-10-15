import { z } from "zod";

export const createInquirySchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be under 100 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Please provide a valid email address"),
  companyName: z.string().max(100).optional(),
  projectType: z.string().min(2, "Please select a project type"),
  estimatedBudget: z.string().optional(),
  projectDescription: z
    .string({ required_error: "Project description is required" })
    .min(15, "Please describe your project in at least 15 characters")
    .max(5000, "Description must be under 5000 characters"),
  preferredContactMethod: z.enum(["email", "phone", "video_call"]).optional().default("email"),
  honeypot: z.string().optional(),
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(["New", "Contacted", "In Discussion", "Converted", "Closed"], {
    required_error: "Status is required",
  }),
  notes: z.string().optional(),
});
