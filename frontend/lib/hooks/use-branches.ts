import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBranch,
  deleteBranch,
  fetchBranchesResponse,
  updateBranch,
} from "@/lib/hierarchy-api";

export function useBranches(examId: string | undefined) {
  return useQuery({
    queryKey: ["branches", examId],
    queryFn: () => fetchBranchesResponse(examId as string),
    enabled: !!examId,
  });
}

export function useCreateBranch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ examId, name }: { examId: string; name: string }) => createBranch(examId, name),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: ["branches", variables.examId] }),
  });
}

export function useUpdateBranch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ branchId, name }: { branchId: string; name: string; examId: string }) =>
      updateBranch(branchId, name),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: ["branches", variables.examId] }),
  });
}

export function useDeleteBranch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ branchId }: { branchId: string; examId: string }) => deleteBranch(branchId),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: ["branches", variables.examId] }),
  });
}
