import { AdminUser, ApiResponse } from "@/types";
import { apiClient } from "./client";

export async function loginAdmin(email: string, password: string): Promise<AdminUser> {
  const res = await apiClient<ApiResponse<AdminUser>>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (!res.success || !res.data) {
    throw new Error(res.error || "Authentication failed");
  }
  return res.data;
}

export async function logoutAdmin(): Promise<void> {
  await apiClient<ApiResponse>("/auth/logout", {
    method: "POST",
  });
}

export async function getAdminProfile(): Promise<AdminUser | null> {
  try {
    const res = await apiClient<ApiResponse<AdminUser>>("/auth/me");
    if (res.success && res.data) {
      return res.data;
    }
    return null;
  } catch {
    return null;
  }
}
