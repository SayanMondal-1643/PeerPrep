export interface TopperBadge {
  _id: string;
  userId: string;
  userName: string;
  subject: string;
  exam: string;
  branch: string;
  year: number;
  cgpa: number;
  markSheetUrl: string;
  status: "pending" | "approved" | "rejected";
}

export interface ApiTopperBadgesResponse {
  status: string;
  results: number;
  data: TopperBadge[];
}
