import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";

interface RatingResponse {
  status: string;
  data: {
    _id: string;
    ratingValue: number;
    ratingsAverage: number;
    ratingsQuantity: number;
  };
}

export function useRateMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ materialId, ratingValue }: { materialId: string; ratingValue: number }) =>
      apiFetch<RatingResponse>(`/materials/${materialId}/ratings`, {
        method: "POST",
        body: { ratingValue },
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["material", variables.materialId] });
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });
}
