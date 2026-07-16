import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { ApiReportResponse, ApiReportsResponse } from "@/lib/report-types";

export function useReports() {
  return useQuery({
    queryKey: ["reports"],
    queryFn: () => apiFetch<ApiReportsResponse>("/reports"),
  });
}

export function useReportMaterial() {
  return useMutation({
    mutationFn: ({
      materialId,
      reportReason,
      comment,
    }: {
      materialId: string;
      reportReason: string;
      comment?: string;
    }) =>
      apiFetch<ApiReportResponse>(`/materials/${materialId}/reports`, {
        method: "POST",
        body: { reportReason, comment },
      }),
  });
}

export function useUpdateReportStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reportId, status }: { reportId: string; status: string }) =>
      apiFetch<ApiReportResponse>(`/reports/${reportId}`, {
        method: "PATCH",
        body: { status },
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reports"] }),
  });
}
