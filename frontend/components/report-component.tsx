"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReportMaterial } from "@/lib/hooks/use-reports";

interface ReportComponentProps {
  materialId: string;
  isLoggedIn: boolean;
}

export function ReportComponent({
  materialId,
  isLoggedIn,
}: ReportComponentProps) {
  const [reportReason, setReportReason] = useState("");
  const [reportComment, setReportComment] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reportMaterial = useReportMaterial();

  const handleSubmitReport = async () => {
    setIsSubmitting(true);

    if (!reportReason) {
      alert("Please select a reason for the report");
      setIsSubmitting(false);
      return;
    }

    try {
      await reportMaterial.mutateAsync({
        materialId,
        reportReason,
        comment: reportComment || undefined,
      });
    } catch {
      return;
    } finally {
      setIsSubmitting(false);
    }

    setReportSubmitted(true);
    setTimeout(() => {
      setReportReason("");
      setReportComment("");
      setReportSubmitted(false);
    }, 3000);
  };

  return isLoggedIn ? (
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
          <label className="block text-sm font-medium mb-2">Reason</label>
          <select
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
          >
            <option value="">Select a reason...</option>
            <option value="plagiarism">Plagiarism</option>
            <option value="incorrect-content">Incorrect Content</option>
            <option value="spam">Spam</option>
            <option value="inappropriate-content">Inappropriate Content</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Comment Text Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Comment</label>
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
          disabled={isSubmitting}
          className="w-full bg-destructive text-white cursor-pointer hover:bg-destructive/90 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Report"
          )}
        </Button>
      </div>
    )
  ) : (
    <div className="p-4 bg-muted rounded-lg text-center">
      <p className="text-sm text-muted-foreground">
        Log in to report this material.
      </p>
    </div>
  );
}
