"use client";

import { Users, FileText, Eye, Medal, Flag } from "lucide-react";
import { Card } from "@/components/ui/card";

interface OverviewTabProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    totalMaterials: number;
    viewsDownloads: number;
    toppers: number;
    reports: number;
  };
}

export default function OverviewTab({ stats }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-3xl font-bold">
              {stats.totalUsers.toLocaleString()}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Active Users (Last 7 Days)
            </p>
            <p className="text-3xl font-bold">
              {stats.activeUsers.toLocaleString()}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Materials</p>
            <p className="text-3xl font-bold">
              {stats.totalMaterials.toLocaleString()}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Eye className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Views / Downloads</p>
            <p className="text-3xl font-bold">
              {stats.viewsDownloads.toLocaleString()}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Medal className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Toppers</p>
            <p className="text-3xl font-bold">
              {stats.toppers.toLocaleString()}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Flag className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Reports</p>
            <p className="text-3xl font-bold">
              {stats.reports.toLocaleString()}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
