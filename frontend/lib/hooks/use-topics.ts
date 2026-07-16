import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTopic,
  deleteTopic,
  fetchTopicsResponse,
  updateTopic,
} from "@/lib/hierarchy-api";

export function useTopics(subjectId: string | undefined) {
  return useQuery({
    queryKey: ["topics", subjectId],
    queryFn: () => fetchTopicsResponse(subjectId as string),
    enabled: !!subjectId,
  });
}

export function useCreateTopic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ subjectId, name }: { subjectId: string; name: string }) =>
      createTopic(subjectId, name),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: ["topics", variables.subjectId] }),
  });
}

export function useUpdateTopic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ topicId, name }: { topicId: string; name: string; subjectId: string }) =>
      updateTopic(topicId, name),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: ["topics", variables.subjectId] }),
  });
}

export function useDeleteTopic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ topicId }: { topicId: string; subjectId: string }) => deleteTopic(topicId),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: ["topics", variables.subjectId] }),
  });
}
