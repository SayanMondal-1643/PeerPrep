export interface ReportReporterInfo {
  _id: string;
  name: string;
  role: "student" | "teacher" | "admin";
  verificationStatus?: "pending" | "verified" | "rejected";
}

export interface Report {
  _id: string;
  materialId: string;
  materialTitle: string;
  reporterId: ReportReporterInfo;
  reportReason: string;
  comment?: string;
  reportDate: string;
  status: "pending" | "resolved" | "rejected";
}

export interface ApiReportsResponse {
  status: string;
  results: number;
  data: Report[];
}

export interface ApiReportResponse {
  status: string;
  message?: string;
  data: Report;
}
