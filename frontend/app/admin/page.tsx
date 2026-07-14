"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaterialsTab from "@/components/admin/materials-tab";
import UsersTab from "@/components/admin/users-tab";
import ToppersTab from "@/components/admin/toppers-tab";
import ReportsTab from "@/components/admin/reports-tab";
import StructureTab from "@/components/admin/structure-tab";
import { useRequireRole } from "@/lib/use-require-auth";
import { useAuth } from "@/lib/auth-context";

// TODO: move MarksheetViewerModal + its state into ToppersTab

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("materials");
  const { isLoading } = useAuth();
  useRequireRole("admin");

  if (isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage materials, users, toppers, reports, and platform structure.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="toppers">Toppers</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="structure">Structure</TabsTrigger>
          </TabsList>

          <TabsContent value="materials" className="space-y-6">
            <MaterialsTab />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UsersTab />
          </TabsContent>

          <TabsContent value="toppers" className="space-y-6">
            <ToppersTab />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportsTab />
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            <StructureTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
