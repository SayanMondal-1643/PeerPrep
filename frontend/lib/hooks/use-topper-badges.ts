import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { ApiTopperBadgesResponse, TopperBadge } from "@/lib/topper-badge-types";

export function useAllTopperBadges() {
  return useQuery({
    queryKey: ["topperBadges"],
    queryFn: () => apiFetch<ApiTopperBadgesResponse>("/topperBadgeApplications"),
  });
}

export function useUserTopperBadges(userId: string | undefined) {
  return useQuery({
    queryKey: ["topperBadges", "user", userId],
    queryFn: () => apiFetch<ApiTopperBadgesResponse>(`/users/${userId}/topperBadgeApplications`),
    enabled: !!userId,
  });
}

export function useCreateTopperBadgeApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      ...body
    }: {
      userId: string;
      exam: string;
      branch: string;
      subject: string;
      year: number;
      cgpa: number;
      markSheetUrl: string;
    }) =>
      apiFetch<{ status: string; message: string; data: TopperBadge }>(
        `/users/${userId}/topperBadgeApplications`,
        { method: "POST", body },
      ),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: ["topperBadges", "user", variables.userId] }),
  });
}

export function useUpdateTopperBadgeApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ applicationId, status }: { applicationId: string; status: string }) =>
      apiFetch<{ status: string; data: TopperBadge }>(`/topperBadgeApplications/${applicationId}`, {
        method: "PATCH",
        body: { status },
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["topperBadges"] }),
  });
}
