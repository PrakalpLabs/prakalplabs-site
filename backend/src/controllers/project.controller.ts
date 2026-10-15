import { Request, Response, NextFunction } from "express";
import { Project } from "../models/Project";
import { createProjectSchema, updateProjectSchema } from "../validators/project.validator";

export async function getProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, search, featured } = req.query;

    const filter: any = { status: "published" };

    if (category && category !== "All") {
      filter.category = new RegExp(`^${category}$`, "i");
    }

    if (featured !== undefined) {
      filter.featured = featured === "true";
    }

    if (search && typeof search === "string") {
      const q = search.trim();
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { technologies: { $regex: q, $options: "i" } },
      ];
    }

    const projects = await Project.find(filter).sort({ publishedAt: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      meta: { total: projects.length },
      data: projects,
    });
  } catch (err) {
    next(err);
  }
}

export async function getProjectBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const slug = String(req.params.slug || "").toLowerCase();
    const project = await Project.findOne({ slug });

    if (!project) {
      res.status(404).json({
        success: false,
        error: `Project with slug "${slug}" not found.`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (err) {
    next(err);
  }
}

export async function createProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = createProjectSchema.parse(req.body);

    const slug =
      validated.slug ||
      validated.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const project = await Project.create({
      ...validated,
      slug,
    });

    res.status(201).json({
      success: true,
      message: "Project successfully created.",
      data: project,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const validated = updateProjectSchema.parse(req.body);

    const project = await Project.findByIdAndUpdate(id, { $set: validated }, { new: true });

    if (!project) {
      res.status(404).json({
        success: false,
        error: "Project not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Project successfully updated.",
      data: project,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      res.status(404).json({
        success: false,
        error: "Project not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
}
