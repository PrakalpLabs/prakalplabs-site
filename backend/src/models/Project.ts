import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  problemStatement: string;
  solution: string;
  category: string;
  technologies: string[];
  features: string[];
  image: string;
  demoUrl?: string;
  repositoryUrl?: string;
  status: "draft" | "published";
  featured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    description: { type: String, required: true },
    overview: { type: String, required: true },
    problemStatement: { type: String, required: true },
    solution: { type: String, required: true },
    category: { type: String, required: true, index: true },
    technologies: [{ type: String, trim: true }],
    features: [{ type: String, trim: true }],
    image: { type: String, default: "/projects/placeholder.svg" },
    demoUrl: { type: String, trim: true },
    repositoryUrl: { type: String, trim: true },
    status: { type: String, enum: ["draft", "published"], default: "published", index: true },
    featured: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date, default: Date.now },
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

export const Project = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
