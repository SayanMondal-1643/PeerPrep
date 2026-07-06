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

// MOCK DATA - to be removed
const mockMaterials: Array<{
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  uploadDate: string;
  status: string;
  userId: { _id: string; name: string; role: string };
  topicId: string;
  isBestMaterial: boolean;
  isTopperMaterial: boolean;
  isAIPicked: boolean;
  ratingsAverage: number;
  ratingsQuantity: number;
}> = [
  {
    _id: "665f1a2b3c4d5e6f7a8b9c0d",
    title: "Arrays - Basics and Operations",
    description: "Covers array declaration, traversal, insertion, and deletion",
    fileUrl: "https://cdn.example.com/files/array-basics.pdf",
    uploadDate: "2026-06-15T10:30:00.000Z",
    status: "approved",
    userId: {
      _id: "665e0a1b2c3d4e5f6a7b8c9d",
      name: "Ananya Roy",
      role: "teacher",
    },
    topicId: "665d9f8e7c6b5a4938271605",
    isBestMaterial: true,
    isAIPicked: false,
    isTopperMaterial: false,
    ratingsAverage: 4.7,
    ratingsQuantity: 132,
  },
  {
    _id: "665f1a2b3c4d5e6f7a8b9c1e",
    title: "Two Pointer Technique on Arrays",
    description: "Solving array problems using two pointers with examples",
    fileUrl: "https://cdn.example.com/files/array-two-pointer.pdf",
    uploadDate: "2026-06-18T09:15:00.000Z",
    status: "approved",
    userId: {
      _id: "665e0a1b2c3d4e5f6a7b8c1a",
      name: "Riya Sen",
      role: "student",
    },
    topicId: "665d9f8e7c6b5a4938271605",
    isBestMaterial: false,
    isAIPicked: false,
    isTopperMaterial: true,
    ratingsAverage: 4.2,
    ratingsQuantity: 18,
  },
  {
    _id: "665f1a2b3c4d5e6f7a8b9c2f",
    title: "Array Sorting Algorithms - Quick Revision",
    description: "Summary sheet covering bubble, selection, and merge sort",
    fileUrl: "https://cdn.example.com/files/array-sorting-revision.pdf",
    uploadDate: "2026-06-20T14:45:00.000Z",
    status: "approved",
    userId: {
      _id: "665e0a1b2c3d4e5f6a7b8c2b",
      name: "Sourav Ghosh",
      role: "student",
    },
    topicId: "665d9f8e7c6b5a4938271605",
    isBestMaterial: false,
    isAIPicked: true,
    isTopperMaterial: false,
    ratingsAverage: 0,
    ratingsQuantity: 2,
  },
  {
    _id: "665f1a2b3c4d5e6f7a8b9c3a",
    title: "Multidimensional Arrays - Notes",
    description: "2D and 3D array representation with diagrams",
    fileUrl: "https://cdn.example.com/files/array-multidimensional.pdf",
    uploadDate: "2026-06-22T11:00:00.000Z",
    status: "pending",
    userId: {
      _id: "665e0a1b2c3d4e5f6a7b8c3c",
      name: "Meghna Das",
      role: "teacher",
    },
    topicId: "665d9f8e7c6b5a4938271605",
    isBestMaterial: false,
    isAIPicked: false,
    isTopperMaterial: false,
    ratingsAverage: 0,
    ratingsQuantity: 0,
  },
  {
    _id: "665f1a2b3c4d5e6f7a8b9c4b",
    title: "Array-Based Sliding Window Problems",
    description: "Concepts and solved problems using sliding window on arrays",
    fileUrl: "https://cdn.example.com/files/array-sliding-window.pdf",
    uploadDate: "2026-06-25T16:30:00.000Z",
    status: "approved",
    userId: {
      _id: "665e0a1b2c3d4e5f6a7b8c4d",
      name: "Arjun Mehta",
      role: "student",
    },
    topicId: "665d9f8e7c6b5a4938271605",
    isBestMaterial: true,
    isAIPicked: false,
    isTopperMaterial: true,
    ratingsAverage: 4.9,
    ratingsQuantity: 210,
  },
];

interface Params {
  params: Promise<{
    examId: string;
    branchId: string;
    subjectId: string;
    topicId: string;
  }>;
}

export default async function MaterialsPage({ params }: Params) {
  const { examId, branchId, subjectId, topicId } = await params;
  // UNCOMMENT THE LINE TO FETCH FROM API:
  // const topics = await fetchTopics();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {/* <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: examName, href: `/exams/${examId}/branches` },
            { label: branchName, href: `/exams/${examId}/${branchId}` },
            {
              label: subjectName,
              href: `/exams/${examId}/${branchId}/${subjectId}`,
            },
            {
              label: topicName,
              href: `/exams/${examId}/${branchId}/${subjectId}/${topicId}`,
            },
          ]}
        /> */}

        <div>
          <div className="mb-8">
            {/* <h1 className="text-3xl font-bold mb-2">{topicName}</h1> */}
            <p className="text-muted-foreground">
              Browse and download study materials. Rate materials to help fellow
              students find the best content.
            </p>
          </div>

          {/* Materials List */}
          <div className="space-y-4">
            {/* USE materials INSTEAD OF mockMaterials WHEN FETCHING FROM API */}
            {mockMaterials.map((material) => {
              // const userRating = userRatings[material._id] || 0;

              return (
                <div
                  key={material._id}
                  className="relative rounded-lg border p-6 transition-shadow hover:shadow-lg"
                >
                  <Link
                    href={`/exams/${examId}/${branchId}/${subjectId}/${topicId}/${material._id}`}
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
