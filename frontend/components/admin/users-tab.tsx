"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Eye, GraduationCap, Search, Shield } from "lucide-react";
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
import { useUsers, useUpdateUser } from "@/lib/hooks/use-users";

const verificationOptions = [
  { value: "pending", label: "Pending" },
  { value: "verified", label: "Verified" },
  { value: "rejected", label: "Rejected" },
] as const;

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
] as const;

function getVerificationBadgeStyles(status: string) {
  switch (status) {
    case "verified":
      return "border-green-200 bg-green-100 text-green-700";
    case "rejected":
      return "border-red-200 bg-red-100 text-red-700";
    default:
      return "border-amber-200 bg-amber-100 text-amber-700";
  }
}

function getStatusBadgeStyles(status: string) {
  return status === "suspended"
    ? "border-red-200 bg-red-100 text-red-700"
    : "border-green-200 bg-green-100 text-green-700";
}

export default function UsersTab() {
  const { data, isLoading, isError, refetch } = useUsers();
  const updateUser = useUpdateUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [accountStatusFilter, setAccountStatusFilter] = useState("all");

  const users = data?.data ?? [];

  const filteredUsers = users.filter((user) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const matchesSearch = user.name.toLowerCase().includes(normalizedQuery);
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesVerification =
      verificationFilter === "all" ||
      user.verificationStatus === verificationFilter;
    const matchesAccountStatus =
      accountStatusFilter === "all" ||
      user.accountStatus === accountStatusFilter;

    return (
      matchesSearch &&
      matchesRole &&
      matchesVerification &&
      matchesAccountStatus
    );
  });

  const updateVerificationStatus = (userId: string, nextStatus: string) => {
    updateUser.mutate({ userId, updates: { verificationStatus: nextStatus } });
  };

  const updateAccountStatus = (userId: string, nextStatus: string) => {
    updateUser.mutate({ userId, updates: { accountStatus: nextStatus } });
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
          <h2 className="text-xl font-semibold">User Management</h2>
          <p className="text-sm text-red-600">Unable to load users.</p>
          <Button onClick={() => void refetch()}>Retry</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold mb-6">User Management</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

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

      <div className="overflow-x-auto">
        {filteredUsers.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">
            No users found.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">
                  Verification Status
                </TableHead>
                <TableHead className="text-center">Account Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const verificationState = user.verificationStatus ?? "pending";
                const accountStatus = user.accountStatus ?? "active";

                return (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium text-primary">
                      <Link
                        href={`/profile/${user._id}`}
                        className="inline-flex items-center gap-1.5 hover:underline"
                      >
                        <span>{user.name}</span>
                        {user.role === "teacher" &&
                          user.verificationStatus === "verified" && (
                            <GraduationCap className="h-4 w-4 text-blue-500" />
                          )}
                        {user.role === "admin" && (
                          <Shield className="h-4 w-4 text-amber-500" />
                        )}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      {user.role === "teacher" ? (
                        verificationState === "pending" ? (
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2.5 text-xs border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:cursor-pointer"
                              onClick={() =>
                                updateVerificationStatus(user._id, "verified")
                              }
                            >
                              Verify
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2.5 text-xs border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:cursor-pointer"
                              onClick={() =>
                                updateVerificationStatus(user._id, "rejected")
                              }
                            >
                              Reject
                            </Button>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 w-7 p-0"
                                    onClick={() => {
                                      if (user.idProofUrl) {
                                        window.open(
                                          user.idProofUrl,
                                          "_blank",
                                          "noopener,noreferrer",
                                        );
                                      }
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View Proof</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <div className="flex items-center justify-center gap-1">
                              <Badge
                                variant="outline"
                                className={getVerificationBadgeStyles(
                                  verificationState,
                                )}
                              >
                                <span className="capitalize">
                                  {verificationState}
                                </span>
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-6 w-6"
                                  >
                                    <ChevronDown className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {verificationOptions.map((option) => (
                                    <DropdownMenuItem
                                      key={option.value}
                                      onClick={() =>
                                        updateVerificationStatus(
                                          user._id,
                                          option.value,
                                        )
                                      }
                                    >
                                      {option.label}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 w-7 p-0"
                                    onClick={() => {
                                      if (user.idProofUrl) {
                                        window.open(
                                          user.idProofUrl,
                                          "_blank",
                                          "noopener,noreferrer",
                                        );
                                      }
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View Proof</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Badge
                          variant="outline"
                          className={getStatusBadgeStyles(accountStatus)}
                        >
                          <span className="capitalize">{accountStatus}</span>
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                            >
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {statusOptions.map((option) => (
                              <DropdownMenuItem
                                key={option.value}
                                onClick={() =>
                                  updateAccountStatus(user._id, option.value)
                                }
                              >
                                {option.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
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
