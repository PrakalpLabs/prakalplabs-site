import { siteConfig } from "@/config/site";
import { mockServices } from "@/data/mock/services";
import { Service, ApiResponse } from "@/types";
import { apiClient } from "./client";

export async function getServices(): Promise<Service[]> {
  if (siteConfig.dataSource === "api") {
    try {
      const res = await apiClient<ApiResponse<Service[]>>("/services");
      if (res.success && res.data) {
        return res.data;
      }
    } catch (error) {
      console.warn("API mode failed to fetch services, falling back to mock layer:", error);
    }
  }
  return mockServices;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (siteConfig.dataSource === "api") {
    try {
      const res = await apiClient<ApiResponse<Service>>(`/services/${slug}`);
      if (res.success && res.data) {
        return res.data;
      }
    } catch (error) {
      console.warn(`API mode failed to fetch service slug ${slug}, falling back:`, error);
    }
  }
  const found = mockServices.find((s) => s.slug === slug);
  return found || null;
}
