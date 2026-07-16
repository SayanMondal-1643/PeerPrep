"use client";

import { useParams } from "next/navigation";
import { useUserMaterials } from "@/lib/hooks/use-materials";
import { useUserTopperBadges } from "@/lib/hooks/use-topper-badges";
import { useUser } from "@/lib/hooks/use-users";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

interface PopulatedUser {
  _id: string;
  name: string;
  role: "student" | "teacher" | "admin";
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  accountStatus: "active" | "suspended";
  institutionName?: string;
  idProofUrl?: string;
  verificationStatus?: "pending" | "verified" | "rejected";
}

interface Material {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  uploadDate: string;
  status: "pending" | "approved" | "rejected";
  userId: PopulatedUser;
  topicId: string;
  isBestMaterial: boolean;
  isTopperMaterial: boolean;
  isAIPicked: boolean;
  ratingsAverage: number;
  ratingsQuantity: number;
}

interface TopperBadge {
  _id: string;
  userId: string;
  userName: string;
  subject: string;
  exam: string;
  branch: string;
  year: number;
  cgpa: number;
  markSheetUrl: string;
  status: "pending" | "approved" | "rejected";
}

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

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 space-y-8">
        <Card className="p-8">
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 animate-pulse rounded-full bg-muted" />
            <div className="flex-1 space-y-3">
              <div className="h-8 w-48 animate-pulse rounded bg-muted" />
              <div className="h-4 w-64 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <div className="h-8 w-48 animate-pulse rounded bg-muted mb-6" />
          <div className="space-y-4">
            <div className="h-28 animate-pulse rounded-lg bg-muted" />
            <div className="h-28 animate-pulse rounded-lg bg-muted" />
          </div>
        </Card>

        <Card className="p-8">
          <div className="h-8 w-48 animate-pulse rounded bg-muted mb-6" />
          <div className="h-24 animate-pulse rounded bg-muted" />
        </Card>
      </div>
    </div>
  );
}

export default function UserProfilePage() {
  const params = useParams<{ userId?: string }>();
  const userId = params?.userId;

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUser(userId);
  const { data: materialsData, isLoading: isMaterialsLoading } =
    useUserMaterials(userId);
  const { data: topperBadgesData, isLoading: isTopperBadgesLoading } =
    useUserTopperBadges(userId);

  const user = userData as User | undefined;
  const materials = (materialsData?.data ?? []) as Material[];
  const topperBadges = (topperBadgesData?.data ?? []) as TopperBadge[];

  if (isUserLoading || isMaterialsLoading || isTopperBadgesLoading) {
    return <ProfileSkeleton />;
  }

  if (isUserError || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">User not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
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
                {user.role === "teacher" && (
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
                )}
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Uploaded Materials</h2>

          {materials.length === 0 ? (
            <div className="text-center py-12">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                This user hasn't uploaded any materials yet.
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
                      <p className="text-sm text-muted-foreground">
                        {material.description}
                      </p>
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

        {user.role === "student" && (
          <Card className="p-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">Topper Badges</h2>

            {topperBadges.length === 0 ? (
              <div className="text-center py-12">
                <Medal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  This user hasn't applied for any topper badges yet.
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
      </div>
    </div>
  );
}
