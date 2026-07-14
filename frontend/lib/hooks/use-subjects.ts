import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSubject,
  deleteSubject,
  fetchSubjectsResponse,
  updateSubject,
} from "@/lib/hierarchy-api";

export function useSubjects(branchId: string | undefined) {
  return useQuery({
    queryKey: ["subjects", branchId],
    queryFn: () => fetchSubjectsResponse(branchId as string),
    enabled: !!branchId,
  });
}

export function useCreateSubject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ branchId, name }: { branchId: string; name: string }) =>
      createSubject(branchId, name),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: ["subjects", variables.branchId] }),
  });
}

export function useUpdateSubject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ subjectId, name }: { subjectId: string; name: string; branchId: string }) =>
      updateSubject(subjectId, name),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: ["subjects", variables.branchId] }),
  });
}

export function useDeleteSubject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ subjectId }: { subjectId: string; branchId: string }) => deleteSubject(subjectId),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: ["subjects", variables.branchId] }),
  });
}
