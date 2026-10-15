import mongoose, { Schema, Document } from "mongoose";

export interface IInquiry extends Document {
  fullName: string;
  email: string;
  companyName?: string;
  projectType: string;
  estimatedBudget?: string;
  projectDescription: string;
  preferredContactMethod?: "email" | "phone" | "video_call";
  status: "New" | "Contacted" | "In Discussion" | "Converted" | "Closed";
  notes?: string;
  ipHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    companyName: { type: String, trim: true },
    projectType: { type: String, required: true, default: "Custom Software Development" },
    estimatedBudget: { type: String, default: "Undetermined" },
    projectDescription: { type: String, required: true },
    preferredContactMethod: {
      type: String,
      enum: ["email", "phone", "video_call"],
      default: "email",
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Discussion", "Converted", "Closed"],
      default: "New",
      index: true,
    },
    notes: { type: String },
    ipHash: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Inquiry = mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
