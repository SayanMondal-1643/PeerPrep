export interface CommentUser {
  _id: string;
  name: string;
  role: "student" | "teacher" | "admin";
  verificationStatus?: "pending" | "verified" | "rejected";
}

export interface Comment {
  _id: string;
  comment: string;
  userId: CommentUser;
  createdAt: string;
}

export interface ApiCommentsResponse {
  status: string;
  results: number;
  data: Comment[];
}

export interface ApiCommentResponse {
  status: string;
  data: Comment;
}
