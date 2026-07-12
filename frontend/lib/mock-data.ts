import { User, ApiAuthResponse, SignupData } from "./user-types";
import {
  ApiMaterialsResponse,
  ApiUserMaterialsResponse,
} from "./material-types";

import { ApiTopperBadgesResponse } from "./topper-badge-types";

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

const exams: HierarchyOption[] = [
  { _id: "0", name: "Graduate Aptitude Test in Engineering" },
  { _id: "1", name: "Maulana Abul Kalam Azad University of Technology" },
  { _id: "2", name: "Jadavpur University" },
  { _id: "3", name: "Calcutta University" },
];

const branches: HierarchyOption[] = [
  { _id: "1", name: "Computer Science Engineering" },
  { _id: "2", name: "Information Technology" },
  { _id: "3", name: "Electronics and Communication Engineering" },
  { _id: "4", name: "Electrical Engineering" },
  { _id: "5", name: "Mechanical Engineering" },
  { _id: "6", name: "Civil Engineering" },
  { _id: "7", name: "Chemical Engineering" },
  { _id: "8", name: "Biotechnology" },
  { _id: "9", name: "Aerospace Engineering" },
  { _id: "10", name: "Artificial Intelligence and Data Science" },
];

const subjects: HierarchyOption[] = [
  { _id: "1", name: "Data Structures & Algorithms" },
  { _id: "2", name: "Computer Organization" },
  { _id: "3", name: "Computer Architecture" },
  { _id: "4", name: "Design and Analysis of Algorithms" },
  { _id: "5", name: "Formal Languages and Automata Theory" },
  { _id: "6", name: "Operating Systems" },
  { _id: "7", name: "Object Oriented Programming" },
  { _id: "8", name: "Software Engineering" },
  { _id: "9", name: "Database Management Systems" },
  { _id: "10", name: "Computer Networks" },
];

const topics: HierarchyOption[] = [
  { _id: "1", name: "Array" },
  { _id: "2", name: "Strings" },
  { _id: "3", name: "Linked List" },
  { _id: "4", name: "Stack" },
  { _id: "5", name: "Queue" },
  { _id: "6", name: "Tree" },
  { _id: "7", name: "Graph" },
  { _id: "8", name: "Searching" },
  { _id: "9", name: "Sorting" },
  { _id: "10", name: "Hashing" },
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
  branch: "Computer Science Engineering",
  results: subjects.length,
  data: subjects,
};

export const mockTopicsResponse: HierarchyResponse = {
  status: "success",
  exam: "Maulana Abul Kalam Azad University of Technology",
  branch: "Computer Science Engineering",
  subject: "Data Structures & Algorithms",
  results: topics.length,
  data: topics,
};

export const mockMaterialsResponse: ApiMaterialsResponse = {
  status: "success",
  exam: "Graduate Aptitude Test in Engineering",
  branch: "Computer Science Engineering",
  subject: "Data Structures & Algorithms",
  topic: "Mixed Topics",
  results: 10,
  data: [
    {
      _id: "1",
      title: "Complete Array Problems Guide",
      description:
        "This guide covers common array-based problem patterns with step-by-step solutions that are useful for interviews and competitive programming.",
      fileUrl: "https://example.com/file1.pdf",
      uploadDate: "2026-06-05",
      status: "approved",
      userId: { _id: "u1", name: "Runa Mukherjee", role: "teacher" },
      topicId: "8",
      isBestMaterial: true,
      isTopperMaterial: true,
      isAIPicked: false,
      ratingsAverage: 4.7,
      ratingsQuantity: 38,
    },
    {
      _id: "2",
      title: "3NF vs BCNF",
      description:
        "A concise comparison of 3NF and BCNF with examples that explain when each normalization form is appropriate.",
      fileUrl: "https://example.com/file2.pdf",
      uploadDate: "2026-07-10",
      status: "pending",
      userId: { _id: "u2", name: "Sayan Mondal", role: "student" },
      topicId: "9",
      isBestMaterial: false,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 0,
      ratingsQuantity: 0,
    },
    {
      _id: "3",
      title: "ACID Properties in Database Transactions",
      description:
        "This material explains atomicity, consistency, isolation, and durability with simple transaction examples.",
      fileUrl: "https://example.com/file3.pdf",
      uploadDate: "2025-05-25",
      status: "pending",
      userId: { _id: "u3", name: "Subhajit Kundu", role: "student" },
      topicId: "10",
      isBestMaterial: false,
      isTopperMaterial: false,
      isAIPicked: true,
      ratingsAverage: 0,
      ratingsQuantity: 0,
    },
    {
      _id: "4",
      title: "Two Pointer Technique Explained",
      description:
        "A practical walkthrough of the two-pointer approach with solved examples for arrays and strings.",
      fileUrl: "https://example.com/file4.pdf",
      uploadDate: "2025-02-11",
      status: "rejected",
      userId: { _id: "u4", name: "Aarav Sharma", role: "teacher" },
      topicId: "1",
      isBestMaterial: false,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 2.1,
      ratingsQuantity: 7,
    },
    {
      _id: "5",
      title: "Array Algorithms Cheat Sheet",
      description:
        "This cheat sheet summarizes essential array algorithms, their complexity, and the most common use cases.",
      fileUrl: "https://example.com/file5.pdf",
      uploadDate: "2025-01-02",
      status: "approved",
      userId: { _id: "u5", name: "Nisha Roy", role: "student" },
      topicId: "2",
      isBestMaterial: false,
      isTopperMaterial: true,
      isAIPicked: true,
      ratingsAverage: 4.4,
      ratingsQuantity: 29,
    },
    {
      _id: "6",
      title: "GATE Practice Problems on Deadlocks",
      description:
        "This set of practice problems helps learners reason through deadlock prevention and avoidance strategies.",
      fileUrl: "https://example.com/file6.pdf",
      uploadDate: "2024-12-23",
      status: "approved",
      userId: { _id: "u6", name: "Runa Mukherjee", role: "teacher" },
      topicId: "6",
      isBestMaterial: false,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 4.2,
      ratingsQuantity: 18,
    },
    {
      _id: "7",
      title: "Solved GATE PYQs on Binary Search and Time Complexity",
      description:
        "The resource compiles previous-year questions with clear solutions and complexity analysis for binary search problems.",
      fileUrl: "https://example.com/file7.pdf",
      uploadDate: "2024-01-15",
      status: "approved",
      userId: { _id: "u7", name: "Sayan Mondal", role: "student" },
      topicId: "8",
      isBestMaterial: true,
      isTopperMaterial: true,
      isAIPicked: false,
      ratingsAverage: 4.8,
      ratingsQuantity: 45,
    },
    {
      _id: "8",
      title: "Necessary Conditions for Deadlock",
      description:
        "This note outlines the key conditions required for deadlock and summarizes what each condition means in practice.",
      fileUrl: "https://example.com/file8.pdf",
      uploadDate: "2024-11-06",
      status: "approved",
      userId: { _id: "u8", name: "Aarav Sharma", role: "teacher" },
      topicId: "7",
      isBestMaterial: true,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 4.6,
      ratingsQuantity: 52,
    },
    {
      _id: "9",
      title: "BFS vs DFS",
      description:
        "The material compares breadth-first and depth-first traversal with examples suitable for graph theory revision.",
      fileUrl: "https://example.com/file9.pdf",
      uploadDate: "2024-02-01",
      status: "approved",
      userId: { _id: "u9", name: "Nisha Roy", role: "student" },
      topicId: "4",
      isBestMaterial: false,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 4.4,
      ratingsQuantity: 22,
    },
    {
      _id: "10",
      title: "Solved GATE Numericals on Pipelining",
      description:
        "This document demonstrates worked numerical examples for pipelining concepts commonly asked in GATE exams.",
      fileUrl: "https://example.com/file10.pdf",
      uploadDate: "2023-10-21",
      status: "rejected",
      userId: { _id: "u10", name: "Runa Mukherjee", role: "teacher" },
      topicId: "3",
      isBestMaterial: false,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 2.8,
      ratingsQuantity: 12,
    },
  ],
};

export const mockUsersResponse = {
  status: "success",
  results: 10,
  data: [
    {
      _id: "1",
      name: "Sayan Mondal",
      email: "sayan.mondal@example.com",
      role: "student",
      verificationStatus: "verified",
      accountStatus: "active",
      materialsUploaded: 14,
      joinedDate: "2024-01-10",
    },
    {
      _id: "2",
      name: "Subhajit Kundu",
      email: "subhajit.kundu@example.com",
      role: "student",
      verificationStatus: "verified",
      accountStatus: "suspended",
      materialsUploaded: 7,
      joinedDate: "2023-11-25",
    },
    {
      _id: "3",
      name: "Runa Mukherjee",
      email: "runa.mukherjee@example.com",
      role: "teacher",
      verificationStatus: "verified",
      accountStatus: "active",
      materialsUploaded: 22,
      joinedDate: "2023-09-12",
      idProofUrl: "https://example.com/idproof/3.pdf",
    },
    {
      _id: "4",
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      role: "student",
      verificationStatus: "verified",
      accountStatus: "active",
      materialsUploaded: 9,
      joinedDate: "2024-02-05",
    },
    {
      _id: "5",
      name: "Amit Patel",
      email: "amit.patel@example.com",
      role: "student",
      verificationStatus: "verified",
      accountStatus: "suspended",
      materialsUploaded: 5,
      joinedDate: "2024-03-18",
    },
    {
      _id: "6",
      name: "Sneha Reddy",
      email: "sneha.reddy@example.com",
      role: "student",
      verificationStatus: "verified",
      accountStatus: "active",
      materialsUploaded: 11,
      joinedDate: "2024-04-22",
    },
    {
      _id: "7",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      role: "teacher",
      verificationStatus: "pending",
      accountStatus: "active",
      materialsUploaded: 16,
      joinedDate: "2023-05-30",
      idProofUrl: "https://example.com/idproof/7.pdf",
    },
    {
      _id: "8",
      name: "Ananya Das",
      email: "ananya.das@example.com",
      role: "teacher",
      verificationStatus: "rejected",
      accountStatus: "active",
      materialsUploaded: 4,
      joinedDate: "2023-07-08",
      idProofUrl: "https://example.com/idproof/8.pdf",
    },
    {
      _id: "9",
      name: "Vikram Singh",
      email: "vikram.singh@example.com",
      role: "admin",
      verificationStatus: "verified",
      accountStatus: "active",
      materialsUploaded: 2,
      joinedDate: "2022-12-14",
    },
    {
      _id: "10",
      name: "Ritika Bose",
      email: "ritika.bose@example.com",
      role: "teacher",
      verificationStatus: "pending",
      accountStatus: "suspended",
      materialsUploaded: 13,
      joinedDate: "2024-06-11",
      idProofUrl: "https://example.com/idproof/10.pdf",
    },
  ],
};

export const mockToppersResponse = {
  status: "success",
  results: 10,
  data: [
    {
      _id: "1",
      userId: "1",
      userName: "Sayan Mondal",
      subject: "Database Management Systems",
      exam: "MAKAUT",
      branch: "Computer Science & Engineering",
      year: 2025,
      cgpa: 9,
      markSheetUrl: "https://resources/marksheet/1/1",
      status: "pending",
    },
    {
      _id: "2",
      userId: "2",
      userName: "Subhajit Kundu",
      subject: "Data Structures & Algorithms",
      exam: "MAKAUT",
      branch: "Computer Science & Engineering",
      year: 2024,
      cgpa: 9,
      markSheetUrl: "https://resources/marksheet/2/1",
      status: "approved",
    },
    {
      _id: "3",
      userId: "2",
      userName: "Subhajit Kundu",
      subject: "Signals & Systems",
      exam: "MAKAUT",
      branch: "Computer Science & Engineering",
      year: 2024,
      cgpa: 9,
      markSheetUrl: "https://resources/marksheet/2/2",
      status: "approved",
    },
    {
      _id: "4",
      userId: "3",
      userName: "Priya Sharma",
      subject: "Data Structures & Algorithms",
      exam: "MAKAUT",
      branch: "Computer Science & Engineering",
      year: 2023,
      cgpa: 10,
      markSheetUrl: "https://resources/marksheet/3/1",
      status: "approved",
    },
    {
      _id: "5",
      userId: "4",
      userName: "Arindam Ghosh",
      subject: "Operating Systems",
      exam: "Jadavpur University",
      branch: "Information Technology",
      year: 2025,
      cgpa: 8.7,
      markSheetUrl: "https://resources/marksheet/4/1",
      status: "pending",
    },
    {
      _id: "6",
      userId: "5",
      userName: "Ritika Banerjee",
      subject: "Computer Networks",
      exam: "MAKAUT",
      branch: "Electronics & Communication Engineering",
      year: 2024,
      cgpa: 8.2,
      markSheetUrl: "https://resources/marksheet/5/1",
      status: "rejected",
    },
    {
      _id: "7",
      userId: "6",
      userName: "Debjit Roy",
      subject: "Theory of Computation",
      exam: "Jadavpur University",
      branch: "Computer Science & Engineering",
      year: 2023,
      cgpa: 9.4,
      markSheetUrl: "https://resources/marksheet/6/1",
      status: "approved",
    },
    {
      _id: "8",
      userId: "7",
      userName: "Ananya Chatterjee",
      subject: "Database Management Systems",
      exam: "MAKAUT",
      branch: "Information Technology",
      year: 2025,
      cgpa: 8.9,
      markSheetUrl: "https://resources/marksheet/7/1",
      status: "pending",
    },
    {
      _id: "9",
      userId: "8",
      userName: "Souvik Das",
      subject: "Digital Electronics",
      exam: "MAKAUT",
      branch: "Electronics & Communication Engineering",
      year: 2022,
      cgpa: 7.8,
      markSheetUrl: "https://resources/marksheet/8/1",
      status: "rejected",
    },
    {
      _id: "10",
      userId: "9",
      userName: "Meghna Sen",
      subject: "Data Structures & Algorithms",
      exam: "Jadavpur University",
      branch: "Computer Science & Engineering",
      year: 2024,
      cgpa: 9.6,
      markSheetUrl: "https://resources/marksheet/9/1",
      status: "approved",
    },
  ],
};

export const mockReportsResponse = {
  status: "success",
  results: 10,
  data: [
    {
      _id: "1",
      materialId: "1",
      materialTitle: "Sorting Techniques",
      reporterId: {
        _id: "1",
        name: "Sayan Mondal",
        role: "student",
      },
      reportReason: "Incorrect content",
      comment: "Binary search can't be done on unsorted arrays",
      reportDate: "2026-06-13",
      status: "resolved",
    },
    {
      _id: "2",
      materialId: "4",
      materialTitle: "Complete Array Problems Guide",
      reporterId: {
        _id: "3",
        name: "Runa Mukherjee",
        role: "teacher",
        verificationStatus: "verified",
      },
      reportReason: "Spam or irrelevant",
      comment:
        "This looks like an ad for a coaching center, not actual material",
      reportDate: "2026-06-14",
      status: "dismissed",
    },
    {
      _id: "3",
      materialId: "2",
      materialTitle: "DBMS Normalization Notes",
      reporterId: {
        _id: "5",
        name: "Arka Sen",
        role: "student",
      },
      reportReason: "Copyright violation",
      comment: "This is a direct scan of a paid textbook chapter",
      reportDate: "2026-06-15",
      status: "pending",
    },
    {
      _id: "4",
      materialId: "7",
      materialTitle: "OS Deadlock Handling Cheatsheet",
      reporterId: {
        _id: "2",
        name: "Priya Das",
        role: "teacher",
        verificationStatus: "pending",
      },
      reportReason: "Incorrect content",
      comment: "The Banker's Algorithm example has a calculation error",
      reportDate: "2026-06-16",
      status: "pending",
    },
    {
      _id: "5",
      materialId: "9",
      materialTitle: "Computer Networks OSI Layers",
      reporterId: {
        _id: "6",
        name: "Debjit Roy",
        role: "student",
      },
      reportReason: "Duplicate content",
      comment: "Same file already exists under Topic: Networking Basics",
      reportDate: "2026-06-17",
      status: "dismissed",
    },
    {
      _id: "6",
      materialId: "3",
      materialTitle: "Linked List Interview Questions",
      reporterId: {
        _id: "7",
        name: "Abhishek Nandy",
        role: "teacher",
        verificationStatus: "verified",
      },
      reportReason: "Broken file link",
      comment: "The PDF link returns a 404",
      reportDate: "2026-06-18",
      status: "pending",
    },
    {
      _id: "7",
      materialId: "5",
      materialTitle: "Graph Traversal Algorithms",
      reporterId: {
        _id: "4",
        name: "Sneha Ghosh",
        role: "student",
      },
      reportReason: "Incorrect content",
      comment: "DFS and BFS implementations are swapped in the diagram",
      reportDate: "2026-06-19",
      status: "resolved",
    },
    {
      _id: "8",
      materialId: "8",
      materialTitle: "Compiler Design Syntax Trees",
      reporterId: {
        _id: "8",
        name: "Ritwik Chatterjee",
        role: "teacher",
        verificationStatus: "rejected",
      },
      reportReason: "Spam or irrelevant",
      comment: "Contains promotional links unrelated to the topic",
      reportDate: "2026-06-20",
      status: "dismissed",
    },
    {
      _id: "9",
      materialId: "6",
      materialTitle: "Operating System Process Scheduling",
      reporterId: {
        _id: "3",
        name: "Runa Mukherjee",
        role: "teacher",
        verificationStatus: "verified",
      },
      reportReason: "Copyright violation",
      comment: "Watermark shows this was taken from a paid course",
      reportDate: "2026-06-21",
      status: "pending",
    },
    {
      _id: "10",
      materialId: "10",
      materialTitle: "TCP/IP Protocol Suite Explained",
      reporterId: {
        _id: "2",
        name: "Priya Das",
        role: "teacher",
        verificationStatus: "pending",
      },
      reportReason: "Incorrect content",
      comment: "Claims TCP is connectionless, which is wrong",
      reportDate: "2026-06-22",
      status: "resolved",
    },
  ],
};

export const mockUserMaterialsResponse: ApiUserMaterialsResponse = {
  status: "success",
  results: 3,
  data: [
    {
      _id: "1",
      title: "3NF vs BCNF",
      description:
        "A comparison of Third Normal Form and Boyce-Codd Normal Form with examples covering functional dependency violations.",
      fileUrl: "https://example.com/file1.pdf",
      uploadDate: "2025-07-10",
      status: "pending",
      userId: { _id: "1", name: "Sayan Mondal", role: "student" },
      topicId: "3",
      isBestMaterial: false,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 0,
      ratingsQuantity: 0,
      exam: "MAKAUT",
      branch: "CSE",
      subject: "Database Management Systems",
      topic: "Normalization",
    },
    {
      _id: "2",
      title: "Types of Inheritance",
      description:
        "Covers single, multiple, multilevel, and hierarchical inheritance in OOP, along with polymorphism examples in Java.",
      fileUrl: "https://example.com/file2.pdf",
      uploadDate: "2024-11-06",
      status: "approved",
      userId: { _id: "1", name: "Sayan Mondal", role: "student" },
      topicId: "7",
      isBestMaterial: true,
      isTopperMaterial: false,
      isAIPicked: true,
      ratingsAverage: 4,
      ratingsQuantity: 19,
      exam: "MAKAUT",
      branch: "CSE",
      subject: "Object-Oriented Programming",
      topic: "Inheritance and Polymorphism",
    },
    {
      _id: "3",
      title: "Sliding Window Technique Cheat Sheet",
      description:
        "Quick reference for fixed and variable-size sliding window patterns with common problem types.",
      fileUrl: "https://example.com/file3.pdf",
      uploadDate: "2025-03-22",
      status: "rejected",
      userId: { _id: "1", name: "Sayan Mondal", role: "student" },
      topicId: "1",
      isBestMaterial: false,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 0,
      ratingsQuantity: 0,
      exam: "Jadavpur University",
      branch: "Information Technology",
      subject: "Data Structures & Algorithms",
      topic: "Array",
    },
  ],
};

export const mockUserTopperBadgesResponse: ApiTopperBadgesResponse = {
  status: "success",
  results: 3,
  data: [
    {
      _id: "1",
      userId: "1",
      userName: "Sayan Mondal",
      subject: "Database Management Systems",
      exam: "MAKAUT",
      branch: "Computer Science & Engineering",
      year: 2025,
      cgpa: 9,
      markSheetUrl: "https://res.cloudinary.com/peerprep/marksheet/1/1.pdf",
      status: "pending",
    },
    {
      _id: "2",
      userId: "1",
      userName: "Sayan Mondal",
      subject: "Data Structures & Algorithms",
      exam: "MAKAUT",
      branch: "Computer Science & Engineering",
      year: 2024,
      cgpa: 8.7,
      markSheetUrl: "https://res.cloudinary.com/peerprep/marksheet/1/2.pdf",
      status: "approved",
    },
    {
      _id: "3",
      userId: "1",
      userName: "Sayan Mondal",
      subject: "Object-Oriented Programming",
      exam: "Jadavpur University",
      branch: "Information Technology",
      year: 2024,
      cgpa: 8.2,
      markSheetUrl: "https://res.cloudinary.com/peerprep/marksheet/1/3.pdf",
      status: "rejected",
    },
  ],
};
