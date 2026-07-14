"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useExams } from "@/lib/hooks/use-exams";

export default function ExamsPage() {
  const { data: exams, isLoading, isError } = useExams();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Exams", href: "/exams" },
          ]}
        />
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Exams</h1>
          <p className="text-lg text-muted-foreground">
            Select an exam to explore branches, subjects, topics and study
            materials.
          </p>
        </div>

        {isLoading && <p className="text-muted-foreground">Loading exams...</p>}
        {isError && <p className="text-destructive">Failed to load exams.</p>}
        {!isLoading && !isError && exams?.length === 0 && (
          <p className="text-muted-foreground">No exams found.</p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {exams?.map((exam) => (
            <Link key={exam._id} href={`/exams/${exam._id}/branches`}>
              <Card className="p-8 h-full cursor-pointer group hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {exam.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 mt-6 text-primary font-medium group-hover:gap-3 transition-all">
                    <span>Explore</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
