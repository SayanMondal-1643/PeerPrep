import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { User } from "@/lib/user-types";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      apiFetch<{ status: string; results: number; data: User[] }>("/users"),
  });
}
export function useUser(userId: string | undefined) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      const res = await apiFetch<{ status: string; data: User }>(
        `/users/${userId}`,
      );
      return res.data;
    },
    enabled: !!userId,
  });
}
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      updates,
    }: {
      userId: string;
      updates: Record<string, unknown>;
    }) =>
      apiFetch<{ status: string; data: User }>(`/users/${userId}`, {
        method: "PATCH",
        body: updates,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) =>
      apiFetch(`/users/${userId}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}
