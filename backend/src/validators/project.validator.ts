import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2).optional(),
  description: z.string().min(5, "Description is required"),
  overview: z.string().min(10, "Overview is required"),
  problemStatement: z.string().min(10, "Problem statement is required"),
  solution: z.string().min(10, "Solution is required"),
  category: z.string().min(2, "Category is required"),
  technologies: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  image: z.string().optional(),
  demoUrl: z.string().url("Must be valid URL").optional().or(z.literal("")),
  repositoryUrl: z.string().url("Must be valid URL").optional().or(z.literal("")),
  status: z.enum(["draft", "published"]).default("published"),
  featured: z.boolean().default(false),
});

export const updateProjectSchema = createProjectSchema.partial();
