import { apiFetch } from "@/lib/api-client";
import { HierarchyOption, HierarchyResponse } from "@/lib/hierarchy-types";

export async function fetchExamsResponse(): Promise<HierarchyResponse> {
  return apiFetch<HierarchyResponse>("/exams");
}

export async function fetchExams(): Promise<HierarchyOption[]> {
  const json = await fetchExamsResponse();
  return json.data;
}

export async function fetchBranchesResponse(examId: string): Promise<HierarchyResponse> {
  return apiFetch<HierarchyResponse>(`/exams/${examId}/branches`);
}

export async function fetchBranches(examId: string): Promise<HierarchyOption[]> {
  const json = await fetchBranchesResponse(examId);
  return json.data;
}

export async function fetchSubjectsResponse(branchId: string): Promise<HierarchyResponse> {
  return apiFetch<HierarchyResponse>(`/branches/${branchId}/subjects`);
}

export async function fetchSubjects(branchId: string): Promise<HierarchyOption[]> {
  const json = await fetchSubjectsResponse(branchId);
  return json.data;
}

export async function fetchTopicsResponse(subjectId: string): Promise<HierarchyResponse> {
  return apiFetch<HierarchyResponse>(`/subjects/${subjectId}/topics`);
}

export async function fetchTopics(subjectId: string): Promise<HierarchyOption[]> {
  const json = await fetchTopicsResponse(subjectId);
  return json.data;
}

export async function createExam(name: string): Promise<HierarchyOption> {
  const json = await apiFetch<{ status: string; data: HierarchyOption }>("/exams", {
    method: "POST",
    body: { name },
  });
  return json.data;
}

export async function updateExam(examId: string, name: string): Promise<HierarchyOption> {
  const json = await apiFetch<{ status: string; data: HierarchyOption }>(`/exams/${examId}`, {
    method: "PATCH",
    body: { name },
  });
  return json.data;
}

export async function deleteExam(examId: string): Promise<void> {
  await apiFetch(`/exams/${examId}`, { method: "DELETE" });
}

export async function createBranch(examId: string, name: string): Promise<HierarchyOption> {
  const json = await apiFetch<{ status: string; data: HierarchyOption }>(
    `/exams/${examId}/branches`,
    { method: "POST", body: { name } },
  );
  return json.data;
}

export async function updateBranch(branchId: string, name: string): Promise<HierarchyOption> {
  const json = await apiFetch<{ status: string; data: HierarchyOption }>(`/branches/${branchId}`, {
    method: "PATCH",
    body: { name },
  });
  return json.data;
}

export async function deleteBranch(branchId: string): Promise<void> {
  await apiFetch(`/branches/${branchId}`, { method: "DELETE" });
}

export async function createSubject(branchId: string, name: string): Promise<HierarchyOption> {
  const json = await apiFetch<{ status: string; data: HierarchyOption }>(
    `/branches/${branchId}/subjects`,
    { method: "POST", body: { name } },
  );
  return json.data;
}

export async function updateSubject(subjectId: string, name: string): Promise<HierarchyOption> {
  const json = await apiFetch<{ status: string; data: HierarchyOption }>(`/subjects/${subjectId}`, {
    method: "PATCH",
    body: { name },
  });
  return json.data;
}

export async function deleteSubject(subjectId: string): Promise<void> {
  await apiFetch(`/subjects/${subjectId}`, { method: "DELETE" });
}

export async function createTopic(subjectId: string, name: string): Promise<HierarchyOption> {
  const json = await apiFetch<{ status: string; data: HierarchyOption }>(
    `/subjects/${subjectId}/topics`,
    { method: "POST", body: { name } },
  );
  return json.data;
}

export async function updateTopic(topicId: string, name: string): Promise<HierarchyOption> {
  const json = await apiFetch<{ status: string; data: HierarchyOption }>(`/topics/${topicId}`, {
    method: "PATCH",
    body: { name },
  });
  return json.data;
}

export async function deleteTopic(topicId: string): Promise<void> {
  await apiFetch(`/topics/${topicId}`, { method: "DELETE" });
}
