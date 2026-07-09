"use client";

import Image from "next/image";
import { BookOpen, GraduationCap, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  verificationStatus: string;
  materialsUploaded: number;
  joinedDate: string;
  accountStatus: string;
  linkedinProfile?: string;
  researchgateProfile?: string;
}

interface UsersTabProps {
  filteredUsers: User[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
  verificationFilter: string;
  setVerificationFilter: (value: string) => void;
  accountStatusFilter: string;
  setAccountStatusFilter: (value: string) => void;
}

export default function UsersTab({
  filteredUsers,
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  verificationFilter,
  setVerificationFilter,
  accountStatusFilter,
  setAccountStatusFilter,
}: UsersTabProps) {
  return (
    <Card>
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold mb-6">User Management</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email"
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Verification</TableHead>
              <TableHead className="text-center">Materials Uploaded</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Profiles</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <span className="flex items-center gap-1.5">
                    {user.name}
                    {user.role === "teacher" && (
                      <GraduationCap className="h-4 w-4 text-blue-500" />
                    )}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {user.email}
                </TableCell>

                <TableCell className="text-center">
                  <select
                    defaultValue={user.role}
                    className="text-sm font-medium border-none bg-transparent cursor-pointer px-2 py-1 rounded hover:bg-secondary"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </TableCell>

                <TableCell className="text-center">
                  <select
                    defaultValue={user.verificationStatus}
                    className="text-sm font-medium border-none bg-transparent cursor-pointer px-2 py-1 rounded hover:bg-secondary"
                  >
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </TableCell>

                <TableCell className="text-center text-muted-foreground text-sm">
                  {user.materialsUploaded}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(user.joinedDate).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </TableCell>

                <TableCell className="text-center">
                  <select
                    defaultValue={user.accountStatus}
                    className="text-sm font-medium border-none bg-transparent cursor-pointer px-2 py-1 rounded hover:bg-secondary"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex items-center justify-start gap-2 pl-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="p-1 hover:bg-secondary rounded-md transition-colors">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View PeerPrep profile</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {user.role === "teacher" && (
                      <>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="p-1 hover:bg-secondary rounded-md transition-colors">
                                <Image
                                  src="/linkedin.svg"
                                  alt="LinkedIn"
                                  width={20}
                                  height={20}
                                />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View LinkedIn profile</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="p-1 hover:bg-secondary rounded-md transition-colors">
                                <Image
                                  src="/researchgate.svg"
                                  alt="ResearchGate"
                                  width={20}
                                  height={20}
                                />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View ResearchGate profile</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
