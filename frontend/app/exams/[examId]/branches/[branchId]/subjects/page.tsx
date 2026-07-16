"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useSubjects } from "@/lib/hooks/use-subjects";

export default function SubjectsPage() {
  const { examId, branchId } = useParams<{ examId: string; branchId: string }>();
  const { data, isLoading, isError } = useSubjects(branchId);

  const subjects = data?.data ?? [];
  const exam = data?.exam ?? "Exam";
  const branch = data?.branch ?? "Branch";

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
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{branch}</h1>
          {subjects.length > 0 && (
            <p className="text-muted-foreground">
              Select a subject to explore topics and study materials.
            </p>
          )}
        </div>

        {isLoading && <p className="text-muted-foreground">Loading subjects...</p>}
        {isError && <p className="text-destructive">Failed to load subjects.</p>}

        {!isLoading && !isError && subjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Link
                key={subject._id}
                href={`/exams/${examId}/branches/${branchId}/subjects/${subject._id}/topics`}
              >
                <Card className="p-6 h-full hover:bg-accent hover:border-accent-foreground/20 transition-all group">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {subject.name}
                    </h3>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          !isLoading &&
          !isError && (
            <Card className="p-16 text-center">
              <div className="flex flex-col items-center gap-4">
                <FolderOpen className="h-12 w-12 text-muted-foreground" />
                <h2 className="text-xl font-semibold">No subjects yet</h2>
                <p className="text-muted-foreground">
                  This branch doesn't have any subjects yet. Check back later.
                </p>
              </div>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
