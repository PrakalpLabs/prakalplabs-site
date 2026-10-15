import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
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
  order: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "Cpu" },
    capabilities: [{ type: String }],
    businessProblems: [{ type: String }],
    deliverables: [{ type: String }],
    technologies: [{ type: String }],
    process: [
      {
        step: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    order: { type: Number, default: 0, index: true },
    featured: { type: Boolean, default: false },
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

export const Service = mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
