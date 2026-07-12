"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RatingComponent } from "@/components/rating-component";
import { CommentSection } from "@/components/comment-section";
import { useAuth } from "@/lib/auth-context";
import { mockMaterialResponse } from "@/lib/mock-data";

interface MaterialViewerPageProps {
  params: Promise<{
    examId: string;
    branchId: string;
    subjectId: string;
    topicId: string;
    materialId: string;
  }>;
}

export default async function MaterialViewerPage({
  params,
}: MaterialViewerPageProps) {
  const { examId, branchId, subjectId, topicId } = await params;
  const material = mockMaterialResponse.data;
  const backUrl = `/exams/${examId}/${branchId}/${subjectId}/${topicId}`;

  return <MaterialViewerContent material={material} backUrl={backUrl} />;
}

function MaterialViewerContent({
  material,
  backUrl,
}: {
  material: typeof mockMaterialResponse.data;
  backUrl: string;
}) {
  const { isLoggedIn } = useAuth();
  const [reportReason, setReportReason] = useState("");
  const [reportComment, setReportComment] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleSubmitReport = () => {
    if (!reportReason) {
      alert("Please select a reason for the report");
      return;
    }
    console.log("[v0] Report submitted:", {
      materialId: material._id,
      reason: reportReason,
      comment: reportComment,
    });
    setReportSubmitted(true);
    setTimeout(() => {
      setReportReason("");
      setReportComment("");
      setReportSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href={backUrl} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">{material.title}</h1>
            <p className="text-sm text-muted-foreground">
              By {material.userId.name}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white border border-border rounded-lg mb-8 overflow-hidden">
          <div className="h-150 border-b border-border">
            <div className="p-0">
              <iframe
                src={material.fileUrl}
                className="w-full h-[600px]"
                title={material.title}
              />
              <p className="p-4 text-sm text-muted-foreground">
                Having trouble viewing?{" "}
                <a
                  href={material.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Open in a new tab
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Material Info */}
          <section className="border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">About this material</h2>
            <p className="text-muted-foreground mb-6">{material.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Rating:</span>
                <span className="font-medium">
                  {material.ratingsAverage.toFixed(1)}
                </span>
                <span className="text-muted-foreground">
                  ({material.ratingsQuantity} ratings)
                </span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                Uploaded:{" "}
                {new Date(material.uploadDate).toLocaleDateString("en-GB")}
              </span>
            </div>
          </section>

          {/* Rating Section */}
          <section className="border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Rate this material</h3>
            {isLoggedIn ? (
              <RatingComponent materialId={material._id} currentRating={0} />
            ) : (
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  Log in to rate this material.
                </p>
              </div>
            )}
          </section>

          {/* Report Section */}
          <section className="border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Report this material</h3>
            {isLoggedIn ? (
              reportSubmitted ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-sm text-green-800">
                    Thank you for your report. We'll review it shortly.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Reason Dropdown */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Reason
                    </label>
                    <select
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      <option value="">Select a reason...</option>
                      <option value="plagiarism">Plagiarism</option>
                      <option value="incorrect-content">
                        Incorrect Content
                      </option>
                      <option value="spam">Spam</option>
                      <option value="inappropriate-content">
                        Inappropriate Content
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Comment Text Input */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Comment
                    </label>
                    <textarea
                      value={reportComment}
                      onChange={(e) => setReportComment(e.target.value)}
                      placeholder="Briefly explain the issue (optional)"
                      className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                      rows={4}
                    />
                  </div>

                  {/* Submit Report Button */}
                  <Button
                    onClick={handleSubmitReport}
                    className="w-full bg-destructive hover:bg-destructive/90 text-white"
                  >
                    Submit Report
                  </Button>
                </div>
              )
            ) : (
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  Log in to report this material.
                </p>
              </div>
            )}
          </section>

          {/* Comment Section */}
          <section className="border border-border rounded-lg p-6">
            <CommentSection materialId={material._id} isLoggedIn={isLoggedIn} />
          </section>
        </div>
      </div>
    </div>
  );
}
