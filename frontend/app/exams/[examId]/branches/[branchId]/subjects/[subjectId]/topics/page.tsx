"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, FileText, FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useTopics } from "@/lib/hooks/use-topics";

export default function TopicsPage() {
  const { examId, branchId, subjectId } = useParams<{
    examId: string;
    branchId: string;
    subjectId: string;
  }>();
  const { data, isLoading, isError } = useTopics(subjectId);

  const topics = data?.data ?? [];
  const exam = data?.exam ?? "Exam";
  const branch = data?.branch ?? "Branch";
  const subject = data?.subject ?? "Subject";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Exams", href: "/exams" },
            { label: exam, href: `/exams/${examId}/branches` },
            {
              label: branch,
              href: `/exams/${examId}/branches/${branchId}/subjects`,
            },
            {
              label: subject,
              href: `/exams/${examId}/branches/${branchId}/subjects/${subjectId}/topics`,
            },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{subject}</h1>
          <p className="text-muted-foreground">
            Select a topic to view and download study materials.
          </p>
        </div>

        {isLoading && <p className="text-muted-foreground">Loading topics...</p>}
        {isError && <p className="text-destructive">Failed to load topics.</p>}
        {!isLoading && !isError && topics.length === 0 && (
          <Card className="p-16 text-center">
            <div className="flex flex-col items-center gap-4">
              <FolderOpen className="h-12 w-12 text-muted-foreground" />
              <h2 className="text-xl font-semibold">No topics yet</h2>
              <p className="text-muted-foreground">
                This subject doesn't have any topics yet. Check back later.
              </p>
            </div>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topics.map((topic) => (
            <Link
              key={topic._id}
              href={`/exams/${examId}/branches/${branchId}/subjects/${subjectId}/topics/${topic._id}/materials`}
            >
              <Card className="p-5 h-full hover:bg-accent hover:border-accent-foreground/20 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <FileText className="h-5 w-5 text-primary shrink-0" />
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
                  {topic.name}
                </h3>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
