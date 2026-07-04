import Link from "next/link"
import { BookOpen, ChevronLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"

// UNCOMMENT THE CODE BELOW TO FETCH FROM API:
// async function fetchBranches() {
//   try {
//     const response = await fetch(`http://localhost:5000/api/v1/exams/${examId}/branches`);
//     const result = await response.json()
//     if (result.status === "success") {
//       return result.data
//     }
//   } catch (error) {
//     console.error("Failed to fetch branches:", error)
//   }
// return [];
// }

// Mock data - will be replaced with database queries
const MockBranches: Array<{ _id: string; name: string; examId: number }> = [
  {
    "_id": "1",
    "name": "Computer Science Engineering",
    "examId": 1
  },
  {
    "_id": "2",
    "name": "Information Technology",
    "examId": 1
  },
  {
    "_id": "3",
    "name": "Electronics and Communication Engineering",
    "examId": 1
  },
  {
    "_id": "4",
    "name": "Electrical Engineering",
    "examId": 1
  },
  {
    "_id": "5",
    "name": "Mechanical Engineering",
    "examId": 1
  },
  {
    "_id": "6",
    "name": "Civil Engineering",
    "examId": 1
  },
  {
    "_id": "7",
    "name": "Chemical Engineering",
    "examId": 1
  },
  {
    "_id": "8",
    "name": "Biotechnology",
    "examId": 1
  },
  {
    "_id": "9",
    "name": "Aerospace Engineering",
    "examId": 1
  },
  {
    "_id": "10",
    "name": "Artificial Intelligence and Data Science",
    "examId": 1
  }
]


interface Params { 
  params: Promise<{ examId: string }>
}

export default async function BranchesPage({ params }: Params) {
  // UNCOMMENT THE LINE TO FETCH FROM API:
  // const branches = await fetchBranches();

  const { examId } = await params

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: data.name, href: `/exams/${examId}/branches` },
          ]}
        />

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
          <p className="text-muted-foreground">
            {examId === "university"
              ? "Select a university to explore branches and access peer-reviewed study materials."
              : "Select a branch to explore subjects and access peer-reviewed study materials."}
          </p>
        </div>

        {/* Branches/Universities Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {data.branches.map((branch) => (
            <Link
              key={branch.id}
              href={
                examId === "university"
                  ? `/universities/${branch.id}`
                  : `/exams/${examId}/${branch.id}`
              }
            >
              <Card className="p-6 h-full cursor-pointer group hover:shadow-md hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {branch.name}
                    </h3>
                    {branch.subjectCount && <p className="text-sm text-muted-foreground">{branch.subjectCount} subjects</p>}
                  </div>
                  <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transform rotate-180 group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
