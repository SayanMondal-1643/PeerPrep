export interface HierarchyOption {
  _id: string;
  name: string;
}

export interface HierarchyResponse {
  status: string;
  results: number;
  data: HierarchyOption[];
  exam?: string;
  branch?: string;
  subject?: string;
  topic?: string;
  message?: string;
}
