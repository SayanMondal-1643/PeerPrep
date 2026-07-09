"use client";

import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Dispatch, type SetStateAction } from "react";

interface Report {
  id: string;
  materialTitle: string;
  reportedBy: string;
  isTeacher: boolean;
  reason: string;
  comment: string;
  materialUploader: string;
  dateReported: string;
  status: string;
}

interface ReportsTabProps {
  filteredReports: Report[];
  reportStatusFilter: string;
  setReportStatusFilter: (value: string) => void;
  reports: Report[];
  setReports: Dispatch<SetStateAction<Report[]>>;
}

export default function ReportsTab({
  filteredReports,
  reportStatusFilter,
  setReportStatusFilter,
  reports,
  setReports,
}: ReportsTabProps) {
  return (
    <Card>
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold mb-4">Report Management</h2>

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
                <TableCell className="font-medium text-sm">
                  {report.materialTitle}
                </TableCell>
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
                <TableCell className="text-center text-muted-foreground text-sm">
                  {report.reason}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm max-w-xs truncate">
                  {report.comment || "-"}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {report.materialUploader}
                </TableCell>
                <TableCell className="text-center text-muted-foreground text-sm">
                  {new Date(report.dateReported).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  <select
                    value={report.status}
                    onChange={(e) => {
                      setReports(
                        reports.map((r) =>
                          r.id === report.id
                            ? {
                                ...r,
                                status: e.target.value as
                                  | "pending"
                                  | "reviewed"
                                  | "dismissed",
                              }
                            : r,
                        ),
                      );
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
  );
}
