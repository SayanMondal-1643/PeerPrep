import Link from "next/link";
import { BookOpen, ChevronLeft, FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { HierarchyOption, HierarchyResponse } from "@/lib/hierarchy-types";
import { mockBranchesResponse, exams } from "@/lib/mock-data";

// UNCOMMENT THE CODE BELOW TO FETCH FROM API:
// async function fetchBranches(examId: string) {
//   try {
//     const response = await fetch(`http://localhost:5000/api/v1/exams/${examId}/branches`);
//     const result = await response.json()
//     if (result.status === "success") {
//       return result
//     }
//   } catch (error) {
//     console.error("Failed to fetch branches:", error)
//   }
// return null;
// }

interface Params {
  params: Promise<{ examId: string }>;
}

export default async function BranchesPage({ params }: Params) {
  const { examId } = await params;

  // Conditionally load branches based on examId
  let branches: HierarchyOption[] = [];
  let exam = "Exam Not Found";

  if (examId === "0") {
    const mockData: HierarchyResponse = mockBranchesResponse;
    branches = mockData.data;
    exam = mockData.exam || "Exam";
  } else {
    exam = exams.find((e) => e._id === examId)?.name ?? "Exam Not Found";
  }

  // if (!data) return <p>Failed to load branches.</p>;
  // if (data.branches.length === 0) return <p>No branches found.</p>;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Exams", href: "/exams" },
            /* USE 'data' INSTEAD OF 'mockBranchesResponse' WHEN FETCHING FROM API */
            {
              label: exam,
              href: `/exams/${examId}/branches`,
            },
          ]}
        />

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{exam}</h1>
          {branches.length > 0 && (
            <p className="text-muted-foreground">
              Select a branch to explore subjects, topics and study materials.
            </p>
          )}
        </div>

        {/* Branches/Universities Grid or Empty State */}
        {branches.length > 0 ? (
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
          <Card className="p-16 text-center">
            <div className="flex flex-col items-center gap-4">
              <FolderOpen className="h-12 w-12 text-muted-foreground" />
              <h2 className="text-xl font-semibold">No branches yet</h2>
              <p className="text-muted-foreground">
                This exam doesn't have any branches yet. Check back later.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
