import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createExam, deleteExam, fetchExams, updateExam } from "@/lib/hierarchy-api";

export function useExams() {
  return useQuery({ queryKey: ["exams"], queryFn: fetchExams });
}

export function useCreateExam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => createExam(name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["exams"] }),
  });
}

export function useUpdateExam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ examId, name }: { examId: string; name: string }) => updateExam(examId, name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["exams"] }),
  });
}

export function useDeleteExam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (examId: string) => deleteExam(examId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["exams"] }),
  });
}
