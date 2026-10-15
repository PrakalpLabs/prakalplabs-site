import { siteConfig } from "@/config/site";
import { mockProjects } from "@/data/mock/projects";
import { Project, ApiResponse } from "@/types";
import { apiClient } from "./client";

export interface ProjectFilterParams {
  category?: string;
  search?: string;
  featured?: boolean;
}

export async function getProjects(params?: ProjectFilterParams): Promise<Project[]> {
  if (siteConfig.dataSource === "api") {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category && params.category !== "All") {
        queryParams.append("category", params.category);
      }
      if (params?.search) {
        queryParams.append("search", params.search);
      }
      if (params?.featured !== undefined) {
        queryParams.append("featured", String(params.featured));
      }

      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
      const res = await apiClient<ApiResponse<Project[]>>(`/projects${queryString}`);
      if (res.success && res.data) {
        return res.data;
      }
    } catch (error) {
      console.warn("API mode failed to fetch projects, falling back to mock layer:", error);
    }
  }

  // Filter mock projects
  let results = [...mockProjects].filter((p) => p.status === "published");

  if (params?.category && params.category !== "All") {
    results = results.filter((p) => p.category.toLowerCase() === params.category?.toLowerCase());
  }

  if (params?.search) {
    const q = params.search.toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (params?.featured) {
    results = results.filter((p) => p.featured === true);
  }

  return results;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (siteConfig.dataSource === "api") {
    try {
      const res = await apiClient<ApiResponse<Project>>(`/projects/${slug}`);
      if (res.success && res.data) {
        return res.data;
      }
    } catch (error) {
      console.warn(`API mode failed to fetch project slug ${slug}, falling back:`, error);
    }
  }

  const found = mockProjects.find((p) => p.slug === slug);
  return found || null;
}
