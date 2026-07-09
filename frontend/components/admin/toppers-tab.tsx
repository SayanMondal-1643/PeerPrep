"use client";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { type Dispatch, type SetStateAction } from "react";

interface TopperApplication {
  id: string;
  name: string;
  email: string;
  subject: string;
  exam: string;
  branch: string;
  year: number;
  cgpa: number;
  marksheetUrl: string;
  status: string;
}

interface ToppersTabProps {
  filteredToppers: TopperApplication[];
  topperSearchQuery: string;
  setTopperSearchQuery: (value: string) => void;
  topperApprovalFilter: string;
  setTopperApprovalFilter: (value: string) => void;
  setSelectedMarksheetUrl: (value: string | null) => void;
  setIsMarksheetOpen: (value: boolean) => void;
  topperApplicationsList: TopperApplication[];
  setTopperApplicationsList: Dispatch<SetStateAction<TopperApplication[]>>;
}

export default function ToppersTab({
  filteredToppers,
  topperSearchQuery,
  setTopperSearchQuery,
  topperApprovalFilter,
  setTopperApprovalFilter,
  setSelectedMarksheetUrl,
  setIsMarksheetOpen,
  topperApplicationsList,
  setTopperApplicationsList,
}: ToppersTabProps) {
  return (
    <Card>
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold mb-4">
          Topper Badge Applications
        </h2>

        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <Input
              placeholder="Search by name or email"
              value={topperSearchQuery}
              onChange={(e) => setTopperSearchQuery(e.target.value)}
              className="h-9"
            />
          </div>

          <div className="w-48">
            <select
              value={topperApprovalFilter}
              onChange={(e) => setTopperApprovalFilter(e.target.value)}
              className="w-full h-9 px-3 rounded border border-input bg-background text-sm font-medium"
            >
              <option value="all">All Approval Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
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
            {filteredToppers.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">
                  {application.name}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {application.email}
                </TableCell>
                <TableCell className="text-center text-muted-foreground text-sm">
                  {application.subject}
                </TableCell>
                <TableCell className="text-center text-muted-foreground text-sm">
                  {application.exam}
                </TableCell>
                <TableCell className="text-center text-muted-foreground text-sm font-medium">
                  {application.branch}
                </TableCell>
                <TableCell className="text-center text-muted-foreground text-sm">
                  {application.year}
                </TableCell>
                <TableCell className="text-center text-muted-foreground text-sm">
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
                            setSelectedMarksheetUrl(application.marksheetUrl);
                            setIsMarksheetOpen(true);
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
                  <select
                    value={application.status}
                    onChange={(e) => {
                      const updated = topperApplicationsList.map((app) =>
                        app.id === application.id
                          ? {
                              ...app,
                              status: e.target.value as
                                | "pending"
                                | "approved"
                                | "rejected",
                            }
                          : app,
                      );
                      setTopperApplicationsList(updated);
                    }}
                    className="text-sm font-medium border-none bg-transparent cursor-pointer px-2 py-1 rounded hover:bg-secondary"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
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
