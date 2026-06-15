'use client'

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"

// Mock data for universities
const universities = [
  {
    id: "makaut",
    name: "Maulana Abul Kalam Azad University of Technology (MAKAUT)",
    description: "Prepare for MAKAUT semester and final exams across all branches",
  },
  {
    id: "jadavpur",
    name: "Jadavpur University",
    description: "Study materials for Jadavpur University examinations",
  },
  {
    id: "calcutta",
    name: "University of Calcutta",
    description: "Comprehensive study resources for Calcutta University",
  },
  {
    id: "kalyani",
    name: "University of Kalyani",
    description: "Materials tailored for Kalyani University curriculum",
  },
]

export default function UniversitiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "University Examinations", href: "/universities" },
          ]}
        />

        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">University Examinations</h1>
          <p className="text-lg text-muted-foreground">
            Select a university to explore branches, subjects, topics and access topic-wise study materials.
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {universities.map((university) => (
            <Link key={university.id} href={`/universities/${university.id}`}>
              <Card className="p-8 h-full cursor-pointer group hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">{university.name}</h2>
                  </div>
                  <div className="flex items-center gap-2 mt-6 text-primary font-medium group-hover:gap-3 transition-all">
                    <span>Explore</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
