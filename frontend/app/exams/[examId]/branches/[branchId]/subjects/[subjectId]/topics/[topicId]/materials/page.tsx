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
import {
  mockMaterialsResponse1,
  mockMaterialsResponse2,
} from "@/lib/mock-data";

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

  const mockMaterialsResponse =
    topicId === "2" ? mockMaterialsResponse1 : mockMaterialsResponse2;
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
            /* USE `data` INSTEAD OF `mockMaterialsResponse` WHEN FETCHING FROM API */
            {
              label: mockMaterialsResponse.exam,
              href: `/exams/${examId}/branches`,
            },
            {
              label: mockMaterialsResponse.branch,
              href: `/exams/${examId}/branches/${branchId}/subjects`,
            },
            {
              label: mockMaterialsResponse.subject,
              href: `/exams/${examId}/branches/${branchId}/subjects/${subjectId}/topics`,
            },
            {
              label: mockMaterialsResponse.topic,
              href: `/exams/${examId}/branches/${branchId}/subjects/${subjectId}/topics/${topicId}/materials`,
            },
          ]}
        />

        <div>
          <div className="mb-8">
            {/* USE 'data' INSTEAD OF 'mockMaterialsResponse' WHEN FETCHING FROM API */}
            <h1 className="text-3xl font-bold mb-2">
              {mockMaterialsResponse.topic}
            </h1>
            <p className="text-muted-foreground">
              View and download study materials. Rate, comment, and report to
              help the community find trustworthy content.
            </p>
          </div>

          {/* Materials List */}
          <div className="space-y-4">
            {/* USE 'data' INSTEAD OF 'mockMaterialsResponse' WHEN FETCHING FROM API */}
            {mockMaterialsResponse.data.map((material) => {
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
                          {/* <span className="text-muted-foreground">•</span> */}
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
