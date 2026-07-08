import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { mockSubjectsResponse } from "@/lib/mock-data";

// UNCOMMENT THE CODE BELOW TO FETCH FROM API:
// async function fetchSubjects(branchId: string) {
//   try {
//     const response = await fetch(`http://localhost:5000/api/v1/branches/${branchId}/subjects`);
//     const result = await response.json()
//     if (result.status === "success") {
//       return result
//     }
//   } catch (error) {
//     console.error("Failed to fetch subjects:", error)
//   }
// return null;
// }

interface Params {
  params: Promise<{ examId: string; branchId: string }>;
}

export default async function SubjectsPage({ params }: Params) {
  const { examId, branchId } = await params;
  // UNCOMMENT THE LINE TO FETCH FROM API:
  // const {data: subjects, branch = "Branch", exam = "Exam"} = await fetchSubjects(branchId);

  // MOCK DATA - TO BE REMOVED WHEN FETCHING FROM API:
  const {
    data: subjects,
    branch = "Branch",
    exam = "Exam",
  } = mockSubjectsResponse;

  // if (!data) return <p>Failed to load subjects.</p>;
  // if (data.subjects.length === 0) return <p>No subjects found.</p>;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Exams", href: "/exams" },
            /* USE `data` INSTEAD OF `mockSubjectsResponse` WHEN FETCHING FROM API */
            {
              label: exam,
              href: `/exams/${examId}/branches`,
            },
            {
              label: branch,
              href: `/exams/${examId}/branches/${branchId}/subjects`,
            },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{branch}</h1>
          <p className="text-muted-foreground">
            Select a subject to view topics and study materials.
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* USE `data` INSTEAD OF `mockSubjectsResponse` WHEN FETCHING FROM API */}
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
                {/* <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{subject.topicCount} topics</span>
                  <span>•</span>
                  <span>{subject.materialCount} materials</span>
                </div> */}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
