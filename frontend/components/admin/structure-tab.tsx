"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HierarchyTree } from "@/components/hierarchy-tree";

interface StructureTabProps {
  hierarchy: Array<{
    id: string;
    name: string;
    branchCount: number;
    subjectCount: number;
    topicCount: number;
    materialCount: number;
    branches: Array<{
      id: string;
      name: string;
      subjectCount: number;
      topicCount: number;
      materialCount: number;
      subjects: Array<{
        id: string;
        name: string;
        topicCount: number;
        materialCount: number;
        topics: Array<{ id: string; name: string; materials: number }>;
      }>;
    }>;
  }>;
}

export default function StructureTab({ hierarchy }: StructureTabProps) {
  return (
    <Card>
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-xl font-semibold">Platform Structure</h2>
        <Button size="sm" id="add-exam-btn">
          <Plus className="mr-2 h-4 w-4" />
          Add Exam
        </Button>
      </div>
      <div className="p-6">
        <HierarchyTree exams={hierarchy} />
      </div>
    </Card>
  );
}
