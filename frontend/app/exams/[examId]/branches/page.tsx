import Link from "next/link";
import { BookOpen, ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";

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

interface BranchesResponse {
  status: string;
  exam: string;
  results: number;
  branches: {
    _id: string;
    name: string;
  }[];
}

interface Params {
  params: Promise<{ examId: string }>;
}

// MOCK DATA - TO BE REMOVED
const mockData: BranchesResponse = {
  status: "success",
  exam: "Maulana Abul Kalam Azad University of Technology",
  results: 10,
  branches: [
    {
      _id: "1",
      name: "Computer Science Engineering",
    },
    {
      _id: "2",
      name: "Information Technology",
    },
    {
      _id: "3",
      name: "Electronics and Communication Engineering",
    },
    {
      _id: "4",
      name: "Electrical Engineering",
    },
    {
      _id: "5",
      name: "Mechanical Engineering",
    },
    {
      _id: "6",
      name: "Civil Engineering",
    },
    {
      _id: "7",
      name: "Chemical Engineering",
    },
    {
      _id: "8",
      name: "Biotechnology",
    },
    {
      _id: "9",
      name: "Aerospace Engineering",
    },
    {
      _id: "10",
      name: "Artificial Intelligence and Data Science",
    },
  ],
};

export default async function BranchesPage({ params }: Params) {
  const { examId } = await params;
  // UNCOMMENT THE LINE TO FETCH FROM API:
  // const data = await fetchBranches(examId);

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
            /* USE 'data' INSTEAD OF 'mockData' WHEN FETCHING FROM API */
            { label: mockData.exam, href: `/exams/${examId}/branches` },
          ]}
        />

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{mockData.exam}</h1>
          <p className="text-muted-foreground">
            Select a branch to explore subjects, topics and study materials.
          </p>
        </div>

        {/* Branches/Universities Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* USE 'data' INSTEAD OF 'mockData' WHEN FETCHING FROM API */}
          {mockData.branches.map((branch) => (
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
                    {/* {branch.subjectCount && <p className="text-sm text-muted-foreground">{branch.subjectCount} subjects</p>} */}
                  </div>
                  <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transform rotate-180 group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
