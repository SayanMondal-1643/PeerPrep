import Link from "next/link"
import { BookOpen, ChevronLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"

// Mock data - will be replaced with database queries
const branchesData: Array<{ id: string; name: string;}> = 
[
      { id: "gate-cse", name: "Computer Science & IT"},
      { id: "gate-ece", name: "Electronics & Communication"},
      { id: "gate-civil", name: "Civil Engineering",},
      { id: "gate-mech", name: "Mechanical Engineering"},
      { id: "gate-electrical", name: "Electrical Engineering"},
      { id: "gate-chemical", name: "Chemical Engineering"},
      { id: "gate-instrumentation", name: "Instrumentation Engineering"},
    ]


interface Params { 
  params: Promise<{ examId: string }>
}

export default async function BranchesPage({ params }: Params) {
  const { examId } = await params
  const data = branchesData[0]

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">Exam not found</p>
        </div>
      </div>
    )
  }

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
