interface UploaderInfo {
  _id: string;
  name: string;
  role: "student" | "teacher" | "admin";
  verificationStatus?: "pending" | "verified" | "rejected";
}

export interface Material {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  uploadDate: string;
  status: "pending" | "approved" | "rejected";
  userId: UploaderInfo;
  topicId: string;
  isBestMaterial: boolean;
  isTopperMaterial: boolean;
  isAIPicked: boolean;
  ratingsAverage: number;
  ratingsQuantity: number;
}

export interface MaterialWithBreadcrumb extends Material {
  exam: string;
  branch: string;
  subject: string;
  topic: string;
}

export interface ApiMaterialsResponse {
  status: string;
  exam: string;
  branch: string;
  subject: string;
  topic: string;
  results: number;
  data: Material[];
}

export interface ApiMaterialResponse {
  status: string;
  data: Material;
}

export interface ApiUserMaterialsResponse {
  status: string;
  results: number;
  data: MaterialWithBreadcrumb[];
}
