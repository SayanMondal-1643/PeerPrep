'use client'

import Link from "next/link"
import { BookOpen, ChevronLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"

// Mock data for universities and their branches
const universitiesData: Record<
  string,
  { name: string; branches: Array<{ id: string; name: string }> }
> = {
  makaut: {
    name: "Maulana Abul Kalam Azad University of Technology (MAKAUT)",
    branches: [
      { id: "makaut-cse", name: "Computer Science and Engineering" },
      { id: "makaut-it", name: "Information Technology" },
      { id: "makaut-ece", name: "Electronics and Communication Engineering" },
      { id: "makaut-mech", name: "Mechanical Engineering" },
      { id: "makaut-civil", name: "Civil Engineering" },
      { id: "makaut-electrical", name: "Electrical Engineering" },
      { id: "makaut-chemical", name: "Chemical Engineering" },
    ],
  },
  jadavpur: {
    name: "Jadavpur University",
    branches: [
      { id: "jadavpur-cse", name: "Computer Science and Engineering" },
      { id: "jadavpur-it", name: "Information Technology" },
      { id: "jadavpur-ece", name: "Electronics and Communication Engineering" },
      { id: "jadavpur-mech", name: "Mechanical Engineering" },
      { id: "jadavpur-civil", name: "Civil Engineering" },
      { id: "jadavpur-electrical", name: "Electrical Engineering" },
      { id: "jadavpur-chemical", name: "Chemical Engineering" },
    ],
  },
  calcutta: {
    name: "University of Calcutta",
    branches: [
      { id: "calcutta-cse", name: "Computer Science and Engineering" },
      { id: "calcutta-it", name: "Information Technology" },
      { id: "calcutta-ece", name: "Electronics and Communication Engineering" },
      { id: "calcutta-mech", name: "Mechanical Engineering" },
      { id: "calcutta-civil", name: "Civil Engineering" },
      { id: "calcutta-electrical", name: "Electrical Engineering" },
      { id: "calcutta-chemical", name: "Chemical Engineering" },
    ],
  },
  kalyani: {
    name: "University of Kalyani",
    branches: [
      { id: "kalyani-cse", name: "Computer Science and Engineering" },
      { id: "kalyani-it", name: "Information Technology" },
      { id: "kalyani-ece", name: "Electronics and Communication Engineering" },
      { id: "kalyani-mech", name: "Mechanical Engineering" },
      { id: "kalyani-civil", name: "Civil Engineering" },
      { id: "kalyani-electrical", name: "Electrical Engineering" },
      { id: "kalyani-chemical", name: "Chemical Engineering" },
    ],
  },
}

interface Params {
  params: Promise<{ universityId: string }>
}

export default async function UniversityBranchesPage({ params }: Params) {
  const { universityId } = await params
  const data = universitiesData[universityId]

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">University not found</p>
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
            { label: "Dashboard", href: "/dashboard" },
            { label: "University Examinations", href: "/universities" },
            { label: data.name, href: `/universities/${universityId}` },
          ]}
        />

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
          <p className="text-muted-foreground">
            Select a branch to explore subjects, topics and access topic-wise study materials.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.branches.map((branch) => (
            <Link key={branch.id} href={`/universities/${universityId}/${branch.id}`}>
              <Card className="p-6 h-full cursor-pointer group hover:shadow-md hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold group-hover:text-primary transition-colors">
                      {branch.name}
                    </h3>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transform rotate-180 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
