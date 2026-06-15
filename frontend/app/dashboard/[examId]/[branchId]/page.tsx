"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"

// Exam names mapping
const examNames: Record<string, string> = {
  gate: "GATE (Graduate Aptitude Test in Engineering)",
}

// Branch names mapping
const branchNames: Record<string, string> = {
  "gate-cse": "Computer Science & IT",
  "gate-ece": "Electronics & Communication",
  "gate-civil": "Civil Engineering",
  "gate-mech": "Mechanical Engineering",
  "gate-electrical": "Electrical Engineering",
  "gate-chemical": "Chemical Engineering",
  "gate-instrumentation": "Instrumentation Engineering",
}

// Mock data for GATE subjects (remains unchanged as required)
const subjectsData: Record<string, Array<{ id: string; name: string; topicCount: number; materialCount: number }>> = {
  "gate-cse": [
    { id: "s1", name: "Data Structures", topicCount: 12, materialCount: 45 },
    { id: "s2", name: "Algorithms", topicCount: 15, materialCount: 58 },
    { id: "s3", name: "Database Management Systems", topicCount: 10, materialCount: 32 },
    { id: "s4", name: "Operating Systems", topicCount: 14, materialCount: 41 },
    { id: "s5", name: "Computer Networks", topicCount: 11, materialCount: 38 },
    { id: "s6", name: "Object-Oriented Programming", topicCount: 8, materialCount: 29 },
  ],
  "gate-ece": [
    { id: "s1", name: "Digital Electronics", topicCount: 12, materialCount: 42 },
    { id: "s2", name: "Analog Electronics", topicCount: 10, materialCount: 38 },
    { id: "s3", name: "Signals & Systems", topicCount: 9, materialCount: 35 },
    { id: "s4", name: "Communications", topicCount: 8, materialCount: 30 },
  ],
  "gate-instrumentation": [
    { id: "s1", name: "Transducers & Sensors", topicCount: 10, materialCount: 38 },
    { id: "s2", name: "Analog Circuits", topicCount: 9, materialCount: 32 },
    { id: "s3", name: "Measurement Systems", topicCount: 8, materialCount: 28 },
    { id: "s4", name: "Signal Conditioning", topicCount: 7, materialCount: 25 },
  ],
}

export default function SubjectsPage() {
  const params = useParams()
  const router = useRouter()
  const examId = (params?.examId as string) || "gate"
  const branchId = (params?.branchId as string) || "gate-cse"

  // If branchId is "branches", redirect to the branches page
  useEffect(() => {
    if (branchId === "branches") {
      router.push(`/dashboard/${examId}/branches`)
    }
  }, [branchId, examId, router])

  // Don't render if we're redirecting
  if (branchId === "branches") {
    return null
  }

  const examName = examNames[examId] || "GATE (Graduate Aptitude Test in Engineering)"
  const branchName = branchNames[branchId] || "Computer Science & IT"
  const subjects = subjectsData[branchId] || subjectsData["gate-cse"]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: examName, href: `/dashboard/${examId}/branches` },
            { label: branchName, href: `/dashboard/${examId}/${branchId}` },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{branchName}</h1>
          <p className="text-muted-foreground">Select a subject to view topics and study materials.</p>
        </div>

        {/* Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Link key={subject.id} href={`/dashboard/${examId}/${branchId}/${subject.id}`}>
              <Card className="p-6 h-full hover:bg-accent hover:border-accent-foreground/20 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{subject.name}</h3>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{subject.topicCount} topics</span>
                  <span>•</span>
                  <span>{subject.materialCount} materials</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
