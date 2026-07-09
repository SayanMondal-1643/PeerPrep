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

export const mockMaterialsResponse = {
  status: "success",
  results: 0,
  data: [
    {
      _id: "1",
      title: "Complete Array Problems Guide",
      uploadDate: "2026-06-05",
      status: "approved",
      isBestMaterial: true,
    },
    {
      _id: "2",
      title: "3NF vs BCNF",
      uploadDate: "2026-07-10",
      status: "pending",
      isBestMaterial: false,
    },
    {
      _id: "3",
      title: "ACID Properties in Database Transactions",
      uploadDate: "2025-05-25",
      status: "pending",
      isBestMaterial: false,
    },
    {
      _id: "4",
      title: "Two Pointer Technique Explained",
      uploadDate: "2025-02-11",
      status: "rejected",
      isBestMaterial: false,
    },
    {
      _id: "5",
      title: "Array Algorithms Cheat Sheet",
      uploadDate: "2025-01-02",
      status: "approved",
      isBestMaterial: false,
    },
    {
      _id: "6",
      title: "GATE Practice Problems on Deadlocks",
      uploadDate: "2024-12-23",
      status: "approved",
      isBestMaterial: false,
    },
    {
      _id: "7",
      title: "Solved GATE PYQs on Binary Search and Time Complexity",
      uploadDate: "2024-01-15",
      status: "approved",
      isBestMaterial: true,
    },
    {
      _id: "8",
      title: "Necessary Conditions for Deadlock",
      uploadDate: "2024-11-06",
      status: "approved",
      isBestMaterial: true,
    },
    {
      _id: "9",
      title: "BFS vs DFS",
      uploadDate: "2024-02-01",
      status: "approved",
      isBestMaterial: false,
    },
    {
      _id: "10",
      title: "Solved GATE Numericals on Pipelining",
      uploadDate: "2023-10-21",
      status: "rejected",
      isBestMaterial: false,
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
