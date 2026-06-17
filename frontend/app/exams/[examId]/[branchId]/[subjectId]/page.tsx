"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronRight, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"

// Exam names mapping
const examNames: Record<string, string> = {
  gate: "GATE (Graduate Aptitude Test in Engineering)",
}

// Branch names mapping
const branchNames: Record<string, string> = {
  "gate-cse": "Computer Science & IT",
}

// Subject names mapping
const subjectNames: Record<string, string> = {
  s1: "Data Structures",
  s2: "Algorithms",
  s3: "Database Management Systems",
  s4: "Operating Systems",
  s5: "Computer Networks",
  s6: "Object-Oriented Programming",
}

// Topics data
const topicsData: Record<string, Array<{ id: string; name: string; materialCount: number }>> = {
  s1: [
    { id: "t1", name: "Arrays", materialCount: 8 },
    { id: "t2", name: "Linked Lists", materialCount: 6 },
    { id: "t3", name: "Stacks", materialCount: 5 },
    { id: "t4", name: "Queues", materialCount: 5 },
    { id: "t5", name: "Trees", materialCount: 12 },
    { id: "t6", name: "Graphs", materialCount: 10 },
    { id: "t7", name: "Hash Tables", materialCount: 7 },
    { id: "t8", name: "Heaps", materialCount: 6 },
  ],
  s2: [
    { id: "t1", name: "Sorting Algorithms", materialCount: 10 },
    { id: "t2", name: "Searching Algorithms", materialCount: 8 },
    { id: "t3", name: "Dynamic Programming", materialCount: 12 },
    { id: "t4", name: "Greedy Algorithms", materialCount: 9 },
    { id: "t5", name: "Divide and Conquer", materialCount: 7 },
    { id: "t6", name: "Graph Algorithms", materialCount: 11 },
  ],
}

export default function TopicsPage() {
  const params = useParams()
  const examId = (params?.examId as string) || "gate"
  const branchId = (params?.branchId as string) || "gate-cse"
  const subjectId = (params?.subjectId as string) || "s1"

  const examName = examNames[examId] || "GATE (Graduate Aptitude Test in Engineering)"
  const branchName = branchNames[branchId] || "Computer Science & IT"
  const subjectName = subjectNames[subjectId] || "Data Structures"
  const topics = topicsData[subjectId] || topicsData["s1"]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: examName, href: `/exams/${examId}/branches` },
            { label: branchName, href: `/exams/${examId}/${branchId}` },
            { label: subjectName, href: `/exams/${examId}/${branchId}/${subjectId}` },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{subjectName}</h1>
          <p className="text-muted-foreground">Select a topic to view and download study materials.</p>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/exams/${examId}/${branchId}/${subjectId}/${topic.id}`}
            >
              <Card className="p-5 h-full hover:bg-accent hover:border-accent-foreground/20 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">{topic.name}</h3>
                <p className="text-sm text-muted-foreground">{topic.materialCount} materials</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
