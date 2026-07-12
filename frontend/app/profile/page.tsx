"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useRequireAuth } from "@/lib/use-require-auth";
import {
  MaterialWithBreadcrumb,
  ApiUserMaterialsResponse,
} from "@/lib/material-types";
import { TopperBadge } from "@/lib/topper-badge-types";
import {
  mockUserMaterialsResponse,
  mockUserTopperBadgesResponse,
} from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  Clock,
  XCircle,
  Upload,
  GraduationCap,
  Medal,
  Trophy,
  Star,
} from "lucide-react";
import ApplyTopperBadgeModal, {
  TopperBadgeApplicationData,
} from "@/components/apply-topper-badge-modal";

const getStatusIcon = (status: string) => {
  const tooltipTexts: Record<string, string> = {
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected",
  };

  switch (status) {
    case "approved":
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CheckCircle className="h-5 w-5 text-green-500 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipTexts[status]}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case "pending":
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Clock className="h-5 w-5 text-amber-500 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipTexts[status]}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case "rejected":
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <XCircle className="h-5 w-5 text-red-500 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipTexts[status]}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    default:
      return null;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  useRequireAuth();

  const [materials, setMaterials] = useState<MaterialWithBreadcrumb[]>(
    (mockUserMaterialsResponse as ApiUserMaterialsResponse).data,
  );
  const [topperBadges, setTopperBadges] = useState<TopperBadge[]>(
    mockUserTopperBadgesResponse.data,
  );
  const [isApplyBadgeModalOpen, setIsApplyBadgeModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (!user) {
    return null;
  }

  if (user.role !== "student" && user.role !== "teacher") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">
            Only students and teachers can access the profile page.
          </p>
        </div>
      </div>
    );
  }

  const handleBadgeApplicationSubmit = (data: TopperBadgeApplicationData) => {
    const newBadge: TopperBadge = {
      _id: Date.now().toString(),
      userId: user._id,
      userName: user.name,
      subject: data.subject,
      exam: data.exam,
      branch: data.branch,
      year: Number(data.year),
      cgpa: Number(data.cgpa),
      markSheetUrl: data.markSheetUrl,
      status: "pending",
    };
    setTopperBadges([...topperBadges, newBadge]);
  };

  const handleDeleteAccount = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Profile Header */}
        <Card className="p-8 mb-8">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl font-semibold bg-primary text-primary-foreground">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{user.name}</h1>
                {user.role === "teacher" ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <GraduationCap className="h-6 w-6 text-blue-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Teacher</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <Badge variant="secondary">Student</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </Card>

        {/* Uploaded Materials */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Your Uploaded Materials</h2>

          {materials.length === 0 ? (
            <div className="text-center py-12">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                You haven't uploaded any materials yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {materials.map((material) => (
                <div
                  key={material._id}
                  className="border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors relative"
                >
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    {material.isBestMaterial && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Trophy className="h-5 w-5 text-amber-500 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Best Material</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    {getStatusIcon(material.status)}
                  </div>
                  <div className="mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">
                        {material.title}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium text-foreground">
                            Exam:
                          </span>{" "}
                          {material.exam}
                        </div>
                        <div>
                          <span className="font-medium text-foreground">
                            Branch:
                          </span>{" "}
                          {material.branch}
                        </div>
                        <div>
                          <span className="font-medium text-foreground">
                            Subject:
                          </span>{" "}
                          {material.subject}
                        </div>
                        <div>
                          <span className="font-medium text-foreground">
                            Topic:
                          </span>{" "}
                          {material.topic}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      Uploaded on {formatDate(material.uploadDate)}
                    </span>
                    <div className="flex items-center gap-4">
                      {material.ratingsQuantity > 0 && (
                        <div className="flex items-center gap-1">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= Math.round(material.ratingsAverage)
                                    ? "fill-primary text-primary"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground ml-1">
                            ({material.ratingsQuantity})
                          </span>
                        </div>
                      )}
                      {material.ratingsQuantity === 0 && (
                        <span className="text-sm text-muted-foreground">
                          No ratings yet
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Topper Badges Section - Only for Students */}
        {user.role === "student" && (
          <Card className="p-8 mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Topper Badges</h2>
              <Button onClick={() => setIsApplyBadgeModalOpen(true)}>
                Apply for a New Badge
              </Button>
            </div>

            {topperBadges.length === 0 ? (
              <div className="text-center py-12">
                <Medal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  You haven't applied for any topper badges yet.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Exam</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topperBadges.map((badge) => (
                      <TableRow key={badge._id}>
                        <TableCell className="font-medium">
                          {badge.subject}
                        </TableCell>
                        <TableCell>{badge.exam}</TableCell>
                        <TableCell>{badge.branch}</TableCell>
                        <TableCell>{badge.year}</TableCell>
                        <TableCell>
                          {badge.status === "approved" && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <CheckCircle className="h-5 w-5 text-green-500 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Approved</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {badge.status === "pending" && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Clock className="h-5 w-5 text-amber-500 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Applied</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {badge.status === "rejected" && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <XCircle className="h-5 w-5 text-red-500 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Rejected</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        )}

        <Card className="p-8 mt-8 border-destructive/50">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-semibold">Danger Zone</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Deleting your account is permanent and cannot be undone.
              </p>
            </div>
            <Button
              variant="destructive"
              className="w-fit"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete Account
            </Button>
          </div>
        </Card>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account?</DialogTitle>
            <DialogDescription>
              This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                await handleDeleteAccount();
                setIsDeleteDialogOpen(false);
              }}
            >
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Apply for Badge Modal */}
      <ApplyTopperBadgeModal
        isOpen={isApplyBadgeModalOpen}
        onClose={() => setIsApplyBadgeModalOpen(false)}
        onSubmit={handleBadgeApplicationSubmit}
      />
    </div>
  );
}
