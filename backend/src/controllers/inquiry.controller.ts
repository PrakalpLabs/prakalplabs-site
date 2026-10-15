import { Request, Response, NextFunction } from "express";
import { Inquiry } from "../models/Inquiry";
import { createInquirySchema, updateInquiryStatusSchema } from "../validators/inquiry.validator";

export async function createInquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = createInquirySchema.parse(req.body);

    // Spam protection: honeypot check
    if (validated.honeypot && validated.honeypot.trim() !== "") {
      res.status(400).json({
        success: false,
        error: "Submission rejected: Automated bot detected.",
      });
      return;
    }

    // Duplicate check: check if same email submitted identical description in last 10 minutes
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const duplicate = await Inquiry.findOne({
      email: validated.email.toLowerCase(),
      projectDescription: validated.projectDescription,
      createdAt: { $gte: tenMinutesAgo },
    });

    if (duplicate) {
      res.status(200).json({
        success: true,
        message: "Your inquiry has already been received and queued for review.",
        data: duplicate,
      });
      return;
    }

    const inquiry = await Inquiry.create({
      fullName: validated.fullName,
      email: validated.email.toLowerCase(),
      companyName: validated.companyName,
      projectType: validated.projectType,
      estimatedBudget: validated.estimatedBudget,
      projectDescription: validated.projectDescription,
      preferredContactMethod: validated.preferredContactMethod,
      status: "New",
      ipHash: req.ip,
    });

    res.status(201).json({
      success: true,
      message: "Thank you. Your project inquiry has been received by our engineering team.",
      data: inquiry,
    });
  } catch (err) {
    next(err);
  }
}

export async function getInquiries(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status } = req.query;
    const filter: any = {};
    if (status && typeof status === "string") {
      filter.status = status;
    }

    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      meta: { total: inquiries.length },
      data: inquiries,
    });
  } catch (err) {
    next(err);
  }
}

export async function getInquiryById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      res.status(404).json({
        success: false,
        error: "Inquiry record not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateInquiryStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { status, notes } = updateInquiryStatusSchema.parse(req.body);

    const updateData: any = { status };
    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const inquiry = await Inquiry.findByIdAndUpdate(id, { $set: updateData }, { new: true });

    if (!inquiry) {
      res.status(404).json({
        success: false,
        error: "Inquiry record not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Inquiry status updated successfully.",
      data: inquiry,
    });
  } catch (err) {
    next(err);
  }
}
