import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { mockTopicsResponse } from "@/lib/mock-data";

// UNCOMMENT THE CODE BELOW TO FETCH FROM API:
// async function fetchTopics(subjectId: string) {
//   try {
//     const response = await fetch(`http://localhost:5000/api/v1/subjects/${subjectId}/topics`);
//     const result = await response.json()
//     if (result.status === "success") {
//       return result
//     }
//   } catch (error) {
//     console.error("Failed to fetch topics:", error)
//   }
// return null;
// }

interface Params {
  params: Promise<{ examId: string; branchId: string; subjectId: string }>;
}

export default async function TopicsPage({ params }: Params) {
  const { examId, branchId, subjectId } = await params;
  // UNCOMMENT THE LINE TO FETCH FROM API:
  // const { data: topics, subject = "Subject", branch = "Branch", exam = "Exam" } = await fetchTopics(subjectId);

  // MOCK DATA - TO BE REMOVED WHEN FETCHING FROM API:
  const {
    data: topics,
    subject = "Subject",
    branch = "Branch",
    exam = "Exam",
  } = mockTopicsResponse;

  // if (!data) return <p>Failed to load topics.</p>;
  // if (data.topics.length === 0) return <p>No topics found.</p>;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Exams", href: "/exams" },
            /* USE `data` INSTEAD OF `mockTopicsResponse` WHEN FETCHING FROM API */
            {
              label: exam,
              href: `/exams/${examId}/branches`,
            },
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
          {/* USE 'data' INSTEAD OF 'mockTopicsResponse' WHEN FETCHING FROM API */}
          <h1 className="text-3xl font-bold mb-2">{subject}</h1>
          <p className="text-muted-foreground">
            Select a topic to view and download study materials.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* USE 'data' INSTEAD OF 'mockTopicsResponse' WHEN FETCHING FROM API */}
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
                {/* <p className="text-sm text-muted-foreground">
                  {topic.materialCount} materials
                </p> */}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
