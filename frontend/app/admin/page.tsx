"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, Plus, Edit, Trash2, Users, FileText, BarChart3, Eye, Star, Search, ChevronDown, GraduationCap, Briefcase, Shield, CheckCircle, Clock, XCircle, Activity, AlertCircle, Medal, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HierarchyTree } from "@/components/hierarchy-tree"
import MarksheetViewerModal from "@/components/marksheet-viewer-modal"

// Mock data - will be replaced with database queries
const stats = {
  totalUsers: 11,
  activeUsers: 5,
  totalMaterials: 7925,
  viewsDownloads: 50037,
  toppers: 2,
  reports: 5,
}

const recentMaterials = [
  {
    id: "1",
    title: "Complete Array Problems Guide",
    exam: "MAKAUT",
    branch: "CSE",
    subject: "DSA",
    topic: "Arrays",
    uploadedBy: "Rajesh Kumar",
    isTeacher: true,
    status: "approved",
    uploadDate: "2024-01-15",
    materialType: "Best Material",
  },
  {
    id: "2",
    title: "Array Algorithms Cheat Sheet",
    exam: "MAKAUT",
    branch: "CSE",
    subject: "DSA",
    topic: "Arrays",
    uploadedBy: "Priya Sharma",
    status: "approved",
    uploadDate: "2025-01-02",
    materialType: "Topper's Material",
  },
  {
    id: "3",
    title: "Two Pointer Technique Explained",
    exam: "MAKAUT",
    branch: "CSE",
    subject: "DSA",
    topic: "Arrays",
    uploadedBy: "Amit Patel",
    status: "approved",
    uploadDate: "2025-02-11",
    materialType: "Student's Material",
  },
  {
    id: "4",
    title: "Kadane's Algorithm Deep Dive",
    exam: "MAKAUT",
    branch: "CSE",
    subject: "DSA",
    topic: "Arrays",
    uploadedBy: "Sneha Reddy",
    status: "approved",
    uploadDate: "2023-12-10",
    materialType: "Student's Material",
  },
  {
    id: "6",
    title: "Array Rotation Techniques",
    exam: "MAKAUT",
    branch: "CSE",
    subject: "DSA",
    topic: "Arrays",
    uploadedBy: "Vikram Singh",
    status: "approved",
    uploadDate: "2024-03-19",
    materialType: "Student's Material",
  },
  {
    id: "7",
    title: "Linked Lists Fundamentals",
    exam: "MAKAUT",
    branch: "CSE",
    subject: "DSA",
    topic: "Linked Lists",
    uploadedBy: "Vikram Singh",
    status: "approved",
    uploadDate: "2023-11-24",
    materialType: "Best Material",
  },
  {
    id: "8",
    title: "Linked List Problems & Solutions",
    exam: "MAKAUT",
    branch: "CSE",
    subject: "DSA",
    topic: "Linked Lists",
    uploadedBy: "Vikram Singh",
    status: "approved",
    uploadDate: "2023-11-24",
    materialType: "Best Material",
  },
  {
    id: "9",
    title: "BFS vs DFS",
    exam: "MAKAUT",
    branch: "CSE",
    subject: "DSA",
    topic: "Graphs",
    uploadedBy: "Sayan Mondal",
    status: "approved",
    uploadDate: "2024-02-01",
    materialType: "Best Material",
  },
  {
    id: "10",
    title: "Types of Inheritance",
    exam: "MAKAUT",
    branch: "CSE",
    subject: "OOPs",
    topic: "Inheritance and Polymorphism",
    uploadedBy: "Sayan Mondal",
    status: "approved",
    uploadDate: "2024-11-06",
    materialType: "Student's Material",
  },
  {
    id: "11",
    title: "3NF vs BCNF",
    exam: "MAKAUT",
    branch: "CSE",
    subject: "DBMS",
    topic: "Normalization",
    uploadedBy: "Sayan Mondal",
    status: "pending",
    uploadDate: "2025-07-10",
    materialType: "Student's Material",
  },
  {
    id: "12",
    title: "Solved GATE PYQs on Binary Search and Time Complexity",
    exam: "GATE",
    branch: "CS & IT",
    subject: "Algorithms",
    topic: "Searching",
    uploadedBy: "Subhajit Kundu",
    status: "approved",
    uploadDate: "2024-01-15",
    materialType: "Best Material",
  },
  {
    id: "13",
    title: "GATE Practice Problems on Deadlocks",
    exam: "GATE",
    branch: "CS & IT",
    subject: "OS",
    topic: "Deadlocks",
    uploadedBy: "Subhajit Kundu",
    status: "approved",
    uploadDate: "2024-12-23",
    materialType: "Student's Material",
  },
  {
    id: "14",
    title: "ACID Properties in Database Transactions",
    exam: "MAKAUT",
    branch: "CSE",
    subject: "DBMS",
    topic: "Transactions",
    uploadedBy: "Subhajit Kundu",
    status: "pending",
    uploadDate: "2025-05-25",
    materialType: "Student's Material",
  },
  {
    id: "15",
    title: "Solved GATE Numericals on Pipelining",
    exam: "GATE",
    branch: "CS & IT",
    subject: "COA",
    topic: "Instruction Pipelining",
    uploadedBy: "Runa Mukherjee",
    isTeacher: true,
    status: "approved",
    uploadDate: "2023-10-21",
    materialType: "Best Material",
  },
  {
    id: "16",
    title: "Necessary Conditions for Deadlock",
    exam: "MAKAUT",
    branch: "CSE",
    subject: "OS",
    topic: "Deadlocks",
    uploadedBy: "Runa Mukherjee",
    isTeacher: true,
    status: "approved",
    uploadDate: "2015-02-01",
    materialType: "Best Material",
  },
  {
    id: "17",
    title: "GATE Practice Problems on Process Scheduling",
    exam: "GATE",
    branch: "CS & IT",
    subject: "OS",
    topic: "CPU Scheduling",
    uploadedBy: "Runa Mukherjee",
    isTeacher: true,
    status: "approved",
    uploadDate: "2025-12-31",
    materialType: "Teacher's Material",
  },
  {
    id: "18",
    title: "Postfix Expression Evaluation",
    exam: "MAKAUT",
    branch: "CSE",
    subject: "DSA",
    topic: "Stacks",
    uploadedBy: "Runa Mukherjee",
    isTeacher: true,
    status: "approved",
    uploadDate: "2016-05-17",
    materialType: "Teacher's Material",
  },
].sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())

const users = [
  {
    id: "1",
    name: "Sayan Mondal",
    email: "sayan@example.com",
    role: "student",
    verificationStatus: "verified",
    materialsUploaded: 3,
    joinedDate: "2022-12-12",
    accountStatus: "active",
  },
  {
    id: "2",
    name: "Subhajit Kundu",
    email: "subhajit@example.com",
    role: "student",
    verificationStatus: "pending",
    materialsUploaded: 3,
    joinedDate: "2022-10-20",
    accountStatus: "suspended",
  },
  {
    id: "3",
    name: "Runa Mukherjee",
    email: "teacher@example.com",
    role: "teacher",
    verificationStatus: "verified",
    materialsUploaded: 4,
    joinedDate: "2010-07-15",
    accountStatus: "active",
    linkedinProfile: "linkedin.com/in/runa-mukherjee",
    researchgateProfile: "researchgate.net/profile/runa-mukherjee",
  },
  {
    id: "4",
    name: "Admin",
    email: "admin@example.com",
    role: "admin",
    verificationStatus: "verified",
    materialsUploaded: 2,
    joinedDate: "2005-01-01",
    accountStatus: "active",
  },
  {
    id: "5",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    role: "teacher",
    verificationStatus: "pending",
    materialsUploaded: 3,
    joinedDate: "2008-03-22",
    accountStatus: "active",
    linkedinProfile: "linkedin.com/in/rajesh-kumar",
    researchgateProfile: "researchgate.net/profile/rajesh-kumar",
  },
  {
    id: "6",
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "student",
    verificationStatus: "rejected",
    materialsUploaded: 2,
    joinedDate: "2009-05-10",
    accountStatus: "active",
  },
  {
    id: "7",
    name: "Amit Patel",
    email: "amit@example.com",
    role: "student",
    verificationStatus: "verified",
    materialsUploaded: 1,
    joinedDate: "2009-02-14",
    accountStatus: "suspended",
  },
  {
    id: "8",
    name: "Sneha Reddy",
    email: "sneha@example.com",
    role: "student",
    verificationStatus: "pending",
    materialsUploaded: 3,
    joinedDate: "2008-11-08",
    accountStatus: "active",
  },
  {
    id: "9",
    name: "Vikram Singh",
    email: "vikram@example.com",
    role: "student",
    verificationStatus: "verified",
    materialsUploaded: 2,
    joinedDate: "2007-06-20",
    accountStatus: "active",
  },
  {
    id: "10",
    name: "Deepak Verma",
    email: "deepak@example.com",
    role: "student",
    verificationStatus: "rejected",
    materialsUploaded: 1,
    joinedDate: "2006-09-15",
    accountStatus: "suspended",
  },
  {
    id: "11",
    name: "Neha Singh",
    email: "neha@example.com",
    role: "student",
    verificationStatus: "verified",
    materialsUploaded: 2,
    joinedDate: "2006-01-05",
    accountStatus: "active",
  },
].sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime())

const hierarchy = [
  {
    id: "exam-1",
    name: "MAKAUT (Maulana Abul Kalam Azad University of Technology)",
    branchCount: 7,
    subjectCount: 46,
    topicCount: 403,
    materialCount: 1585,
    branches: [
      {
        id: "branch-1",
        name: "CSE",
        subjectCount: 5,
        topicCount: 53,
        materialCount: 210,
        subjects: [
          {
            id: "subject-1",
            name: "Data Structures & Algorithms",
            topicCount: 10,
            materialCount: 70,
            topics: [
              { id: "topic-1", name: "Arrays", materials: 5 },
              { id: "topic-2", name: "Linked Lists", materials: 2 },
              { id: "topic-3", name: "Stacks", materials: 5 },
              { id: "topic-4", name: "Queues", materials: 5 },
              { id: "topic-5", name: "Trees", materials: 12 },
              { id: "topic-6", name: "Graphs", materials: 10 },
              { id: "topic-7", name: "Hash Tables", materials: 7 },
              { id: "topic-8", name: "Heaps", materials: 6 },
              { id: "topic-9", name: "Searching Algorithms", materials: 8 },
              { id: "topic-10", name: "Sorting Algorithms", materials: 10 },
            ],
          },
          {
            id: "subject-2",
            name: "Database Management Systems",
            topicCount: 10,
            materialCount: 32,
            topics: [
              { id: "topic-11", name: "SQL Basics", materials: 3 },
              { id: "topic-12", name: "Normalization", materials: 3 },
              { id: "topic-13", name: "Indexing", materials: 3 },
              { id: "topic-14", name: "Transactions", materials: 3 },
              { id: "topic-15", name: "Query Optimization", materials: 3 },
              { id: "topic-16", name: "Backup & Recovery", materials: 3 },
              { id: "topic-17", name: "Concurrency Control", materials: 3 },
              { id: "topic-18", name: "NoSQL", materials: 3 },
              { id: "topic-19", name: "ER Model", materials: 3 },
              { id: "topic-20", name: "Data Integrity", materials: 2 },
            ],
          },
          {
            id: "subject-3",
            name: "Operating Systems",
            topicCount: 14,
            materialCount: 41,
            topics: [
              { id: "topic-21", name: "Processes", materials: 3 },
              { id: "topic-22", name: "Threads", materials: 3 },
              { id: "topic-23", name: "Scheduling", materials: 3 },
              { id: "topic-24", name: "Memory Management", materials: 4 },
              { id: "topic-25", name: "Virtual Memory", materials: 3 },
              { id: "topic-26", name: "File Systems", materials: 3 },
              { id: "topic-27", name: "Synchronization", materials: 3 },
              { id: "topic-28", name: "Deadlocks", materials: 3 },
              { id: "topic-29", name: "I/O Management", materials: 3 },
              { id: "topic-30", name: "Disk Scheduling", materials: 3 },
              { id: "topic-31", name: "Process Management", materials: 2 },
              { id: "topic-32", name: "Page Replacement", materials: 2 },
              { id: "topic-33", name: "Security", materials: 2 },
              { id: "topic-34", name: "Shell Programming", materials: 1 },
            ],
          },
          {
            id: "subject-4",
            name: "Computer Networks",
            topicCount: 11,
            materialCount: 38,
            topics: [
              { id: "topic-35", name: "OSI Model", materials: 3 },
              { id: "topic-36", name: "TCP/IP", materials: 4 },
              { id: "topic-37", name: "IP Addressing", materials: 3 },
              { id: "topic-38", name: "Routing", materials: 3 },
              { id: "topic-39", name: "Transport Layer", materials: 3 },
              { id: "topic-40", name: "Application Layer", materials: 3 },
              { id: "topic-41", name: "Network Security", materials: 3 },
              { id: "topic-42", name: "DNS", materials: 3 },
              { id: "topic-43", name: "DHCP", materials: 3 },
              { id: "topic-44", name: "Congestion Control", materials: 3 },
              { id: "topic-45", name: "VPN", materials: 2 },
            ],
          },
          {
            id: "subject-5",
            name: "Object-Oriented Programming",
            topicCount: 8,
            materialCount: 29,
            topics: [
              { id: "topic-46", name: "Classes & Objects", materials: 4 },
              { id: "topic-47", name: "Inheritance", materials: 4 },
              { id: "topic-48", name: "Polymorphism", materials: 4 },
              { id: "topic-49", name: "Encapsulation", materials: 3 },
              { id: "topic-50", name: "Abstraction", materials: 3 },
              { id: "topic-51", name: "Interfaces", materials: 3 },
              { id: "topic-52", name: "Design Patterns", materials: 4 },
              { id: "topic-53", name: "Exception Handling", materials: 4 },
            ],
          },
        ],
      },
      {
        id: "branch-2",
        name: "IT",
        subjectCount: 5,
        topicCount: 60,
        materialCount: 260,
        subjects: [
          {
            id: "subject-11",
            name: "Database Systems",
            topicCount: 12,
            materialCount: 60,
            topics: [
              { id: "topic-46", name: "SQL Basics", materials: 8 },
              { id: "topic-47", name: "Normalization", materials: 10 },
              { id: "topic-48", name: "Indexing", materials: 8 },
              { id: "topic-49", name: "Transactions", materials: 8 },
              { id: "topic-50", name: "Query Optimization", materials: 7 },
              { id: "topic-51", name: "Backup & Recovery", materials: 6 },
              { id: "topic-52", name: "Concurrency Control", materials: 7 },
              { id: "topic-53", name: "NoSQL", materials: 6 },
            ],
          },
        ],
      },
      {
        id: "branch-3",
        name: "ECE",
        subjectCount: 5,
        topicCount: 45,
        materialCount: 235,
        subjects: [
          {
            id: "subject-12",
            name: "Digital Electronics",
            topicCount: 10,
            materialCount: 65,
            topics: [
              { id: "topic-54", name: "Boolean Algebra", materials: 8 },
              { id: "topic-55", name: "Logic Gates", materials: 12 },
              { id: "topic-56", name: "Combinational Circuits", materials: 15 },
              { id: "topic-57", name: "Sequential Circuits", materials: 16 },
              { id: "topic-58", name: "Flip Flops", materials: 14 },
            ],
          },
        ],
      },
      {
        id: "branch-4",
        name: "ME",
        subjectCount: 8,
        topicCount: 70,
        materialCount: 265,
        subjects: [
          {
            id: "subject-13",
            name: "Thermodynamics",
            topicCount: 9,
            materialCount: 58,
            topics: [
              { id: "topic-59", name: "Laws of Thermodynamics", materials: 14 },
              { id: "topic-60", name: "Heat Transfer", materials: 16 },
              { id: "topic-61", name: "Entropy", materials: 14 },
              { id: "topic-62", name: "Cycles", materials: 14 },
            ],
          },
        ],
      },
      {
        id: "branch-5",
        name: "CE",
        subjectCount: 7,
        topicCount: 65,
        materialCount: 260,
        subjects: [
          {
            id: "subject-14",
            name: "Structural Analysis",
            topicCount: 8,
            materialCount: 55,
            topics: [
              { id: "topic-63", name: "Beams", materials: 12 },
              { id: "topic-64", name: "Columns", materials: 14 },
              { id: "topic-65", name: "Trusses", materials: 15 },
              { id: "topic-66", name: "Stress & Strain", materials: 14 },
            ],
          },
        ],
      },
      {
        id: "branch-6",
        name: "EE",
        subjectCount: 8,
        topicCount: 70,
        materialCount: 255,
        subjects: [
          {
            id: "subject-15",
            name: "Power Systems",
            topicCount: 9,
            materialCount: 62,
            topics: [
              { id: "topic-67", name: "Generation", materials: 14 },
              { id: "topic-68", name: "Transmission", materials: 16 },
              { id: "topic-69", name: "Distribution", materials: 16 },
              { id: "topic-70", name: "Protection", materials: 16 },
            ],
          },
        ],
      },
      {
        id: "branch-7",
        name: "CHE",
        subjectCount: 8,
        topicCount: 40,
        materialCount: 100,
        subjects: [
          {
            id: "subject-16",
            name: "Chemical Kinetics",
            topicCount: 5,
            materialCount: 35,
            topics: [
              { id: "topic-71", name: "Reaction Rates", materials: 8 },
              { id: "topic-72", name: "Catalysis", materials: 9 },
              { id: "topic-73", name: "Equilibrium", materials: 9 },
              { id: "topic-74", name: "Temperature Effects", materials: 9 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "exam-2",
    name: "Jadavpur University",
    branchCount: 9,
    subjectCount: 59,
    topicCount: 518,
    materialCount: 2038,
    branches: [
      {
        id: "branch-4",
        name: "ALL",
        subjectCount: 3,
        topicCount: 45,
        materialCount: 680,
        subjects: [
          {
            id: "subject-5",
            name: "Physics",
            topicCount: 15,
            materialCount: 220,
            topics: [
              { id: "topic-24", name: "Mechanics", materials: 45 },
              { id: "topic-25", name: "Thermodynamics", materials: 38 },
              { id: "topic-26", name: "Waves", materials: 42 },
              { id: "topic-27", name: "Electricity", materials: 50 },
              { id: "topic-28", name: "Magnetism", materials: 45 },
            ],
          },
          {
            id: "subject-6",
            name: "Chemistry",
            topicCount: 15,
            materialCount: 230,
            topics: [
              { id: "topic-29", name: "Organic Chemistry", materials: 75 },
              { id: "topic-30", name: "Inorganic Chemistry", materials: 85 },
              { id: "topic-31", name: "Physical Chemistry", materials: 70 },
            ],
          },
          {
            id: "subject-7",
            name: "Mathematics",
            topicCount: 15,
            materialCount: 230,
            topics: [
              { id: "topic-32", name: "Algebra", materials: 50 },
              { id: "topic-33", name: "Calculus", materials: 90 },
              { id: "topic-34", name: "Geometry", materials: 90 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "exam-3",
    name: "University of Calcutta",
    branchCount: 8,
    subjectCount: 53,
    topicCount: 461,
    materialCount: 1811,
    branches: [
      {
        id: "branch-5",
        name: "ALL",
        subjectCount: 3,
        topicCount: 42,
        materialCount: 520,
        subjects: [
          {
            id: "subject-8",
            name: "Physics",
            topicCount: 14,
            materialCount: 180,
            topics: [
              { id: "topic-35", name: "Mechanics", materials: 40 },
              { id: "topic-36", name: "Thermodynamics", materials: 35 },
              { id: "topic-37", name: "Waves", materials: 40 },
              { id: "topic-38", name: "Electricity", materials: 45 },
              { id: "topic-39", name: "Modern Physics", materials: 20 },
            ],
          },
          {
            id: "subject-9",
            name: "Chemistry",
            topicCount: 14,
            materialCount: 170,
            topics: [
              { id: "topic-40", name: "Organic Chemistry", materials: 60 },
              { id: "topic-41", name: "Inorganic Chemistry", materials: 65 },
              { id: "topic-42", name: "Physical Chemistry", materials: 45 },
            ],
          },
          {
            id: "subject-10",
            name: "Biology",
            topicCount: 14,
            materialCount: 170,
            topics: [
              { id: "topic-43", name: "Cell Biology", materials: 50 },
              { id: "topic-44", name: "Genetics", materials: 65 },
              { id: "topic-45", name: "Ecology", materials: 55 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "exam-4",
    name: "University of Kalyani",
    branchCount: 6,
    subjectCount: 39,
    topicCount: 345,
    materialCount: 1359,
    branches: [
      {
        id: "branch-6",
        name: "CSE",
        subjectCount: 4,
        topicCount: 16,
        materialCount: 140,
        subjects: [
          {
            id: "subject-11",
            name: "Database Management",
            topicCount: 4,
            materialCount: 35,
            topics: [
              { id: "topic-46", name: "SQL Basics", materials: 10 },
              { id: "topic-47", name: "Normalization", materials: 8 },
              { id: "topic-48", name: "Transactions", materials: 9 },
              { id: "topic-49", name: "Indexing", materials: 8 },
            ],
          },
        ],
      },
      {
        id: "branch-7",
        name: "ECE",
        subjectCount: 4,
        topicCount: 16,
        materialCount: 140,
        subjects: [
          {
            id: "subject-12",
            name: "Signal Processing",
            topicCount: 4,
            materialCount: 35,
            topics: [
              { id: "topic-50", name: "Fourier Transform", materials: 10 },
              { id: "topic-51", name: "Filtering", materials: 8 },
              { id: "topic-52", name: "Modulation", materials: 9 },
              { id: "topic-53", name: "Sampling", materials: 8 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "exam-5",
    name: "GATE",
    branchCount: 5,
    subjectCount: 33,
    topicCount: 288,
    materialCount: 1132,
    branches: [
      {
        id: "branch-gate-1",
        name: "CSE",
        subjectCount: 8,
        topicCount: 72,
        materialCount: 285,
        subjects: [
          {
            id: "subject-gate-1",
            name: "Data Structures & Algorithms",
            topicCount: 10,
            materialCount: 45,
            topics: [
              { id: "topic-gate-1", name: "Arrays", materials: 5 },
              { id: "topic-gate-2", name: "Linked Lists", materials: 4 },
              { id: "topic-gate-3", name: "Trees", materials: 8 },
              { id: "topic-gate-4", name: "Graphs", materials: 8 },
              { id: "topic-gate-5", name: "Dynamic Programming", materials: 10 },
              { id: "topic-gate-6", name: "Sorting Algorithms", materials: 10 },
            ],
          },
        ],
      },
      {
        id: "branch-gate-2",
        name: "ECE",
        subjectCount: 7,
        topicCount: 58,
        materialCount: 230,
        subjects: [
          {
            id: "subject-gate-2",
            name: "Digital Electronics",
            topicCount: 8,
            materialCount: 35,
            topics: [
              { id: "topic-gate-7", name: "Boolean Algebra", materials: 6 },
              { id: "topic-gate-8", name: "Logic Gates", materials: 8 },
              { id: "topic-gate-9", name: "Combinational Circuits", materials: 10 },
              { id: "topic-gate-10", name: "Sequential Circuits", materials: 11 },
            ],
          },
        ],
      },
      {
        id: "branch-gate-3",
        name: "ME",
        subjectCount: 6,
        topicCount: 52,
        materialCount: 205,
        subjects: [
          {
            id: "subject-gate-3",
            name: "Thermodynamics",
            topicCount: 8,
            materialCount: 40,
            topics: [
              { id: "topic-gate-11", name: "Laws of Thermodynamics", materials: 10 },
              { id: "topic-gate-12", name: "Heat Transfer", materials: 12 },
              { id: "topic-gate-13", name: "Entropy", materials: 10 },
              { id: "topic-gate-14", name: "Cycles", materials: 8 },
            ],
          },
        ],
      },
      {
        id: "branch-gate-4",
        name: "EE",
        subjectCount: 6,
        topicCount: 54,
        materialCount: 212,
        subjects: [
          {
            id: "subject-gate-4",
            name: "Power Systems",
            topicCount: 7,
            materialCount: 38,
            topics: [
              { id: "topic-gate-15", name: "Generation", materials: 10 },
              { id: "topic-gate-16", name: "Transmission", materials: 10 },
              { id: "topic-gate-17", name: "Distribution", materials: 10 },
              { id: "topic-gate-18", name: "Protection", materials: 8 },
            ],
          },
        ],
      },
      {
        id: "branch-gate-5",
        name: "CE",
        subjectCount: 6,
        topicCount: 52,
        materialCount: 200,
        subjects: [
          {
            id: "subject-gate-5",
            name: "Structural Analysis",
            topicCount: 7,
            materialCount: 36,
            topics: [
              { id: "topic-gate-19", name: "Beams", materials: 10 },
              { id: "topic-gate-20", name: "Columns", materials: 10 },
              { id: "topic-gate-21", name: "Trusses", materials: 10 },
              { id: "topic-gate-22", name: "Stress & Strain", materials: 6 },
            ],
          },
        ],
      },
    ],
  },
]

// Dummy data for topper badge applications
const topperApplications = [
  {
    id: "1",
    name: "Subhajit Kundu",
    email: "subhajit@example.com",
    subject: "DBMS",
    exam: "MAKAUT",
    branch: "CSE",
    year: 2025,
    cgpa: 8.0,
    marksheetUrl: "https://via.placeholder.com/800x1000?text=Marksheet+1",
    status: "pending",
  },
  {
    id: "2",
    name: "Subhajit Kundu",
    email: "subhajit@example.com",
    subject: "DSA",
    exam: "MAKAUT",
    branch: "CSE",
    year: 2024,
    cgpa: 9.0,
    marksheetUrl: "https://via.placeholder.com/800x1000?text=Marksheet+4",
    status: "approved",
  },
  {
    id: "3",
    name: "Subhajit Kundu",
    email: "subhajit@example.com",
    subject: "Signals & Systems",
    exam: "MAKAUT",
    branch: "CSE",
    year: 2024,
    cgpa: 9.0,
    marksheetUrl: "https://via.placeholder.com/800x1000?text=Marksheet+5",
    status: "approved",
  },
  {
    id: "4",
    name: "Priya Sharma",
    email: "priya@example.com",
    subject: "DSA",
    exam: "MAKAUT",
    branch: "CSE",
    year: 2023,
    cgpa: 10.0,
    marksheetUrl: "https://via.placeholder.com/800x1000?text=Marksheet+6",
    status: "approved",
  },
]

// Mock reports data
const mockReports = [
  {
    id: "1",
    materialTitle: "Two Pointer Technique Explained",
    reportedBy: "Priya Sharma",
    isTeacher: false,
    reason: "Other",
    comment: "The material does not clearly specify the technique.",
    materialUploader: "Amit Patel",
    dateReported: "2026-01-24",
    status: "pending",
  },
  {
    id: "2",
    materialTitle: "GATE Practice Problems on Deadlocks",
    reportedBy: "Deepak Verma",
    isTeacher: false,
    reason: "Incorrect Content",
    comment: "One of the solutions provided for the deadlock detection question appears to be incorrect based on standard OS references.",
    materialUploader: "Subhajit Kundu",
    dateReported: "2025-03-11",
    status: "pending",
  },
  {
    id: "3",
    materialTitle: "Types of Inheritance",
    reportedBy: "Vikram Singh",
    isTeacher: false,
    reason: "Inappropriate Content",
    comment: "Some examples and wording in the material appear informal and not appropriate for academic study material.",
    materialUploader: "Sayan Mondal",
    dateReported: "2024-12-20",
    status: "reviewed",
  },
  {
    id: "4",
    materialTitle: "Kadane's Algorithm Deep Dive",
    reportedBy: "Priya Sharma",
    isTeacher: false,
    reason: "Plagiarism",
    comment: "Large portions of this material appear to match content from a GeeksforGeeks article without proper citation.",
    materialUploader: "Sneha Reddy",
    dateReported: "2024-06-01",
    status: "reviewed",
  },
  {
    id: "5",
    materialTitle: "Array Rotation Techniques",
    reportedBy: "Sayan Mondal",
    isTeacher: false,
    reason: "Incorrect Content",
    comment: "The explanation of the reversal algorithm seems incorrect and produces wrong results for certain test cases.",
    materialUploader: "Vikram Singh",
    dateReported: "2024-05-01",
    status: "reviewed",
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [verificationFilter, setVerificationFilter] = useState("all")
  const [accountStatusFilter, setAccountStatusFilter] = useState("all")
  const [topperApplicationsList, setTopperApplicationsList] = useState(topperApplications)
  const [topperSearchQuery, setTopperSearchQuery] = useState("")
  const [topperApprovalFilter, setTopperApprovalFilter] = useState("all")
  const [selectedMarksheetUrl, setSelectedMarksheetUrl] = useState<string | null>(null)
  const [isMarksheetOpen, setIsMarksheetOpen] = useState(false)
  const [materialSearchQuery, setMaterialSearchQuery] = useState("")
  const [materialExamFilter, setMaterialExamFilter] = useState("all")
  const [materialBranchFilter, setMaterialBranchFilter] = useState("all")
  const [materialSubjectFilter, setMaterialSubjectFilter] = useState("all")
  const [materialTopicFilter, setMaterialTopicFilter] = useState("all")
  const [materialStatusFilter, setMaterialStatusFilter] = useState("all")
  const [materialTypeFilter, setMaterialTypeFilter] = useState("all")
  const [reportStatusFilter, setReportStatusFilter] = useState("all")
  const [materials, setMaterials] = useState(recentMaterials)
  const [reports, setReports] = useState(mockReports)

  // Material hierarchy data
const materialHierarchy = {
  GATE: {
    CSE: {
      DSA: ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Graphs"],
      DBMS: ["SQL Basics", "Normalization", "Transactions", "Indexing"],
      OS: ["Processes", "Threads", "Scheduling", "Memory Management", "File Systems", "Synchronization"],
      OOPs: [],
    },
    ECE: {
      "Digital Electronics": ["Boolean Algebra", "Combinational Circuits", "Sequential Circuits", "Finite State Machines", "Memory Elements"],
      "Signals & Systems": ["Fourier Transform", "Filtering", "Modulation", "Sampling"],
      "Communication Systems": ["Modulation", "Demodulation", "Bandwidth"],
    },
    ME: {
      Thermodynamics: ["Laws of Thermodynamics", "Heat Transfer", "Entropy", "Cycles"],
    },
    IT: {
      DSA: ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Graphs"],
      DBMS: ["SQL Basics", "Normalization", "Transactions", "Indexing"],
    },
  },
  MAKAUT: {
    CSE: {
      DSA: ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Graphs"],
      DBMS: ["SQL Basics", "Normalization", "Transactions", "Indexing"],
      OS: ["Processes", "Threads", "Scheduling", "Memory Management"],
      OOPs: ["Classes and Objects", "Inheritance", "Polymorphism"],
    },
    IT: {
      DSA: ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Graphs"],
      DBMS: ["SQL Basics", "Normalization", "Transactions", "Indexing"],
    },
  },
  JU: {
    CSE: {
      DSA: ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Graphs"],
      DBMS: ["SQL Basics", "Normalization", "Transactions", "Indexing"],
    },
  },
  CU: {
    ECE: {
      "Communication Systems": ["Modulation", "Sampling", "Filtering"],
    },
  },
}

const exams = ["GATE", "MAKAUT", "JU", "CU"]
const branches: Record<string, string[]> = {
  all: [],
  GATE: ["CSE", "ECE", "ME", "IT"],
  MAKAUT: ["CSE", "IT"],
  JU: ["CSE"],
  CU: ["ECE"],
}
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesVerification = verificationFilter === "all" || user.verificationStatus === verificationFilter
    const matchesAccountStatus = accountStatusFilter === "all" || user.accountStatus === accountStatusFilter

    return matchesSearch && matchesRole && matchesVerification && matchesAccountStatus
  })

  // Filter toppers based on search and approval status
  const filteredToppers = topperApplicationsList.filter((application) => {
    const matchesSearch =
      application.name.toLowerCase().includes(topperSearchQuery.toLowerCase()) ||
      application.email.toLowerCase().includes(topperSearchQuery.toLowerCase())
    const matchesApprovalStatus = topperApprovalFilter === "all" || application.status === topperApprovalFilter

    return matchesSearch && matchesApprovalStatus
  })

  // Get available branches for selected exam
  const availableBranches = materialExamFilter === "all" ? [] : (branches[materialExamFilter] || [])

  // Get available subjects for selected exam and branch
  const availableSubjects = materialExamFilter === "all" || materialBranchFilter === "all" 
    ? [] 
    : Object.keys(materialHierarchy[materialExamFilter as keyof typeof materialHierarchy]?.[materialBranchFilter as keyof typeof materialHierarchy.GATE] || {})

  // Get available topics for selected exam, branch, and subject
  const availableTopics = materialExamFilter === "all" || materialBranchFilter === "all" || materialSubjectFilter === "all"
    ? []
    : materialHierarchy[materialExamFilter as keyof typeof materialHierarchy]?.[materialBranchFilter as keyof typeof materialHierarchy.GATE]?.[materialSubjectFilter as any] || []

  // Handle exam filter change - reset dependent filters
  const handleExamFilterChange = (exam: string) => {
    setMaterialExamFilter(exam)
    setMaterialBranchFilter("all")
    setMaterialSubjectFilter("all")
    setMaterialTopicFilter("all")
  }

  // Handle branch filter change - reset dependent filters
  const handleBranchFilterChange = (branch: string) => {
    setMaterialBranchFilter(branch)
    setMaterialSubjectFilter("all")
    setMaterialTopicFilter("all")
  }

  // Handle subject filter change - reset topic filter
  const handleSubjectFilterChange = (subject: string) => {
    setMaterialSubjectFilter(subject)
    setMaterialTopicFilter("all")
  }
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(materialSearchQuery.toLowerCase()) ||
      material.uploadedBy.toLowerCase().includes(materialSearchQuery.toLowerCase())
    const matchesExam = materialExamFilter === "all" || material.exam === materialExamFilter
    const matchesBranch = materialBranchFilter === "all" || material.branch === materialBranchFilter
    const matchesSubject = materialSubjectFilter === "all" || material.subject === materialSubjectFilter
    const matchesTopic = materialTopicFilter === "all" || material.topic === materialTopicFilter
    const matchesStatus = materialStatusFilter === "all" || material.status === materialStatusFilter
    const matchesType = materialTypeFilter === "all" || material.materialType === materialTypeFilter

    return matchesSearch && matchesExam && matchesBranch && matchesSubject && matchesTopic && matchesStatus && matchesType
  })

  // Filter reports based on status filter
  const filteredReports = reports.filter((report) => {
    const matchesStatus = reportStatusFilter === "all" || report.status === reportStatusFilter
    return matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">View analytics and manage materials, users, toppers, reports, and platform structure.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="toppers">Toppers</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="structure">Structure</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Active Users (Last 7 Days)</p>
                  <p className="text-3xl font-bold">{stats.activeUsers.toLocaleString()}</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Materials</p>
                  <p className="text-3xl font-bold">{stats.totalMaterials.toLocaleString()}</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Eye className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Views / Downloads</p>
                  <p className="text-3xl font-bold">{stats.viewsDownloads.toLocaleString()}</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Medal className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Toppers</p>
                  <p className="text-3xl font-bold">{stats.toppers.toLocaleString()}</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Flag className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Reports</p>
                  <p className="text-3xl font-bold">{stats.reports.toLocaleString()}</p>
                </div>
              </Card>
            </div>

          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <Card>
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold mb-4">Materials Management</h2>
                
                {/* Search Box */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by material title or uploader name"
                      value={materialSearchQuery}
                      onChange={(e) => setMaterialSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Filters Section */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                  {/* Exam Filter */}
                  <select
                    value={materialExamFilter}
                    onChange={(e) => handleExamFilterChange(e.target.value)}
                    className="border border-border rounded-md px-3 py-2 text-sm bg-background"
                  >
                    <option value="all">All Exams</option>
                    {exams.map((exam) => (
                      <option key={exam} value={exam}>{exam}</option>
                    ))}
                  </select>

                  {/* Branch Filter */}
                  <select
                    value={materialBranchFilter}
                    onChange={(e) => handleBranchFilterChange(e.target.value)}
                    className="border border-border rounded-md px-3 py-2 text-sm bg-background"
                    disabled={materialExamFilter === "all"}
                  >
                    <option value="all">All Branches</option>
                    {availableBranches.map((branch) => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>

                  {/* Subject Filter */}
                  <select
                    value={materialSubjectFilter}
                    onChange={(e) => handleSubjectFilterChange(e.target.value)}
                    className="border border-border rounded-md px-3 py-2 text-sm bg-background"
                    disabled={materialBranchFilter === "all"}
                  >
                    <option value="all">All Subjects</option>
                    {availableSubjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>

                  {/* Topic Filter */}
                  <select
                    value={materialTopicFilter}
                    onChange={(e) => setMaterialTopicFilter(e.target.value)}
                    className="border border-border rounded-md px-3 py-2 text-sm bg-background"
                    disabled={materialSubjectFilter === "all"}
                  >
                    <option value="all">All Topics</option>
                    {availableTopics.map((topic) => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>

                  {/* Material Type Filter */}
                  <select
                    value={materialTypeFilter}
                    onChange={(e) => setMaterialTypeFilter(e.target.value)}
                    className="border border-border rounded-md px-3 py-2 text-sm bg-background"
                  >
                    <option value="all">All Materials</option>
                    <option value="Best Material">Best Materials</option>
                    <option value="Topper's Material">Topper's Materials</option>
                    <option value="Teacher's Material">Teacher's Materials</option>
                    <option value="Student's Material">Student's Materials</option>
                  </select>

                  {/* Approval Status Filter */}
                  <select
                    value={materialStatusFilter}
                    onChange={(e) => setMaterialStatusFilter(e.target.value)}
                    className="border border-border rounded-md px-3 py-2 text-sm bg-background"
                  >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead className="text-center">Exam</TableHead>
                      <TableHead className="text-center">Branch</TableHead>
                      <TableHead className="text-center">Subject</TableHead>
                      <TableHead className="text-center">Topic</TableHead>
                      <TableHead className="text-center">Material Type</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Upload Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium max-w-xs truncate">{material.title}</TableCell>
                        <TableCell className="text-center text-muted-foreground text-sm">{material.exam}</TableCell>
                        <TableCell className="text-center text-muted-foreground text-sm font-medium">{material.branch}</TableCell>
                        <TableCell className="text-center text-muted-foreground text-sm">{material.subject}</TableCell>
                        <TableCell className="text-center text-muted-foreground text-sm">{material.topic}</TableCell>
                        <TableCell className="text-center">
                          <select
                            value={material.materialType}
                            onChange={(e) => {
                              setMaterials(
                                materials.map((m) =>
                                  m.id === material.id ? { ...m, materialType: e.target.value } : m
                                )
                              )
                            }}
                            className="text-sm font-medium border-none bg-transparent cursor-pointer px-2 py-1 rounded hover:bg-secondary"
                          >
                            <option value="Best Material">Best Material</option>
                            <option value="Topper's Material">Topper's Material</option>
                            <option value="Teacher's Material">Teacher's Material</option>
                            <option value="Student's Material">Student's Material</option>
                          </select>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          <span className="flex items-center gap-1.5">
                            {material.uploadedBy}
                            {material.isTeacher && (
                              <GraduationCap className="h-4 w-4 text-blue-500" />
                            )}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <select
                            value={material.status}
                            onChange={(e) => {
                              setMaterials(
                                materials.map((m) =>
                                  m.id === material.id ? { ...m, status: e.target.value as "approved" | "pending" | "rejected" } : m
                                )
                              )
                            }}
                            className="text-sm font-medium border-none bg-transparent cursor-pointer px-2 py-1 rounded hover:bg-secondary"
                          >
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground text-sm">{new Date(material.uploadDate).toLocaleDateString('en-GB')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold mb-6">User Management</h2>

                {/* Filter Bar */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or email"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Role Filter */}
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="border border-border rounded-md px-3 py-2 text-sm bg-background"
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>

                  {/* Verification Status Filter */}
                  <select
                    value={verificationFilter}
                    onChange={(e) => setVerificationFilter(e.target.value)}
                    className="border border-border rounded-md px-3 py-2 text-sm bg-background"
                  >
                    <option value="all">All Verification Status</option>
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  {/* Account Status Filter */}
                  <select
                    value={accountStatusFilter}
                    onChange={(e) => setAccountStatusFilter(e.target.value)}
                    className="border border-border rounded-md px-3 py-2 text-sm bg-background"
                  >
                    <option value="all">All Account Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-center">Role</TableHead>
                      <TableHead className="text-center">Verification</TableHead>
                      <TableHead className="text-center">Materials Uploaded</TableHead>
                      <TableHead>Joined Date</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Profiles</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <span className="flex items-center gap-1.5">
                            {user.name}
                            {user.role === "teacher" && (
                              <GraduationCap className="h-4 w-4 text-blue-500" />
                            )}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{user.email}</TableCell>
                        
                        {/* Role Dropdown */}
                        <TableCell className="text-center">
                          <select
                            defaultValue={user.role}
                            className="text-sm font-medium border-none bg-transparent cursor-pointer px-2 py-1 rounded hover:bg-secondary"
                          >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                          </select>
                        </TableCell>

                        {/* Verification Dropdown */}
                        <TableCell className="text-center">
                          <select
                            defaultValue={user.verificationStatus}
                            className="text-sm font-medium border-none bg-transparent cursor-pointer px-2 py-1 rounded hover:bg-secondary"
                          >
                            <option value="pending">Pending</option>
                            <option value="verified">Verified</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </TableCell>

                        <TableCell className="text-center text-muted-foreground text-sm">{user.materialsUploaded}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{new Date(user.joinedDate).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}</TableCell>

                        {/* Status Dropdown */}
                        <TableCell className="text-center">
                          <select
                            defaultValue={user.accountStatus}
                            className="text-sm font-medium border-none bg-transparent cursor-pointer px-2 py-1 rounded hover:bg-secondary"
                          >
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                          </select>
                        </TableCell>

                        {/* Profiles Column */}
                        <TableCell className="text-center">
                          <div className="flex items-center justify-start gap-2 pl-4">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="p-1 hover:bg-secondary rounded-md transition-colors">
                                    <BookOpen className="h-5 w-5 text-primary" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View PeerPrep profile</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            {user.role === "teacher" && (
                              <>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button className="p-1 hover:bg-secondary rounded-md transition-colors">
                                        <Image src="/linkedin.svg" alt="LinkedIn" width={20} height={20} />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>View LinkedIn profile</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button className="p-1 hover:bg-secondary rounded-md transition-colors">
                                        <Image src="/researchgate.svg" alt="ResearchGate" width={20} height={20} />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>View ResearchGate profile</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Toppers Tab */}
          <TabsContent value="toppers" className="space-y-6">
            <Card>
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold mb-4">Topper Badge Applications</h2>
                
                {/* Search and Filter */}
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by name or email"
                      value={topperSearchQuery}
                      onChange={(e) => setTopperSearchQuery(e.target.value)}
                      className="h-9"
                    />
                  </div>
                  
                  <div className="w-48">
                    <select
                      value={topperApprovalFilter}
                      onChange={(e) => setTopperApprovalFilter(e.target.value)}
                      className="w-full h-9 px-3 rounded border border-input bg-background text-sm font-medium"
                    >
                      <option value="all">All Approval Status</option>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-center">Subject</TableHead>
                      <TableHead className="text-center">Exam</TableHead>
                      <TableHead className="text-center">Branch</TableHead>
                      <TableHead className="text-center">Year</TableHead>
                      <TableHead className="text-center">CGPA</TableHead>
                      <TableHead className="text-center">Marksheet</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredToppers.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.name}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{application.email}</TableCell>
                        <TableCell className="text-center text-muted-foreground text-sm">{application.subject}</TableCell>
                        <TableCell className="text-center text-muted-foreground text-sm">{application.exam}</TableCell>
                        <TableCell className="text-center text-muted-foreground text-sm font-medium">{application.branch}</TableCell>
                        <TableCell className="text-center text-muted-foreground text-sm">{application.year}</TableCell>
                        <TableCell className="text-center text-muted-foreground text-sm">{application.cgpa}</TableCell>
                        <TableCell className="text-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setSelectedMarksheetUrl(application.marksheetUrl)
                                    setIsMarksheetOpen(true)
                                  }}
                                  className="h-5 w-5 p-0"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View Marksheet</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-center">
                          <select
                            value={application.status}
                            onChange={(e) => {
                              const updated = topperApplicationsList.map((app) =>
                                app.id === application.id ? { ...app, status: e.target.value as "pending" | "approved" | "rejected" } : app
                              )
                              setTopperApplicationsList(updated)
                            }}
                            className="text-sm font-medium border-none bg-transparent cursor-pointer px-2 py-1 rounded hover:bg-secondary"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold mb-4">Report Management</h2>
                
                {/* Filter */}
                <div className="w-48">
                  <select
                    value={reportStatusFilter}
                    onChange={(e) => setReportStatusFilter(e.target.value)}
                    className="w-full h-9 px-3 rounded border border-input bg-background text-sm font-medium"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="dismissed">Dismissed</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material Title</TableHead>
                      <TableHead>Reported By</TableHead>
                      <TableHead className="text-center">Reason</TableHead>
                      <TableHead>Comment</TableHead>
                      <TableHead>Material Uploader</TableHead>
                      <TableHead className="text-center">Date Reported</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium text-sm">{report.materialTitle}</TableCell>
                        <TableCell className="text-sm">
                          <div className="flex items-center gap-2">
                            <span>{report.reportedBy}</span>
                            {report.isTeacher && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <GraduationCap className="h-4 w-4 text-blue-500" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Teacher</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground text-sm">{report.reason}</TableCell>
                        <TableCell className="text-muted-foreground text-sm max-w-xs truncate">{report.comment || "-"}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{report.materialUploader}</TableCell>
                        <TableCell className="text-center text-muted-foreground text-sm">
                          {new Date(report.dateReported).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                        </TableCell>
                        <TableCell className="text-center">
                          <select
                            value={report.status}
                            onChange={(e) => {
                              setReports(
                                reports.map((r) =>
                                  r.id === report.id ? { ...r, status: e.target.value as "pending" | "reviewed" | "dismissed" } : r
                                )
                              )
                            }}
                            className="text-sm font-medium border-none bg-transparent cursor-pointer px-2 py-1 rounded hover:bg-secondary"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="dismissed">Dismissed</option>
                          </select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Structure Tab */}
          <TabsContent value="structure" className="space-y-6">
            <Card>
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-semibold">Platform Structure</h2>
                <Button size="sm" id="add-exam-btn">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Exam
                </Button>
              </div>
              <div className="p-6">
                <HierarchyTree
                  exams={hierarchy}
                />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Marksheet Viewer Modal */}
        <MarksheetViewerModal
          isOpen={isMarksheetOpen}
          onClose={() => setIsMarksheetOpen(false)}
          marksheetUrl={selectedMarksheetUrl || undefined}
        />
      </div>
    </div>
  )
}
