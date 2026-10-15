import { Request, Response, NextFunction } from "express";
import { Service } from "../models/Service";
import { createServiceSchema, updateServiceSchema } from "../validators/service.validator";

export async function getServices(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      meta: { total: services.length },
      data: services,
    });
  } catch (err) {
    next(err);
  }
}

export async function getServiceBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const slug = String(req.params.slug || "").toLowerCase();
    const service = await Service.findOne({ slug });

    if (!service) {
      res.status(404).json({
        success: false,
        error: `Service with slug "${slug}" not found.`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (err) {
    next(err);
  }
}

export async function createService(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = createServiceSchema.parse(req.body);

    const slug =
      validated.slug ||
      validated.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const service = await Service.create({
      ...validated,
      slug,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully.",
      data: service,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateService(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const validated = updateServiceSchema.parse(req.body);

    const service = await Service.findByIdAndUpdate(id, { $set: validated }, { new: true });

    if (!service) {
      res.status(404).json({
        success: false,
        error: "Service not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully.",
      data: service,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteService(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      res.status(404).json({
        success: false,
        error: "Service not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
}
