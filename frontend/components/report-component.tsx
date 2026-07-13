"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ReportComponentProps {
  materialId: string;
  isLoggedIn: boolean;
}

interface ReportResponse {
  status: string;
  message: string;
}

export function ReportComponent({
  materialId,
  isLoggedIn,
}: ReportComponentProps) {
  const [reportReason, setReportReason] = useState("");
  const [reportComment, setReportComment] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleSubmitReport = async () => {
    if (!reportReason) {
      alert("Please select a reason for the report");
      return;
    }

    // UNCOMMENT TO FETCH FROM API
    // try {
    //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/materials/${materialId}/reports`, {
    //     method: "POST",
    //     credentials: "include",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ reportReason, comment: reportComment }),
    //   });
    //   const json: ReportResponse = await res.json();
    //   if (json.status !== "success") throw new Error("Failed to submit report");
    // } catch (err) {
    //   return;
    // }

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
  );
}
