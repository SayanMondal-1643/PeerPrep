"use client";

import { ChevronDown, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useMemo, useState } from "react";
import { useReports, useUpdateReportStatus } from "@/lib/hooks/use-reports";
import { Report } from "@/lib/report-types";

export default function ReportsTab() {
  const { data, isLoading, isError, refetch } = useReports();
  const updateReportStatus = useUpdateReportStatus();

  const [statusFilter, setStatusFilter] = useState("all");
  const [rowErrors, setRowErrors] = useState<Record<string, string>>({});

  const reports = data?.data ?? [];

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      return statusFilter === "all" || report.status === statusFilter;
    });
  }, [reports, statusFilter]);

  const updateStatus = async (report: Report, nextStatus: Report["status"]) => {
    setRowErrors((prev) => ({ ...prev, [report._id]: "" }));

    try {
      await updateReportStatus.mutateAsync({
        reportId: report._id,
        status: nextStatus,
      });
    } catch {
      setRowErrors((prev) => ({
        ...prev,
        [report._id]: "Unable to update report status.",
      }));
    }
  };

  if (isLoading) {
    return (
      <Card>
        <div className="p-6 space-y-4">
          <div className="h-6 w-40 animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded bg-muted" />
          <div className="space-y-2">
            <div className="h-10 animate-pulse rounded bg-muted" />
            <div className="h-10 animate-pulse rounded bg-muted" />
            <div className="h-10 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Report Management</h2>
          <p className="text-sm text-red-600">Unable to load reports.</p>
          <Button onClick={() => void refetch()}>Retry</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold mb-4">Report Management</h2>

        <div className="w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-9 px-3 rounded border border-input bg-background text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
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
              <TableHead className="text-center">Comment</TableHead>
              <TableHead className="text-center">Date Reported</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => {
              const isPendingStatus =
                updateReportStatus.isPending &&
                updateReportStatus.variables?.reportId === report._id;
              const errorMessage = rowErrors[report._id];

              return (
                <TableRow key={report._id}>
                  <TableCell className="font-medium text-sm">
                    <Link
                      href={`/materials/${report.materialId}`}
                      className="block truncate text-primary hover:underline"
                      title={report.materialTitle}
                    >
                      {report.materialTitle}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/profile/${report.reporterId._id}`}
                        className="text-primary hover:underline"
                      >
                        {report.reporterId.name}
                      </Link>

                      {report.reporterId.role === "teacher" &&
                        report.reporterId.verificationStatus === "verified" && (
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
                    {report.reportReason}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-xs">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="block truncate">
                            {report.comment || "-"}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs whitespace-pre-wrap">
                            {report.comment || "-"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground text-sm">
                    {new Date(report.reportDate).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center justify-center gap-1">
                      {report.status === "pending" ? (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-3 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:cursor-pointer"
                            disabled={isPendingStatus}
                            onClick={() =>
                              void updateStatus(report, "resolved")
                            }
                          >
                            Resolve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-3 border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:cursor-pointer"
                            disabled={isPendingStatus}
                            onClick={() =>
                              void updateStatus(report, "rejected")
                            }
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1">
                          <Badge
                            variant="outline"
                            className={
                              report.status === "resolved"
                                ? "border-green-200 bg-green-100 text-green-700"
                                : "border-red-200 bg-red-100 text-red-700"
                            }
                          >
                            {report.status === "resolved"
                              ? "Resolved"
                              : "Rejected"}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6"
                                disabled={isPendingStatus}
                                aria-label={`Change status for ${report.reporterId.name}`}
                              >
                                <ChevronDown className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onSelect={() =>
                                  void updateStatus(report, "pending")
                                }
                              >
                                Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={() =>
                                  void updateStatus(report, "resolved")
                                }
                              >
                                Resolved
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={() =>
                                  void updateStatus(report, "rejected")
                                }
                              >
                                Rejected
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                      {errorMessage ? (
                        <p className="text-xs text-red-600">{errorMessage}</p>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
