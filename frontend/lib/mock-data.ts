import { HierarchyOption, HierarchyResponse } from "./hierarchy-types";
import { User, ApiAuthResponse, SignupData } from "./user-types";
import {
  ApiMaterialResponse,
  ApiMaterialsResponse,
  ApiUserMaterialsResponse,
} from "./material-types";

import { ApiTopperBadgesResponse } from "./topper-badge-types";
import { join } from "path";

const mockLoginUsersByEmail: Record<string, User> = {
  "admin@example.com": {
    _id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  "runa@example.com": {
    _id: "2",
    name: "Runa Mukherjee",
    email: "runa@example.com",
    role: "teacher",
    verificationStatus: "verified",
  },
  "subhajit@example.com": {
    _id: "3",
    name: "Subhajit Kundu",
    email: "subhajit@example.com",
    role: "student",
  },
  "sayan@example.com": {
    _id: "4",
    name: "Sayan Mondal",
    email: "sayan@example.com",
    role: "student",
  },
};

export async function mockLoginResponse(
  email: string,
  password: string,
): Promise<ApiAuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const user = mockLoginUsersByEmail[email];
  if (!user || password !== "password123") {
    throw new Error("Invalid email or password");
  }
  return { status: "success", user };
}

export async function mockLogoutResponse(): Promise<{ status: string }> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { status: "success" };
}

export async function mockSignupResponse(
  data: SignupData,
): Promise<ApiAuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const user: User = {
    _id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
    role: data.role,
    ...(data.role === "teacher" && {
      verificationStatus: "pending",
    }),
  };

  return { status: "success", user };
}

export const exams: HierarchyOption[] = [
  { _id: "0", name: "Maulana Abul Kalam Azad University of Technology" },
  { _id: "1", name: "Graduate Aptitude Test in Engineering" },
  { _id: "2", name: "Calcutta University" },
  { _id: "3", name: "Jadavpur University" },
];

export const branches: HierarchyOption[] = [
  { _id: "0", name: "Computer Science & Engineering" },
  { _id: "1", name: "Information Technology" },
  { _id: "2", name: "Electronics and Communication Engineering" },
  { _id: "3", name: "Electrical Engineering" },
  { _id: "4", name: "Mechanical Engineering" },
  { _id: "5", name: "Civil Engineering" },
  { _id: "6", name: "Chemical Engineering" },
  { _id: "7", name: "Biomedical Engineering" },
  { _id: "8", name: "Computer Science & Business Systems" },
  { _id: "9", name: "Applied Electronics and Instrumentation Engineering" },
];

const subjects: HierarchyOption[] = [
  { _id: "0", name: "Data Structures & Algorithms" },
  { _id: "1", name: "Computer Organization" },
  { _id: "2", name: "Computer Architecture" },
  { _id: "3", name: "Design and Analysis of Algorithms" },
  { _id: "4", name: "Formal Languages and Automata Theory" },
  { _id: "5", name: "Operating Systems" },
  { _id: "6", name: "Object Oriented Programming" },
  { _id: "7", name: "Software Engineering" },
  { _id: "8", name: "Database Management Systems" },
  { _id: "9", name: "Computer Networks" },
];

const topics: HierarchyOption[] = [
  { _id: "1", name: "Basic Terminologies & Algorithm Analysis" },
  { _id: "2", name: "Searching Techniques" },
  { _id: "3", name: "Stacks" },
  { _id: "4", name: "Queues" },
  { _id: "5", name: "Linked Lists" },
  { _id: "6", name: "Trees" },
  { _id: "7", name: "B Trees & B+ Trees" },
  { _id: "8", name: "Sorting Algorithms" },
  { _id: "9", name: "Hashing" },
  { _id: "10", name: "Graphs" },
];

export const mockExamsResponse: HierarchyResponse = {
  status: "success",
  results: exams.length,
  data: exams,
};

export const mockBranchesResponse: HierarchyResponse = {
  status: "success",
  exam: "Maulana Abul Kalam Azad University of Technology",
  results: branches.length,
  data: branches,
};

export const mockSubjectsResponse: HierarchyResponse = {
  status: "success",
  exam: "Maulana Abul Kalam Azad University of Technology",
  branch: "Computer Science & Engineering",
  results: subjects.length,
  data: subjects,
};

export const mockTopicsResponse: HierarchyResponse = {
  status: "success",
  exam: "Maulana Abul Kalam Azad University of Technology",
  branch: "Computer Science & Engineering",
  subject: "Data Structures & Algorithms",
  results: topics.length,
  data: topics,
};

export const mockMaterialsResponse1: ApiMaterialsResponse = {
  status: "success",
  exam: "Maulana Abul Kalam Azad University of Technology",
  branch: "Computer Science & Engineering",
  subject: "Data Structures & Algorithms",
  topic: "Searching Techniques",
  results: 3,
  data: [
    {
      _id: "1",
      title: "Searching Techniques Guide: Linear & Binary Search",
      description:
        "A thorough walkthrough of linear and binary search, covering both iterative and recursive approach of binary search along with their time complexity analysis.",
      fileUrl: "/materials/searching_techniques.pdf",
      uploadDate: "2026-06-05",
      status: "approved",
      userId: {
        _id: "1",
        name: "Sayan Mondal",
        role: "student",
      },
      topicId: "2",
      isBestMaterial: true,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 4.8,
      ratingsQuantity: 77,
    },
    {
      _id: "2",
      title: "MAKAUT Previous Year Questions On Searching Techniques",
      description:
        "A curated set of previous year MAKAUT exam questions on linear, binary, and interpolation search, with detailed step-by-step solutions.",
      fileUrl: "https://example.com/file2.pdf",
      uploadDate: "2026-06-10",
      status: "approved",
      userId: { _id: "2", name: "Subhajit Kundu", role: "student" },
      topicId: "2",
      isBestMaterial: false,
      isTopperMaterial: true,
      isAIPicked: false,
      ratingsAverage: 4.5,
      ratingsQuantity: 32,
    },
    {
      _id: "3",
      title: "Interpolation Search",
      description:
        "Explains the interpolation search technique as an improvement over binary search for uniformly distributed data, with algorithm, complexity analysis, and comparison against binary search.",
      fileUrl: "https://example.com/file3.pdf",
      uploadDate: "2026-05-25",
      status: "approved",
      userId: { _id: "3", name: "Akash Samanta", role: "student" },
      topicId: "2",
      isBestMaterial: false,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 3.7,
      ratingsQuantity: 12,
    },
  ],
};

export const mockMaterialsResponse2: ApiMaterialsResponse = {
  status: "success",
  exam: "Maulana Abul Kalam Azad University of Technology",
  branch: "Computer Science & Engineering",
  subject: "Data Structures & Algorithms",
  topic: "Stacks",
  results: 2,
  data: [
    {
      _id: "4",
      title: "Complete Guide to Stacks: ADT and Applications",
      description:
        "Covers the Stack ADT and its core operations, along with expression conversion (infix to postfix/prefix) and expression evaluation with algorithms and complexity analysis.",
      fileUrl: "/materials/stacks_guide.pdf",
      uploadDate: "2026-06-08",
      status: "approved",
      userId: {
        _id: "1",
        name: "Runa Mukherjee",
        role: "teacher",
        verificationStatus: "verified",
      },
      topicId: "3",
      isBestMaterial: true,
      isTopperMaterial: false,
      isAIPicked: true,
      ratingsAverage: 4,
      ratingsQuantity: 2,
    },
    {
      _id: "5",
      title: "Stack Applications",
      description:
        "Discusses classic stack-based problems including balanced parentheses checking and postfix expression evaluation, with dry runs and code-level implementation notes.",
      fileUrl: "https://example.com/file5.pdf",
      uploadDate: "2026-06-15",
      status: "approved",
      userId: { _id: "3", name: "Akash Samanta", role: "student" },
      topicId: "3",
      isBestMaterial: false,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 4.1,
      ratingsQuantity: 3,
    },
  ],
};

export const mockMaterialsResponse3: ApiMaterialsResponse = {
  status: "success",
  exam: "Maulana Abul Kalam Azad University of Technology",
  branch: "Computer Science & Engineering",
  subject: "Data Structures & Algorithms",
  topic: "Mixed topics",
  results: 2,
  data: [
    {
      _id: "6",
      title: "Stack Implementation Using Arrays and Linked Lists",
      description:
        "Compares array-based and linked list-based stack implementations in C, with push/pop operations, overflow/underflow handling, and time complexity trade-offs between the two approaches.",
      fileUrl: "/materials/stack_implementation_comparison.pdf",
      uploadDate: "2026-07-02",
      status: "pending",
      userId: {
        _id: "5",
        name: "Tapabrata Maity",
        role: "student",
      },
      topicId: "3",
      isBestMaterial: false,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 0,
      ratingsQuantity: 0,
    },
    {
      _id: "7",
      title: "How to do linear search in O(log n)",
      description:
        "Claims linear search can be optimized to O(log n) time complexity by 'skipping every alternate element' during traversal, without any sorted-order requirement or actual algorithmic basis for the claim.",
      fileUrl: "/materials/linear_search_logn_claim.pdf",
      uploadDate: "2026-06-13",
      status: "rejected",
      userId: {
        _id: "1",
        name: "Sayan Mondal",
        role: "student",
      },
      topicId: "2",
      isBestMaterial: false,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 0,
      ratingsQuantity: 0,
    },
  ],
};

export const mockUsersResponse = {
  status: "success",
  results: 6,
  data: [
    {
      _id: "1",
      name: "Sayan Mondal",
      email: "sayan@example.com",
      role: "student",
      accountStatus: "active",
      joinDate: "2026-01-15",
    },
    {
      _id: "2",
      name: "Subhajit Kundu",
      email: "subhajit@example.com",
      role: "student",
      accountStatus: "active",
      joinDate: "2026-02-13",
    },
    {
      _id: "3",
      name: "Akash Samanta",
      email: "akash@example.com",
      role: "student",
      accountStatus: "active",
      joinDate: "2026-03-20",
    },
    {
      _id: "4",
      name: "Ritam Ghosh",
      email: "ritam@example.com",
      role: "student",
      accountStatus: "active",
      joinDate: "2026-04-05",
    },
    {
      _id: "5",
      name: "Tapabrata Maity",
      email: "tapabrata@example.com",
      role: "student",
      accountStatus: "active",
      joinDate: "2026-05-12",
    },
    {
      _id: "6",
      name: "Runa Mukherjee",
      email: "runa@example.com",
      role: "teacher",
      verificationStatus: "verified",
      institutionName: "Netaji Subhash Engineering College",
      idProofUrl: "https://example.com/idproof/3.pdf",
      accountStatus: "active",
      joinDate: "2026-06-08",
    },
  ],
};

export const mockTopperBadgesResponse: ApiTopperBadgesResponse = {
  status: "success",
  results: 3,
  data: [
    {
      _id: "1",
      userId: "1",
      userName: "Sayan Mondal",
      subject: "Computer Networks",
      exam: "Maulana Abul Kalam Azad University of Technology",
      branch: "Computer Science & Engineering",
      year: 2025,
      cgpa: 9,
      markSheetUrl: "https://res.cloudinary.com/peerprep/marksheet/1/2.pdf",
      status: "pending",
    },
    {
      _id: "2",
      userId: "3",
      userName: "Akash Samanta",
      subject: "Object-Oriented Programming",
      exam: "Maulana Abul Kalam Azad University of Technology",
      branch: "Computer Science & Engineering",
      year: 2025,
      cgpa: 7,
      markSheetUrl: "https://res.cloudinary.com/peerprep/marksheet/1/3.pdf",
      status: "rejected",
    },
    {
      _id: "3",
      userId: "2",
      userName: "Subahajit Kundu",
      subject: "Data Structures & Algorithms",
      exam: "Maulana Abul Kalam Azad University of Technology",
      branch: "Computer Science & Engineering",
      year: 2024,
      cgpa: 9,
      markSheetUrl: "https://res.cloudinary.com/peerprep/marksheet/1/1.pdf",
      status: "approved",
    },
  ],
};

export const mockReportsResponse = {
  status: "success",
  results: 3,
  data: [
    {
      _id: "1",
      materialId: "5",
      materialTitle: "Stack Applications",
      reporterId: {
        _id: "7",
        name: "Ritam Ghosh",
        role: "student",
      },
      reportReason: "Plagiarism",
      comment:
        "The code and explanation are identical to an existing GFG article",
      reportDate: "2026-06-29",
      status: "resolved",
    },
    {
      _id: "2",
      materialId: "5",
      materialTitle: "Stack Applications",
      reporterId: {
        _id: "6",
        name: "Runa Mukherjee",
        role: "teacher",
        verificationStatus: "verified",
      },
      reportReason: "Plagiarism",
      comment: "This is copied almost word-for-word from GeeksforGeeks.",
      reportDate: "2026-06-28",
      status: "dismissed",
    },
    {
      _id: "3",
      materialId: "2",
      materialTitle: "MAKAUT Previous Year Questions On Searching Techniques",
      reporterId: {
        _id: "1",
        name: "Sayan Mondal",
        role: "student",
      },
      reportReason: "Incorrect content",
      comment: "Not all questions are actual MAKAUT PYQs",
      reportDate: "2026-06-13",
      status: "pending",
    },
  ],
};

export const mockUserMaterialsResponse: ApiUserMaterialsResponse = {
  status: "success",
  results: 3,
  data: [
    {
      _id: "1",
      title: "Searching Techniques Guide: Linear & Binary Search",
      description:
        "A thorough walkthrough of linear and binary search, covering both iterative and recursive approach of binary search along with their time complexity analysis.",
      fileUrl: "/materials/searching_techniques.pdf",
      uploadDate: "2026-06-05",
      status: "approved",
      userId: {
        _id: "1",
        name: "Sayan Mondal",
        role: "student",
      },
      topicId: "2",
      isBestMaterial: true,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 4.8,
      ratingsQuantity: 77,
      exam: "Maulana Abul Kalam Azad University of Technology",
      branch: "Computer Science & Engineering",
      subject: "Data Structures & Algorithms",
      topic: "Searching Techniques",
    },
  ],
};

export const mockUserTopperBadgesResponse: ApiTopperBadgesResponse = {
  status: "success",
  results: 1,
  data: [
    {
      _id: "1",
      userId: "1",
      userName: "Sayan Mondal",
      subject: "Computer Networks",
      exam: "Maulana Abul Kalam Azad University of Technology",
      branch: "Computer Science & Engineering",
      year: 2025,
      cgpa: 9,
      markSheetUrl: "https://res.cloudinary.com/peerprep/marksheet/1/2.pdf",
      status: "pending",
    },
  ],
};

export const mockMaterialResponse: ApiMaterialResponse = {
  status: "success",
  data: {
    _id: "1",
    title: "Searching Techniques Guide: Linear & Binary Search",
    description:
      "A thorough walkthrough of linear and binary search, covering both iterative and recursive approach of binary search along with their time complexity analysis.",
    fileUrl: "/materials/searching_techniques.pdf",
    uploadDate: "2026-06-05",
    status: "approved",
    userId: {
      _id: "1",
      name: "Sayan Mondal",
      role: "student",
    },
    topicId: "2",
    isBestMaterial: true,
    isTopperMaterial: false,
    isAIPicked: false,
    ratingsAverage: 4.8,
    ratingsQuantity: 77,
  },
};

export const mockCommentsResponse = {
  status: "success",
  results: 5,
  data: [
    {
      _id: "1",
      comment:
        "The recursive binary search explanation finally made the concept click for me. The dry run with the array indices was really helpful.",
      userId: {
        _id: "7",
        name: "Ritam Ghosh",
        role: "student",
      },
      createdAt: "2026-07-02",
    },
    {
      _id: "2",
      comment:
        "Good comparison between iterative and recursive approaches. Would've liked a bit more detail on the time and space complexity difference between the two though.",
      userId: {
        _id: "3",
        name: "Akash Samanta",
        role: "student",
      },
      createdAt: "2026-06-25",
    },
    {
      _id: "3",
      comment:
        "This covers exactly what was asked in our last internal exam. The time complexity derivation for binary search is explained really clearly.",
      userId: {
        _id: "5",
        name: "Tapabrata Maity",
        role: "student",
      },
      createdAt: "2026-06-18",
    },
    {
      _id: "4",
      comment:
        "Simple and to the point. Helped me revise searching techniques quickly before my semester exam.",
      userId: {
        _id: "2",
        name: "Subhajit Kundu",
        role: "student",
      },
      createdAt: "2026-06-14",
    },
    {
      _id: "5",
      comment:
        "The linear search section could use a bit more depth — a dry run and a note on its space complexity would round it out nicely. Everything else, especially the binary search analysis, is explained very well",
      userId: {
        _id: "6",
        name: "Runa Mukherjee",
        role: "teacher",
        verificationStatus: "verified",
      },
      createdAt: "2026-06-10",
    },
  ],
};
