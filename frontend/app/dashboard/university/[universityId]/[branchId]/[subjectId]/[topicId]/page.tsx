'use client'

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Star, Download, Trophy, FileText, GraduationCap, Medal, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { useAuth } from "@/lib/auth-context"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Materials data by topic
const topicMaterials: { [key: string]: any[] } = {
  t1: [ // Arrays
    {
      id: "m1",
      title: "Complete Array Problems Guide",
      description: "A concise guide covering essential array concepts, searching techniques, and problem-solving patterns commonly used in MAKAUT Data Structures exams.",
      fileType: "PDF",
      fileUrl: "/materials/arrays-guide.pdf",
      averageRating: 4.8,
      ratingCount: 124,
      isBest: true,
      isTopper: false,
      isTeacher: true,
      uploadedBy: "Rajesh Kumar",
      createdAt: "2025-01-15",
    },
    {
      id: "m2",
      title: "Array Algorithms Cheat Sheet",
      description: "Quick reference for sorting, searching, and sliding window patterns",
      fileType: "PDF",
      fileUrl: "/materials/array-cheatsheet.pdf",
      averageRating: 4.6,
      ratingCount: 89,
      isBest: false,
      isTopper: true,
      isTeacher: false,
      uploadedBy: "Priya Sharma",
      createdAt: "2025-01-12",
    },
    {
      id: "m3",
      title: "Two Pointer Technique Explained",
      description: "Master the two-pointer approach with visual explanations and practice problems",
      fileType: "PDF",
      fileUrl: "/materials/two-pointer.pdf",
      averageRating: 4.2,
      ratingCount: 67,
      isBest: false,
      isTopper: false,
      isTeacher: false,
      uploadedBy: "Amit Patel",
      createdAt: "2025-01-10",
    },
    {
      id: "m4",
      title: "Kadane's Algorithm Deep Dive",
      description: "Understanding maximum subarray problems with variations and applications",
      fileType: "PDF",
      fileUrl: "/materials/kadanes.pdf",
      averageRating: 4.0,
      ratingCount: 60,
      isBest: false,
      isTopper: false,
      isTeacher: false,
      uploadedBy: "Sneha Reddy",
      createdAt: "2025-01-08",
    },
    {
      id: "m5",
      title: "Array Rotation Techniques",
      description: "Different methods to rotate arrays efficiently with time complexity analysis",
      fileType: "PDF",
      fileUrl: "/materials/rotation.pdf",
      averageRating: 4.8,
      ratingCount: 10,
      isBest: false,
      isTopper: false,
      isTeacher: false,
      uploadedBy: "Vikram Singh",
      createdAt: "2025-01-05",
    },
  ],
  t2: [ // Linked Lists
    {
      id: "ll1",
      title: "Linked Lists Fundamentals",
      description: "Complete guide to linked list operations including insertion, deletion, and traversal",
      fileType: "PDF",
      fileUrl: "/materials/linked-lists-fundamentals.pdf",
      averageRating: 3,
      ratingCount: 2,
      isBest: true,
      isTopper: false,
      isTeacher: false,
      isAIPick: true,
      uploadedBy: "Deepak Verma",
      createdAt: "2025-01-18",
    },
    {
      id: "ll2",
      title: "Linked List Problems & Solutions",
      description: "Step-by-step solutions to common linked list interview questions with explanations",
      fileType: "PDF",
      fileUrl: "/materials/linked-list-problems.pdf",
      averageRating: 5,
      ratingCount: 1,
      isBest: false,
      isTopper: false,
      isTeacher: false,
      isAIPick: false,
      uploadedBy: "Neha Singh",
      createdAt: "2025-01-14",
    },
  ],
}

const getMockData = (topicId: string) => {
  return {
    materials: topicMaterials[topicId] || topicMaterials["t1"],
  }
}

const subjectNames: Record<string, string> = {
  s1: "Data Structures & Algorithms",
  s2: "Algorithms",
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

interface TopicNames {
  t1: string
  t2: string
  [key: string]: string
}

const topicNames: TopicNames = {
  t1: "Arrays",
  t2: "Linked Lists",
  t3: "Stacks",
  t4: "Queues",
  t5: "Trees",
  t6: "Graphs",
  t7: "Hash Tables",
  t8: "Heaps",
}

export default function MaterialsPage() {
  const { isLoggedIn, user } = useAuth()
  const params = useParams()
  const universityId = params?.universityId as string || "makaut"
  const branchId = params?.branchId as string || "makaut-cse"
  const subjectId = params?.subjectId as string || "s1"
  const topicId = params?.topicId as string || "t1"
  const mockData = getMockData(topicId)
  const [userRatings, setUserRatings] = useState<{ [key: string]: number }>({})

  const handleRating = (materialId: string, rating: number) => {
    setUserRatings((prev) => ({ ...prev, [materialId]: rating }))
  }

  const subjectName = subjectNames[subjectId] || "Subject"
  const universityName = universityNames[universityId] || "University"
  const branchName = universityBranchNames[universityId]?.[branchId] || "Branch"
  const topicName = topicNames[topicId] || "Topic"

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
            { label: topicName, href: `/dashboard/university/${universityId}/${branchId}/${subjectId}/${topicId}` },
          ]}
        />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">{topicName}</h1>
        </div>

        {/* Materials Grid */}
        <div className="space-y-4">
          {mockData.materials.map((material) => {
            const userRating = userRatings[material.id]
            return (
              <Card key={material.id} className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => window.location.href = `/dashboard/${universityId}/${branchId}/${subjectId}/${topicId}/${material.id}`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{material.title}</h3>
                          {material.isBest && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Trophy className="h-4 w-4 text-amber-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Best Material</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {material.isTopper && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Medal className="h-4 w-4 text-yellow-600" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Topper's Material</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {material.isAIPick && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Bot className="h-4 w-4 text-purple-600 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>AI Pick</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{material.description}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        {user?.email === 'admin@example.com' && (
                          <Button 
                            size="sm"
                            className={material.isBest ? "bg-destructive hover:bg-destructive/90 text-white" : "bg-amber-500 hover:bg-amber-600 text-white"}
                            onClick={(e) => {
                              e.stopPropagation()
                              console.log("[v0] Admin toggled best material status for:", material.id)
                            }}
                          >
                            {material.isBest ? "Remove Best" : "Set as Best"}
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          asChild
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a href={material.fileUrl} download>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRating(material.id, star)
                              }}
                              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                            >
                              <Star
                                className={`h-4 w-4 transition-colors ${
                                  star <= (userRating || material.averageRating)
                                    ? "fill-primary text-primary"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                        <span className="font-medium">{material.averageRating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({material.ratingCount} ratings)</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{material.fileType}</span>
                      <span className="text-muted-foreground">•</span>
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">By {material.uploadedBy}</span>
                        {material.isTeacher && (
                          <GraduationCap className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
