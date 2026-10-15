import { siteConfig } from "@/config/site";
import { Inquiry, InquiryInput, ApiResponse } from "@/types";
import { apiClient } from "./client";

export async function submitInquiry(data: InquiryInput): Promise<{
  success: boolean;
  message: string;
  isMock: boolean;
  inquiryId?: string;
}> {
  // Check honeypot spam protection
  if (data.honeypot && data.honeypot.trim() !== "") {
    return {
      success: false,
      message: "Automated submission rejected.",
      isMock: false,
    };
  }

  if (siteConfig.dataSource === "api") {
    try {
      const res = await apiClient<ApiResponse<Inquiry>>("/inquiries", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res.success && res.data) {
        return {
          success: true,
          message: res.message || "Thank you. Your project inquiry has been received by our engineering team.",
          isMock: false,
          inquiryId: res.data.id,
        };
      }
      throw new Error(res.error || "Submission could not be completed.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to connect to the backend API.";
      throw new Error(msg);
    }
  }

  // Explicitly labeled Mock / Demo Mode
  await new Promise((resolve) => setTimeout(resolve, 800)); // natural network simulation
  return {
    success: true,
    message: "DEMO MODE: Inquiry validated locally. Because the website is running in mock mode (NEXT_PUBLIC_DATA_SOURCE=mock), this was not sent to the backend database.",
    isMock: true,
    inquiryId: `demo-${Date.now()}`,
  };
}

export async function getAdminInquiries(): Promise<Inquiry[]> {
  const res = await apiClient<ApiResponse<Inquiry[]>>("/admin/inquiries");
  return res.data || [];
}

export async function updateInquiryStatus(id: string, status: Inquiry["status"]): Promise<Inquiry> {
  const res = await apiClient<ApiResponse<Inquiry>>(`/admin/inquiries/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  if (!res.data) throw new Error(res.error || "Failed to update inquiry status");
  return res.data;
}
