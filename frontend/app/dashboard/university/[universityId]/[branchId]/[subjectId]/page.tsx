'use client'

import Link from "next/link"
import { ChevronRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"

// Mock topic data for all subjects
const topicsData: Record<string, Array<{ id: string; name: string; materialCount: number }>> = {
  s1: [ // Data Structures & Algorithms
    { id: "t1", name: "Arrays", materialCount: 5 },
    { id: "t2", name: "Linked Lists", materialCount: 2 },
    { id: "t3", name: "Stacks", materialCount: 5 },
    { id: "t4", name: "Queues", materialCount: 5 },
    { id: "t5", name: "Trees", materialCount: 12 },
    { id: "t6", name: "Graphs", materialCount: 10 },
    { id: "t7", name: "Hash Tables", materialCount: 7 },
    { id: "t8", name: "Heaps", materialCount: 6 },
    { id: "t9", name: "Searching Algorithms", materialCount: 8 },
    { id: "t10", name: "Sorting Algorithms", materialCount: 10 },
  ],
  s3: [ // DBMS
    { id: "t1", name: "SQL Basics", materialCount: 9 },
    { id: "t2", name: "Normalization", materialCount: 8 },
    { id: "t3", name: "Transactions", materialCount: 7 },
    { id: "t4", name: "Indexing", materialCount: 6 },
    { id: "t5", name: "Query Optimization", materialCount: 8 },
    { id: "t6", name: "Joins", materialCount: 7 },
    { id: "t7", name: "Functions and Procedures", materialCount: 5 },
    { id: "t8", name: "Security", materialCount: 6 },
  ],
  s4: [ // OS
    { id: "t1", name: "Process Management", materialCount: 10 },
    { id: "t2", name: "Memory Management", materialCount: 11 },
    { id: "t3", name: "File Systems", materialCount: 9 },
    { id: "t4", name: "Synchronization", materialCount: 8 },
    { id: "t5", name: "Deadlocks", materialCount: 7 },
    { id: "t6", name: "Scheduling", materialCount: 9 },
    { id: "t7", name: "Virtual Memory", materialCount: 8 },
    { id: "t8", name: "I/O Management", materialCount: 6 },
  ],
  s5: [ // Computer Networks
    { id: "t1", name: "OSI Model", materialCount: 8 },
    { id: "t2", name: "TCP/IP Protocol", materialCount: 10 },
    { id: "t3", name: "Routing", materialCount: 9 },
    { id: "t4", name: "Switching", materialCount: 7 },
    { id: "t5", name: "DNS", materialCount: 6 },
    { id: "t6", name: "DHCP", materialCount: 5 },
    { id: "t7", name: "Network Security", materialCount: 8 },
    { id: "t8", name: "Wireless Networks", materialCount: 7 },
  ],
  s6: [ // OOP
    { id: "t1", name: "Classes and Objects", materialCount: 9 },
    { id: "t2", name: "Inheritance", materialCount: 8 },
    { id: "t3", name: "Polymorphism", materialCount: 7 },
    { id: "t4", name: "Abstraction", materialCount: 6 },
    { id: "t5", name: "Encapsulation", materialCount: 6 },
    { id: "t6", name: "Design Patterns", materialCount: 8 },
    { id: "t7", name: "Exception Handling", materialCount: 5 },
    { id: "t8", name: "Collections", materialCount: 7 },
  ],
}

const subjectNames: Record<string, string> = {
  s1: "Data Structures & Algorithms",
  s3: "Database Management Systems",
  s4: "Operating Systems",
  s5: "Computer Networks",
  s6: "Object-Oriented Programming",
}

const universityNames: Record<string, string> = {
  makaut: "Maulana Abul Kalam Azad University of Technology (MAKAUT)",
  jadavpur: "Jadavpur University",
  calcutta: "University of Calcutta",
  kalyani: "University of Kalyani",
}

const universityBranchNames: Record<string, Record<string, string>> = {
  makaut: {
    "makaut-cse": "Computer Science and Engineering",
    "makaut-it": "Information Technology",
    "makaut-ece": "Electronics and Communication Engineering",
    "makaut-mech": "Mechanical Engineering",
    "makaut-civil": "Civil Engineering",
    "makaut-electrical": "Electrical Engineering",
    "makaut-chemical": "Chemical Engineering",
  },
  jadavpur: {
    "jadavpur-cse": "Computer Science and Engineering",
    "jadavpur-it": "Information Technology",
    "jadavpur-ece": "Electronics and Communication Engineering",
    "jadavpur-mech": "Mechanical Engineering",
    "jadavpur-civil": "Civil Engineering",
    "jadavpur-electrical": "Electrical Engineering",
    "jadavpur-chemical": "Chemical Engineering",
  },
  calcutta: {
    "calcutta-cse": "Computer Science and Engineering",
    "calcutta-it": "Information Technology",
    "calcutta-ece": "Electronics and Communication Engineering",
    "calcutta-mech": "Mechanical Engineering",
    "calcutta-civil": "Civil Engineering",
    "calcutta-electrical": "Electrical Engineering",
    "calcutta-chemical": "Chemical Engineering",
  },
  kalyani: {
    "kalyani-cse": "Computer Science and Engineering",
    "kalyani-it": "Information Technology",
    "kalyani-ece": "Electronics and Communication Engineering",
    "kalyani-mech": "Mechanical Engineering",
    "kalyani-civil": "Civil Engineering",
    "kalyani-electrical": "Electrical Engineering",
    "kalyani-chemical": "Chemical Engineering",
  },
}

interface Params {
  params: Promise<{ universityId: string; branchId: string; subjectId: string }>
}

export default async function UniversityTopicsPage({ params }: Params) {
  const { universityId, branchId, subjectId } = await params
  const topics = topicsData[subjectId] || []
  const subjectName = subjectNames[subjectId] || "Subject"
  const universityName = universityNames[universityId] || "University"
  const branchName = universityBranchNames[universityId]?.[branchId] || "Branch"

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "University Examinations", href: "/universities" },
            { label: universityName, href: `/universities/${universityId}` },
            { label: branchName, href: `/universities/${universityId}/${branchId}` },
            { label: subjectName, href: `/dashboard/university/${universityId}/${branchId}/${subjectId}` },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{subjectName}</h1>
          <p className="text-muted-foreground">Select a topic to view and download peer-curated study materials.</p>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/dashboard/university/${universityId}/${branchId}/${subjectId}/${topic.id}`}
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
