"use client";

import Link from "next/link";
import { ChevronDown, Eye, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { useEffect, useMemo, useState } from "react";
import { mockToppersResponse } from "@/lib/mock-data";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

interface Topper {
  _id: string;
  userId: string;
  userName: string;
  subject: string;
  exam: string;
  branch: string;
  year: number;
  cgpa: number;
  markSheetUrl: string;
  status: string;
}

interface ApiToppersResponse {
  status: string;
  results: number;
  data: Topper[];
}

export default function ToppersTab() {
  const [toppersList, setToppersList] = useState<Topper[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [approvalFilter, setApprovalFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingStatusIds, setPendingStatusIds] = useState<
    Record<string, boolean>
  >({});
  const [rowErrors, setRowErrors] = useState<Record<string, string>>({});

  const loadTopperApplications = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 500));

      // UNCOMMENT TO FETCH FROM API
      // const response = await fetch(`${API_BASE_URL}/api/v1/topperBadgeApplications`);
      // if (!response.ok) {
      //   throw new Error("Failed to load topper applications.");
      // }
      // const json: ApiToppersResponse = await response.json();

      // MOCK DATA - TO BE REMOVED WHEN FETCHING FROM API
      const json: ApiToppersResponse = mockToppersResponse;

      setToppersList(json.data);
    } catch (error) {
      console.error("Failed to fetch topper applications:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load topper applications.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadTopperApplications();
  }, []);

  const filteredToppers = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase();

    return toppersList.filter((application) => {
      const matchesSearch = application.userName
        .toLowerCase()
        .includes(normalizedQuery);
      const matchesStatus =
        approvalFilter === "all" || application.status === approvalFilter;

      return matchesSearch && matchesStatus;
    });
  }, [toppersList, searchQuery, approvalFilter]);

  const updateStatus = async (
    application: Topper,
    nextStatus: Topper["status"],
  ) => {
    const previousStatus = application.status;

    setToppersList((prev) =>
      prev.map((item) =>
        item._id === application._id ? { ...item, status: nextStatus } : item,
      ),
    );
    setPendingStatusIds((prev) => ({ ...prev, [application._id]: true }));
    setRowErrors((prev) => ({ ...prev, [application._id]: "" }));

    try {
      // UNCOMMENT TO PATCH API
      // const response = await fetch(`${API_BASE_URL}/api/v1/topperBadgeApplications/${application._id}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ status: nextStatus }),
      // });
      // if (!response.ok) {
      //   throw new Error("Failed to update status.");
      // }
    } catch {
      setToppersList((prev) =>
        prev.map((item) =>
          item._id === application._id
            ? { ...item, status: previousStatus }
            : item,
        ),
      );
      setRowErrors((prev) => ({
        ...prev,
        [application._id]: "Unable to update status.",
      }));
    } finally {
      setPendingStatusIds((prev) => ({ ...prev, [application._id]: false }));
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

  if (error) {
    return (
      <Card>
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Topper Badge Applications</h2>
          <p className="text-sm text-red-600">{error}</p>
          <Button onClick={() => void loadTopperApplications()}>Retry</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="border-b border-border p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Topper Badge Applications
        </h2>

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={approvalFilter}
            onChange={(e) => setApprovalFilter(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        {filteredToppers.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">
            No topper applications found.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
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
              {filteredToppers.map((application) => {
                const isPendingStatus = Boolean(
                  pendingStatusIds[application._id],
                );
                const errorMessage = rowErrors[application._id];

                return (
                  <TableRow key={application._id}>
                    <TableCell className="font-medium text-primary">
                      <Link
                        href={`/profile/${application.userId}`}
                        className="inline-flex items-center gap-1.5 hover:underline"
                      >
                        <span>{application.userName}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground">
                      {application.subject}
                    </TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground">
                      {application.exam}
                    </TableCell>
                    <TableCell className="text-center text-sm font-medium text-muted-foreground">
                      {application.branch}
                    </TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground">
                      {application.year}
                    </TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground">
                      {application.cgpa}
                    </TableCell>
                    <TableCell className="text-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                window.open(
                                  application.markSheetUrl,
                                  "_blank",
                                  "noopener,noreferrer",
                                );
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
                      <div className="flex flex-col items-center justify-center gap-1">
                        {application.status === "pending" ? (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-3 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:cursor-pointer"
                              disabled={isPendingStatus}
                              onClick={() =>
                                void updateStatus(application, "approved")
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-3 border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:cursor-pointer"
                              disabled={isPendingStatus}
                              onClick={() =>
                                void updateStatus(application, "rejected")
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
                                application.status === "approved"
                                  ? "border-green-200 bg-green-100 text-green-700"
                                  : "border-red-200 bg-red-100 text-red-700"
                              }
                            >
                              {application.status === "approved"
                                ? "Approved"
                                : "Rejected"}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-6 w-6"
                                  disabled={isPendingStatus}
                                  aria-label={`Change status for ${application.userName}`}
                                >
                                  <ChevronDown className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onSelect={() =>
                                    void updateStatus(application, "pending")
                                  }
                                >
                                  Pending
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() =>
                                    void updateStatus(application, "approved")
                                  }
                                >
                                  Approved
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() =>
                                    void updateStatus(application, "rejected")
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
        )}
      </div>
    </Card>
  );
}
