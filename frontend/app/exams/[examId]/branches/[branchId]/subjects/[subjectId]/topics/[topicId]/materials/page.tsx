import Link from "next/link";
import {
  Star,
  Trophy,
  FileText,
  GraduationCap,
  Medal,
  Bot,
} from "lucide-react";
import { MaterialDownloadButton } from "@/components/material-download-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// UNCOMMENT THE CODE BELOW TO FETCH FROM API:
// async function fetchMaterials(topicId: string) {
//   try {
//     const response = await fetch(`http://localhost:5000/api/v1/topics/${topicId}/materials`);
//     const result = await response.json()
//     if (result.status === "success") {
//       return result
//     }
//   } catch (error) {
//     console.error("Failed to fetch materials:", error)
//   }
// return null;
// }

interface UploaderInfo {
  _id: string;
  name: string;
  role: "student" | "teacher";
}

interface Material {
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

interface MaterialsResponse {
  status: string;
  exam: string;
  branch: string;
  subject: string;
  topic: string;
  results: number;
  materials: Material[];
}

interface Params {
  params: Promise<{
    examId: string;
    branchId: string;
    subjectId: string;
    topicId: string;
  }>;
}

// MOCK DATA - TO BE REMOVED
const mockData: MaterialsResponse = {
  status: "success",
  exam: "MAKAUT",
  branch: "Computer Science Engineering",
  subject: "Data Structures & Algorithms",
  topic: "Array",
  results: 5,
  materials: [
    {
      _id: "1",
      title: "Complete Array Problems Guide",
      description:
        "A concise guide covering essential array concepts, searching techniques, and problem-solving patterns commonly used in MAKAUT Data Structures exams.",
      fileUrl: "https://example.com/file1.pdf",
      uploadDate: "2026-06-05",
      status: "approved",
      userId: { _id: "1", name: "Sayan Mondal", role: "student" },
      topicId: "1",
      isBestMaterial: false,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 4.8,
      ratingsQuantity: 245,
    },
    {
      _id: "2",
      title: "Array Rotation and Sliding Window Notes",
      description:
        "Handwritten notes covering array rotation techniques and the sliding window pattern with worked examples.",
      fileUrl: "https://example.com/file2.pdf",
      uploadDate: "2026-06-08",
      status: "approved",
      userId: { _id: "2", name: "Runa Mukherjee", role: "teacher" },
      topicId: "1",
      isBestMaterial: true,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 4.9,
      ratingsQuantity: 312,
    },
    {
      _id: "3",
      title: "Two Pointer Technique Cheat Sheet",
      description:
        "Quick reference sheet summarizing two-pointer approaches for common array problems.",
      fileUrl: "https://example.com/file3.pdf",
      uploadDate: "2026-06-10",
      status: "approved",
      userId: { _id: "1", name: "Sayan Mondal", role: "student" },
      topicId: "1",
      isBestMaterial: false,
      isTopperMaterial: true,
      isAIPicked: false,
      ratingsAverage: 4.6,
      ratingsQuantity: 98,
    },
    {
      _id: "4",
      title: "Prefix Sum and Difference Array Explained",
      description:
        "Step-by-step explanation of prefix sum and difference array techniques with diagrams.",
      fileUrl: "https://example.com/file4.pdf",
      uploadDate: "2026-06-14",
      status: "approved",
      userId: { _id: "3", name: "Arka Das", role: "teacher" },
      topicId: "1",
      isBestMaterial: false,
      isTopperMaterial: false,
      isAIPicked: true,
      ratingsAverage: 4.2,
      ratingsQuantity: 41,
    },
    {
      _id: "5",
      title: "Array Problem Set - MAKAUT Previous Years",
      description:
        "Compilation of array-related questions from past MAKAUT semester exams with solutions.",
      fileUrl: "https://example.com/file5.pdf",
      uploadDate: "2026-06-16",
      status: "pending",
      userId: { _id: "2", name: "Runa Mukherjee", role: "teacher" },
      topicId: "1",
      isBestMaterial: false,
      isTopperMaterial: false,
      isAIPicked: false,
      ratingsAverage: 0,
      ratingsQuantity: 0,
    },
  ],
};

export default async function MaterialsPage({ params }: Params) {
  const { examId, branchId, subjectId, topicId } = await params;
  // UNCOMMENT THE LINE TO FETCH FROM API:
  // const data = await fetchMaterials(topicId);

  // if (!data) return <p>Failed to load materials.</p>;
  // if (data.materials.length === 0) return <p>No materials found.</p>;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Exams", href: "/exams" },
            /* USE `data` INSTEAD OF `mockData` WHEN FETCHING FROM API */
            { label: mockData.exam, href: `/exams/${examId}/branches` },
            {
              label: mockData.branch,
              href: `/exams/${examId}/branches/${branchId}/subjects`,
            },
            {
              label: mockData.subject,
              href: `/exams/${examId}/branches/${branchId}/subjects/${subjectId}/topics`,
            },
            {
              label: mockData.topic,
              href: `/exams/${examId}/branches/${branchId}/subjects/${subjectId}/topics/${topicId}/materials`,
            },
          ]}
        />

        <div>
          <div className="mb-8">
            {/* USE 'data' INSTEAD OF 'mockData' WHEN FETCHING FROM API */}
            <h1 className="text-3xl font-bold mb-2">{mockData.topic}</h1>
            <p className="text-muted-foreground">
              Browse and download study materials. Rate materials to help fellow
              students find the best content.
            </p>
          </div>

          {/* Materials List */}
          <div className="space-y-4">
            {/* USE 'data' INSTEAD OF 'mockData' WHEN FETCHING FROM API */}
            {mockData.materials.map((material) => {
              // const userRating = userRatings[material._id] || 0;

              return (
                <div
                  key={material._id}
                  className="relative rounded-lg border p-6 transition-shadow hover:shadow-lg"
                >
                  <Link
                    href={`/exams/${examId}/branches/${branchId}/subjects/${subjectId}/topics/${topicId}/materials/${material._id}`}
                    className="block"
                  >
                    <div className="flex items-start gap-4 pr-24">
                      <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold">
                                {material.title}
                              </h3>
                              {material.isBestMaterial && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Trophy className="h-4 w-4 text-amber-500" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Best Material</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                              {material.isTopperMaterial && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Medal className="h-4 w-4 text-yellow-600" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Topper's Material</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                              {material.isAIPicked && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Bot className="h-4 w-4 text-purple-600 cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>AI Pick</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {material.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <div
                                  key={star}
                                  className="flex items-center justify-center"
                                >
                                  <Star
                                    className={`h-4 w-4 transition-colors ${
                                      star <= material.ratingsAverage
                                        ? "fill-primary text-primary"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                </div>
                              ))}
                            </div>
                            <span className="font-medium">
                              {material.ratingsAverage.toFixed(1)}
                            </span>
                            <span className="text-muted-foreground">
                              ({material.ratingsQuantity} ratings)
                            </span>
                          </div>
                          <span className="text-muted-foreground">•</span>
                          {/* <span className="text-muted-foreground">
                            {material.fileType}
                          </span> */}
                          <span className="text-muted-foreground">•</span>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">
                              By {material.userId.name}
                            </span>
                            {material.userId.role === "teacher" && (
                              <GraduationCap className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="absolute right-6 top-6">
                    <MaterialDownloadButton href={material.fileUrl} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
