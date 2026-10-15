import { z } from "zod";

export const createServiceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2).optional(),
  shortDescription: z.string().min(5, "Short description is required"),
  description: z.string().min(10, "Description is required"),
  icon: z.string().default("Cpu"),
  capabilities: z.array(z.string()).default([]),
  businessProblems: z.array(z.string()).default([]),
  deliverables: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  process: z
    .array(
      z.object({
        step: z.number(),
        title: z.string(),
        description: z.string(),
      })
    )
    .default([]),
  order: z.number().default(0),
  featured: z.boolean().default(false),
});

export const updateServiceSchema = createServiceSchema.partial();
