import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"

// Mock data - will be replaced with database queries
const exams = [
  {
    id: "gate",
    name: "GATE",
    description: "Graduate Aptitude Test in Engineering",
  },
  {
    id: "university",
    name: "University Examinations",
    description: "Prepare for your university semester exams",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Select an exam to explore branches, subjects, topics and access topic-wise study materials.
          </p>
        </div>

        {/* Exams Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {exams.map((exam) => {
            // Route to different pages based on exam type
            const href = exam.id === "university" 
              ? "/universities" 
              : `/dashboard/${exam.id}/branches`
            
            return (
              <Link key={exam.id} href={href}>
                <Card className="p-8 h-full cursor-pointer group hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors">{exam.name}</h2>
                      <p className="text-muted-foreground text-base leading-relaxed">{exam.description}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-6 text-primary font-medium group-hover:gap-3 transition-all">
                      <span>Explore</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
