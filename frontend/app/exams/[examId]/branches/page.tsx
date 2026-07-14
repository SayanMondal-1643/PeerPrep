"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useBranches } from "@/lib/hooks/use-branches";

export default function BranchesPage() {
  const { examId } = useParams<{ examId: string }>();
  const { data, isLoading, isError } = useBranches(examId);

  const branches = data?.data ?? [];
  const exam = data?.exam ?? "Exam";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Exams", href: "/exams" },
            { label: exam, href: `/exams/${examId}/branches` },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{exam}</h1>
          {branches.length > 0 && (
            <p className="text-muted-foreground">
              Select a branch to explore subjects, topics and study materials.
            </p>
          )}
        </div>

        {isLoading && <p className="text-muted-foreground">Loading branches...</p>}
        {isError && <p className="text-destructive">Failed to load branches.</p>}

        {!isLoading && !isError && branches.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {branches.map((branch) => (
              <Link
                key={branch._id}
                href={`/exams/${examId}/branches/${branch._id}/subjects`}
              >
                <Card className="p-6 h-full cursor-pointer group hover:shadow-md hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {branch.name}
                      </h3>
                    </div>
                    <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transform rotate-180 group-hover:translate-x-1 transition-all" />
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
                <h2 className="text-xl font-semibold">No branches yet</h2>
                <p className="text-muted-foreground">
                  This exam doesn't have any branches yet. Check back later.
                </p>
              </div>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
