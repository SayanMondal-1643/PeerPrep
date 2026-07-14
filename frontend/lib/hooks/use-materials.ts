import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { ApiMaterialResponse, ApiMaterialsResponse, Material } from "@/lib/material-types";

export function useMaterialsByTopic(topicId: string | undefined) {
  return useQuery({
    queryKey: ["materials", "topic", topicId],
    queryFn: () => apiFetch<ApiMaterialsResponse>(`/topics/${topicId}/materials`),
    enabled: !!topicId,
  });
}

export function useAllMaterials(params?: { page?: number; limit?: number }) {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  const qs = query.toString();

  return useQuery({
    queryKey: ["materials", "all", params?.page, params?.limit],
    queryFn: () => apiFetch<{ status: string; results: number; data: Material[] }>(`/materials${qs ? `?${qs}` : ""}`),
  });
}

export function useMaterial(materialId: string | undefined) {
  return useQuery({
    queryKey: ["material", materialId],
    queryFn: () => apiFetch<ApiMaterialResponse>(`/materials/${materialId}`),
    enabled: !!materialId,
  });
}

export function useUserMaterials(userId: string | undefined) {
  return useQuery({
    queryKey: ["materials", "user", userId],
    queryFn: () => apiFetch<{ status: string; results: number; data: Material[] }>(`/users/${userId}/materials`),
    enabled: !!userId,
  });
}

export function useCreateMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      topicId,
      title,
      description,
      fileUrl,
    }: {
      topicId: string;
      title: string;
      description: string;
      fileUrl: string;
    }) =>
      apiFetch<ApiMaterialResponse>(`/topics/${topicId}/materials`, {
        method: "POST",
        body: { title, description, fileUrl },
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["materials", "topic", variables.topicId] });
      queryClient.invalidateQueries({ queryKey: ["materials", "all"] });
    },
  });
}

export function useUpdateMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ materialId, updates }: { materialId: string; updates: Record<string, unknown> }) =>
      apiFetch<ApiMaterialResponse>(`/materials/${materialId}`, {
        method: "PATCH",
        body: updates,
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["material", variables.materialId] });
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });
}

export function useDeleteMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (materialId: string) => apiFetch(`/materials/${materialId}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["materials"] }),
  });
}
