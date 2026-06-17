'use client'

import Link from "next/link"
import { BookOpen, ChevronRight, ChevronLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"

// Mock data for subjects by branch
const subjectsData: Record<string, Array<{ id: string; name: string; topicCount: number; materialCount: number }>> = {
  "makaut-cse": [
    { id: "s1", name: "Data Structures & Algorithms", topicCount: 10, materialCount: 70 },
    { id: "s3", name: "Database Management Systems", topicCount: 10, materialCount: 32 },
    { id: "s4", name: "Operating Systems", topicCount: 14, materialCount: 41 },
    { id: "s5", name: "Computer Networks", topicCount: 11, materialCount: 38 },
    { id: "s6", name: "Object-Oriented Programming", topicCount: 8, materialCount: 29 },
  ],
  "makaut-it": [
    { id: "s1", name: "Web Development", topicCount: 10, materialCount: 42 },
    { id: "s2", name: "Mobile App Development", topicCount: 12, materialCount: 51 },
    { id: "s3", name: "Cloud Computing", topicCount: 9, materialCount: 28 },
    { id: "s4", name: "Cybersecurity", topicCount: 11, materialCount: 39 },
    { id: "s5", name: "Database Design", topicCount: 8, materialCount: 25 },
    { id: "s6", name: "Software Engineering", topicCount: 13, materialCount: 47 },
  ],
  "makaut-ece": [
    { id: "s1", name: "Digital Electronics", topicCount: 12, materialCount: 44 },
    { id: "s2", name: "Analog Electronics", topicCount: 14, materialCount: 56 },
    { id: "s3", name: "Signal Processing", topicCount: 10, materialCount: 33 },
    { id: "s4", name: "Communication Systems", topicCount: 11, materialCount: 40 },
    { id: "s5", name: "Microprocessors", topicCount: 9, materialCount: 31 },
    { id: "s6", name: "Electromagnetic Theory", topicCount: 13, materialCount: 48 },
  ],
  "makaut-mech": [
    { id: "s1", name: "Thermodynamics", topicCount: 11, materialCount: 43 },
    { id: "s2", name: "Mechanics of Materials", topicCount: 13, materialCount: 52 },
    { id: "s3", name: "Fluid Mechanics", topicCount: 10, materialCount: 35 },
    { id: "s4", name: "Machine Design", topicCount: 12, materialCount: 46 },
    { id: "s5", name: "Manufacturing Technology", topicCount: 9, materialCount: 30 },
    { id: "s6", name: "Control Systems", topicCount: 8, materialCount: 27 },
  ],
  "makaut-civil": [
    { id: "s1", name: "Structural Analysis", topicCount: 14, materialCount: 54 },
    { id: "s2", name: "Geotechnical Engineering", topicCount: 12, materialCount: 49 },
    { id: "s3", name: "Water Resources Engineering", topicCount: 11, materialCount: 41 },
    { id: "s4", name: "Transportation Engineering", topicCount: 10, materialCount: 36 },
    { id: "s5", name: "Environmental Engineering", topicCount: 9, materialCount: 32 },
    { id: "s6", name: "Construction Management", topicCount: 8, materialCount: 28 },
  ],
  "makaut-electrical": [
    { id: "s1", name: "Power Systems", topicCount: 13, materialCount: 51 },
    { id: "s2", name: "Electrical Machines", topicCount: 12, materialCount: 47 },
    { id: "s3", name: "Circuit Theory", topicCount: 11, materialCount: 43 },
    { id: "s4", name: "Control Systems", topicCount: 10, materialCount: 38 },
    { id: "s5", name: "Power Electronics", topicCount: 11, materialCount: 44 },
    { id: "s6", name: "High Voltage Engineering", topicCount: 9, materialCount: 34 },
  ],
  "makaut-chemical": [
    { id: "s1", name: "Chemical Reaction Engineering", topicCount: 12, materialCount: 45 },
    { id: "s2", name: "Process Engineering", topicCount: 11, materialCount: 42 },
    { id: "s3", name: "Plant Design", topicCount: 10, materialCount: 37 },
    { id: "s4", name: "Bioprocess Engineering", topicCount: 9, materialCount: 33 },
    { id: "s5", name: "Energy Engineering", topicCount: 8, materialCount: 29 },
    { id: "s6", name: "Petroleum Refining", topicCount: 7, materialCount: 25 },
  ],
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
  params: Promise<{ universityId: string; branchId: string }>
}

export default async function BranchSubjectsPage({ params }: Params) {
  const { universityId, branchId } = await params
  const subjects = subjectsData[branchId] || []
  const branchName = universityBranchNames[universityId]?.[branchId] || "Unknown Branch"

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/exams" },
            { label: "University Examinations", href: "/universities" },
            { label: universityNames[universityId] || "University", href: `/universities/${universityId}` },
            { label: branchName, href: `/universities/${universityId}/${branchId}` },
          ]}
        />

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{branchName}</h1>
          <p className="text-muted-foreground">Select a subject to explore topics and access topic-wise study materials.</p>
        </div>

        {/* Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/exams/university/${universityId}/${branchId}/${subject.id}`}
            >
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
