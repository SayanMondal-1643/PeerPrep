export type UserRole = "student" | "teacher" | "admin";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  accountStatus?: "active" | "suspended";
  verificationStatus?: "pending" | "verified" | "rejected";
  idProofUrl?: string;
}

export interface ApiAuthResponse {
  status: string;
  user: User;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  institutionName?: string;
  idProofUrl?: string;
}

export interface MeResponse {
  status: string;
  data: User;
}
