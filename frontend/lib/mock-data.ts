import { HierarchyOption, HierarchyResponse } from "./hierarchy-types";
import { User, ApiAuthResponse, SignupData } from "./user-types";
import {
  ApiMaterialResponse,
  ApiMaterialsResponse,
  ApiUserMaterialsResponse,
} from "./material-types";

import { ApiTopperBadgesResponse } from "./topper-badge-types";

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

// export const mockMaterialsResponse: ApiMaterialsResponse = {
//   status: "success",
//   exam: "Maulana Abul Kalam Azad University of Technology",
//   branch: "Computer Science & Engineering",
//   subject: "Data Structures & Algorithms",
//   topic: "Searching Techniques",
//   results: 10,
//   data: [
//     {
//       _id: "1",
//       title: "Searching Techniques Guide: Linear & Binary Search",
//       description:
//         "A thorough walkthrough of linear and binary search, covering both iterative and recursive approach of binary search along with their time complexity analysis.",
//       fileUrl: "/materials/searching_techniques.pdf",
//       uploadDate: "2026-06-05",
//       status: "approved",
//       userId: {
//         _id: "1",
//         name: "Sayan Mondal",
//         role: "student",
//       },
//       topicId: "2",
//       isBestMaterial: true,
//       isTopperMaterial: false,
//       isAIPicked: false,
//       ratingsAverage: 4.8,
//       ratingsQuantity: 77,
//     },
//     {
//       _id: "2",
//       title: "MAKAUT Previous Year Questions On Searching Techniques",
//       description:
//         "A curated set of previous year MAKAUT exam questions on linear, binary, and interpolation search, with detailed step-by-step solutions.",
//       fileUrl: "https://example.com/file2.pdf",
//       uploadDate: "2026-07-10",
//       status: "approved",
//       userId: { _id: "2", name: "Subhajit Kundu", role: "student" },
//       topicId: "2",
//       isBestMaterial: false,
//       isTopperMaterial: true,
//       isAIPicked: false,
//       ratingsAverage: 4.5,
//       ratingsQuantity: 32,
//     },
//     {
//       _id: "3",
//       title: "Interpolation Search",
//       description:
//         "Explains the interpolation search technique as an improvement over binary search for uniformly distributed data, with algorithm, complexity analysis, and comparison against binary search.",
//       fileUrl: "https://example.com/file3.pdf",
//       uploadDate: "2025-05-25",
//       status: "approved",
//       userId: { _id: "3", name: "Akash Samanta", role: "student" },
//       topicId: "2",
//       isBestMaterial: false,
//       isTopperMaterial: false,
//       isAIPicked: false,
//       ratingsAverage: 3.7,
//       ratingsQuantity: 12,
//     },
//   ],
// };

export const mockMaterialsResponse: ApiMaterialsResponse = {
  status: "success",
  exam: "Maulana Abul Kalam Azad University of Technology",
  branch: "Computer Science & Engineering",
  subject: "Data Structures & Algorithms",
  topic: "Stacks",
  results: 2,
  data: [
    {
      _id: "1",
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
      _id: "2",
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
        _id: "4",
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
