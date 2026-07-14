import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { ApiCommentResponse, ApiCommentsResponse } from "@/lib/comment-types";

export function useComments(materialId: string | undefined) {
  return useQuery({
    queryKey: ["comments", materialId],
    queryFn: () => apiFetch<ApiCommentsResponse>(`/materials/${materialId}/comments`),
    enabled: !!materialId,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ materialId, comment }: { materialId: string; comment: string }) =>
      apiFetch<ApiCommentResponse>(`/materials/${materialId}/comments`, {
        method: "POST",
        body: { comment },
      }),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: ["comments", variables.materialId] }),
  });
}

export function useUpdateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, comment }: { commentId: string; comment: string; materialId: string }) =>
      apiFetch<ApiCommentResponse>(`/comments/${commentId}`, {
        method: "PATCH",
        body: { comment },
      }),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: ["comments", variables.materialId] }),
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId }: { commentId: string; materialId: string }) =>
      apiFetch(`/comments/${commentId}`, { method: "DELETE" }),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: ["comments", variables.materialId] }),
  });
}
