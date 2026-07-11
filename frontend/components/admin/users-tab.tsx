"use client";

import { useEffect, useState } from "react";
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
import { mockUsersResponse } from "@/lib/mock-data";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

interface User {
  _id: string;
  name: string;
  role: string;
  verificationStatus: string;
  accountStatus: string;
  idProofUrl?: string;
}

interface ApiUserResponse {
  status: string;
  results: number;
  data: User[];
}

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
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [accountStatusFilter, setAccountStatusFilter] = useState("all");

  const loadUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      // UNCOMMENT TO FETCH FROM API
      // const response = await fetch(`${API_BASE_URL}/api/v1/users`);
      // if (!response.ok) {
      //   throw new Error("Failed to load users.");
      // }
      // const json: ApiUserResponse = await response.json();

      const json: ApiUserResponse = mockUsersResponse;
      setUsers(json.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setError(
        error instanceof Error ? error.message : "Unable to load users.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

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

  const updateVerificationStatus = async (user: User, nextStatus: string) => {
    const previousStatus = user.verificationStatus;

    setUsers((prev) =>
      prev.map((item) =>
        item._id === user._id
          ? { ...item, verificationStatus: nextStatus }
          : item,
      ),
    );

    try {
      // UNCOMMENT TO FETCH FROM API
      // const response = await fetch(`${API_BASE_URL}/api/v1/users/${user._id}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ verificationStatus: nextStatus }),
      // });
      // if (!response.ok) {
      //   throw new Error("Failed to update verification status.");
      // }
    } catch {
      setUsers((prev) =>
        prev.map((item) =>
          item._id === user._id
            ? { ...item, verificationStatus: previousStatus }
            : item,
        ),
      );
      setError("Unable to update verification status.");
    }
  };

  const updateAccountStatus = async (user: User, nextStatus: string) => {
    const previousStatus = user.accountStatus;

    setUsers((prev) =>
      prev.map((item) =>
        item._id === user._id ? { ...item, accountStatus: nextStatus } : item,
      ),
    );

    try {
      // UNCOMMENT TO FETCH FROM API
      // const response = await fetch(`${API_BASE_URL}/api/v1/users/${user._id}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ accountStatus: nextStatus }),
      // });
      // if (!response.ok) {
      //   throw new Error("Failed to update account status.");
      // }
    } catch {
      setUsers((prev) =>
        prev.map((item) =>
          item._id === user._id
            ? { ...item, accountStatus: previousStatus }
            : item,
        ),
      );
      setError("Unable to update account status.");
    }
  };

  if (loading) {
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
          <h2 className="text-xl font-semibold">User Management</h2>
          <p className="text-sm text-red-600">{error}</p>
          <Button onClick={() => void loadUsers()}>Retry</Button>
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
                const verificationState = user.verificationStatus;
                const accountStatus = user.accountStatus;

                return (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium text-primary">
                      <a
                        href="#"
                        className="inline-flex items-center gap-1.5 hover:underline"
                      >
                        <span>{user.name}</span>
                        {user.role === "teacher" && (
                          <GraduationCap className="h-4 w-4 text-blue-500" />
                        )}
                        {user.role === "admin" && (
                          <Shield className="h-4 w-4 text-amber-500" />
                        )}
                      </a>
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
                                void updateVerificationStatus(user, "verified")
                              }
                            >
                              Verify
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2.5 text-xs border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:cursor-pointer"
                              onClick={() =>
                                void updateVerificationStatus(user, "rejected")
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
                                        void updateVerificationStatus(
                                          user,
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
                                  void updateAccountStatus(user, option.value)
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
