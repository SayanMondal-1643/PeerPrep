import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";

// UNCOMMENT THE CODE BELOW TO FETCH FROM API:
// async function fetchTopics() {
//   try {
//     const response = await fetch(`http://localhost:5000/api/v1/subjects/${subjectId}/topics`);
//     const result = await response.json()
//     if (result.status === "success") {
//       return result.data
//     }
//   } catch (error) {
//     console.error("Failed to fetch topics:", error)
//   }
// return [];
// }

// MOCK DATA - to be removed
const mockTopics: Array<{ _id: string; name: string; subjectId: number }> = [
  {
    _id: "1",
    name: "Array",
    subjectId: 1,
  },
  {
    _id: "2",
    name: "Strings",
    subjectId: 1,
  },
  {
    _id: "3",
    name: "Linked List",
    subjectId: 1,
  },
  {
    _id: "4",
    name: "Stack",
    subjectId: 1,
  },
  {
    _id: "5",
    name: "Queue",
    subjectId: 1,
  },
  {
    _id: "6",
    name: "Tree",
    subjectId: 1,
  },
  {
    _id: "7",
    name: "Graph",
    subjectId: 1,
  },
  {
    _id: "8",
    name: "Searching",
    subjectId: 1,
  },
  {
    _id: "9",
    name: "Sorting",
    subjectId: 1,
  },
  {
    _id: "10",
    name: "Hashing",
    subjectId: 1,
  },
];

interface Params {
  params: Promise<{ examId: string; branchId: string; subjectId: string }>;
}

export default async function TopicsPage({ params }: Params) {
  const { examId, branchId, subjectId } = await params;

  // UNCOMMENT THE LINE TO FETCH FROM API:
  // const topics = await fetchTopics();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {/* <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: examName, href: `/exams/${examId}/branches` },
            { label: branchName, href: `/exams/${examId}/${branchId}` },
            {
              label: subjectName,
              href: `/exams/${examId}/${branchId}/${subjectId}`,
            },
          ]}
        /> */}

        <div className="mb-8">
          {/* <h1 className="text-3xl font-bold mb-2">{subjectName}</h1> */}
          <p className="text-muted-foreground">
            Select a topic to view and download study materials.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* USE topics INSTEAD OF mockTopics WHEN FETCHING FROM API */}
          {mockTopics.map((topic) => (
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
