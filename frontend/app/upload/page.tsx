"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data - will be replaced with database queries
const exams = [
  { id: "gate", name: "GATE" },
  { id: "university", name: "College / University Exams" },
]

const universities = [
  { id: "makaut", name: "Maulana Abul Kalam Azad University of Technology (MAKAUT)" },
  { id: "jadavpur", name: "Jadavpur University" },
  { id: "calcutta", name: "University of Calcutta" },
  { id: "kalyani", name: "University of Kalyani" },
]

const branchesByExamAndUniversity: { [key: string]: Array<{ id: string; name: string }> } = {
  // GATE branches
  "gate": [
    { id: "gate-cse", name: "Computer Science & IT" },
    { id: "gate-ece", name: "Electronics & Communication" },
    { id: "gate-civil", name: "Civil Engineering" },
    { id: "gate-mech", name: "Mechanical Engineering" },
    { id: "gate-electrical", name: "Electrical Engineering" },
    { id: "gate-chemical", name: "Chemical Engineering" },
  ],
  // University branches (same for all universities)
  "makaut": [
    { id: "uni-cse", name: "Computer Science and Engineering" },
    { id: "uni-it", name: "Information Technology" },
    { id: "uni-ece", name: "Electronics and Communication Engineering" },
    { id: "uni-mech", name: "Mechanical Engineering" },
    { id: "uni-civil", name: "Civil Engineering" },
    { id: "uni-electrical", name: "Electrical Engineering" },
    { id: "uni-chemical", name: "Chemical Engineering" },
  ],
  "jadavpur": [
    { id: "uni-cse", name: "Computer Science and Engineering" },
    { id: "uni-it", name: "Information Technology" },
    { id: "uni-ece", name: "Electronics and Communication Engineering" },
    { id: "uni-mech", name: "Mechanical Engineering" },
    { id: "uni-civil", name: "Civil Engineering" },
    { id: "uni-electrical", name: "Electrical Engineering" },
    { id: "uni-chemical", name: "Chemical Engineering" },
  ],
  "calcutta": [
    { id: "uni-cse", name: "Computer Science and Engineering" },
    { id: "uni-it", name: "Information Technology" },
    { id: "uni-ece", name: "Electronics and Communication Engineering" },
    { id: "uni-mech", name: "Mechanical Engineering" },
    { id: "uni-civil", name: "Civil Engineering" },
    { id: "uni-electrical", name: "Electrical Engineering" },
    { id: "uni-chemical", name: "Chemical Engineering" },
  ],
  "kalyani": [
    { id: "uni-cse", name: "Computer Science and Engineering" },
    { id: "uni-it", name: "Information Technology" },
    { id: "uni-ece", name: "Electronics and Communication Engineering" },
    { id: "uni-mech", name: "Mechanical Engineering" },
    { id: "uni-civil", name: "Civil Engineering" },
    { id: "uni-electrical", name: "Electrical Engineering" },
    { id: "uni-chemical", name: "Chemical Engineering" },
  ],
}

const subjectsByBranch: { [key: string]: Array<{ id: string; name: string }> } = {
  // GATE branches
  "gate-cse": [
    { id: "s1", name: "Data Structures" },
    { id: "s2", name: "Algorithms" },
    { id: "s3", name: "Database Management Systems" },
    { id: "s4", name: "Operating Systems" },
    { id: "s5", name: "Computer Networks" },
  ],
  "gate-ece": [
    { id: "s6", name: "Digital Electronics" },
    { id: "s7", name: "Analog Electronics" },
    { id: "s8", name: "Signals and Systems" },
  ],
  "gate-civil": [
    { id: "s9", name: "Structural Analysis" },
    { id: "s10", name: "Concrete Technology" },
  ],
  // University branches
  "uni-cse": [
    { id: "s1", name: "Data Structures & Algorithms" },
    { id: "s3", name: "Database Management Systems" },
    { id: "s4", name: "Operating Systems" },
    { id: "s5", name: "Computer Networks" },
    { id: "s15", name: "Object-Oriented Programming" },
  ],
  "uni-it": [
    { id: "s11", name: "Web Development" },
    { id: "s12", name: "Mobile Development" },
    { id: "s13", name: "Cloud Computing" },
  ],
  "uni-ece": [
    { id: "s6", name: "Digital Electronics" },
    { id: "s7", name: "Analog Electronics" },
    { id: "s14", name: "Microcontrollers" },
  ],
}

const topicsBySubject: { [key: string]: Array<{ id: string; name: string }> } = {
  s1: [
    { id: "t1", name: "Arrays" },
    { id: "t2", name: "Linked Lists" },
    { id: "t14", name: "Stacks" },
    { id: "t15", name: "Queues" },
    { id: "t3", name: "Trees" },
    { id: "t16", name: "Graphs" },
    { id: "t17", name: "Hash Tables" },
    { id: "t18", name: "Heaps" },
    { id: "t19", name: "Searching Algorithms" },
    { id: "t20", name: "Sorting Algorithms" },
  ],
  s3: [
    { id: "t7", name: "Relational Model" },
    { id: "t8", name: "SQL Queries" },
  ],
  s4: [
    { id: "t9", name: "Process Management" },
    { id: "t10", name: "Memory Management" },
  ],
  s5: [
    { id: "t21", name: "Protocols" },
    { id: "t22", name: "Routing" },
  ],
  s15: [
    { id: "t23", name: "Classes and Objects" },
    { id: "t24", name: "Inheritance and Polymorphism" },
  ],
  s6: [
    { id: "t11", name: "Logic Gates" },
    { id: "t12", name: "Combinational Circuits" },
  ],
}

export default function UploadPage() {
  const [selectedExam, setSelectedExam] = useState("")
  const [selectedUniversity, setSelectedUniversity] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [fileName, setFileName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isUniversityExam = selectedExam === "university"
  
  // Determine which key to use for branches lookup
  const branchesKey = isUniversityExam ? selectedUniversity : selectedExam
  const branches = branchesKey ? branchesByExamAndUniversity[branchesKey] || [] : []
  const subjects = selectedBranch ? subjectsByBranch[selectedBranch] || [] : []
  const topics = selectedSubject ? topicsBySubject[selectedSubject] || [] : []

  // Reset dependent fields when exam changes
  const handleExamChange = (examId: string) => {
    setSelectedExam(examId)
    setSelectedUniversity("")
    setSelectedBranch("")
    setSelectedSubject("")
    setSelectedTopic("")
  }

  // Reset dependent fields when university changes
  const handleUniversityChange = (universityId: string) => {
    setSelectedUniversity(universityId)
    setSelectedBranch("")
    setSelectedSubject("")
    setSelectedTopic("")
  }

  // Reset dependent fields when branch changes
  const handleBranchChange = (branchId: string) => {
    setSelectedBranch(branchId)
    setSelectedSubject("")
    setSelectedTopic("")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("Material uploaded successfully!")
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Study Material</h1>
          <p className="text-muted-foreground">
            Share your study materials with the community. Help fellow students prepare for their exams.
          </p>
        </div>

        <Card className="p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Exam Selection */}
            <div className="space-y-2">
              <Label htmlFor="exam">Exam *</Label>
              <Select value={selectedExam} onValueChange={handleExamChange}>
                <SelectTrigger id="exam">
                  <SelectValue placeholder="Select exam" />
                </SelectTrigger>
                <SelectContent>
                  {exams.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id}>
                      {exam.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Conditional University Selection */}
            {isUniversityExam && (
              <div className="space-y-2">
                <Label htmlFor="university">College / University Name *</Label>
                <Select value={selectedUniversity} onValueChange={handleUniversityChange}>
                  <SelectTrigger id="university">
                    <SelectValue placeholder="Select university" />
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map((uni) => (
                      <SelectItem key={uni.id} value={uni.id}>
                        {uni.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Branch Selection */}
            <div className="space-y-2">
              <Label htmlFor="branch">Branch *</Label>
              <Select
                value={selectedBranch}
                onValueChange={handleBranchChange}
                disabled={!selectedExam || (isUniversityExam && !selectedUniversity) || branches.length === 0}
              >
                <SelectTrigger id="branch">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subject Selection */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Select
                value={selectedSubject}
                onValueChange={(subjectId) => {
                  setSelectedSubject(subjectId)
                  setSelectedTopic("")
                }}
                disabled={!selectedBranch || subjects.length === 0}
              >
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Topic Selection */}
            <div className="space-y-2">
              <Label htmlFor="topic">Topic *</Label>
              <Select
                value={selectedTopic}
                onValueChange={setSelectedTopic}
                disabled={!selectedSubject || topics.length === 0}
              >
                <SelectTrigger id="topic">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic.id} value={topic.id}>
                      {topic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="border-t border-border pt-6" />

            {/* Material Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Material Title *</Label>
              <Input id="title" placeholder="e.g., Complete Array Problems Guide" required />
            </div>

            {/* Material Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe what this material covers, key topics, and who it's best for..."
                rows={4}
                required
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="file">Upload File *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                {fileName ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-medium">{fileName}</span>
                    <button
                      type="button"
                      onClick={() => setFileName("")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your file here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, PPT, PPTX (Max 50MB)</p>
                  </>
                )}
                <Input
                  id="file"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  onChange={handleFileChange}
                  required
                />
                {!fileName && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4 bg-transparent"
                    onClick={() => document.getElementById("file")?.click()}
                  >
                    Choose File
                  </Button>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-6" />

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Uploading..." : "Upload Material"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
