import {
  HierarchyOption,
  mockBranchesResponse,
  mockExamsResponse,
  mockSubjectsResponse,
  mockTopicsResponse,
} from "@/lib/mock-data";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function fetchExams(): Promise<HierarchyOption[]> {
  // UNCOMMENT TO FETCH FROM API
  // const response = await fetch(`${API_BASE_URL}/api/v1/exams`);
  // const json = await response.json();
  // if (!response.ok) throw new Error(json?.message || "Failed to load exams");

  // MOCK DATA - TO BE REMOVED
  const json = mockExamsResponse;
  return json.data;
}

export async function fetchBranches(
  examId: string,
): Promise<HierarchyOption[]> {
  // UNCOMMENT TO FETCH FROM API
  // const response = await fetch(
  //   `${API_BASE_URL}/api/v1/exams/${examId}/branches`,
  // );
  // const json = await response.json();
  // if (!response.ok) throw new Error(json?.message || "Failed to load branches");

  // MOCK DATA - TO BE REMOVED
  const json = mockBranchesResponse;
  return json.data;
}

export async function fetchSubjects(
  branchId: string,
): Promise<HierarchyOption[]> {
  // UNCOMMENT TO FETCH FROM API
  // const response = await fetch(
  //   `${API_BASE_URL}/api/v1/branches/${branchId}/subjects`,
  // );
  // const json = await response.json();
  // if (!response.ok) throw new Error(json?.message || "Failed to load subjects");

  // MOCK DATA - TO BE REMOVED
  const json = mockSubjectsResponse;
  return json.data;
}

export async function fetchTopics(
  subjectId: string,
): Promise<HierarchyOption[]> {
  // UNCOMMENT TO FETCH FROM API
  // const response = await fetch(
  //   `${API_BASE_URL}/api/v1/subjects/${subjectId}/topics`,
  // );
  // const json = await response.json();
  // if (!response.ok) throw new Error(json?.message || "Failed to load topics");

  // MOCK DATA - TO BE REMOVED
  const json = mockTopicsResponse;
  return json.data;
}
