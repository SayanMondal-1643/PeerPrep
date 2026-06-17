'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Download, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RatingComponent } from '@/components/rating-component'
import { CommentSection } from '@/components/comment-section'
import { useAuth } from '@/lib/auth-context'

// Mock material data - will be replaced with dynamic data
const mockMaterials = [
  {
    id: '1',
    title: 'Complete Array Problems Guide',
    description: 'A concise guide covering essential array concepts, searching techniques, and problem-solving patterns commonly used in MAKAUT Data Structures exams.',
    fileType: 'PDF',
    fileUrl: '/materials/array-problems.pdf',
    averageRating: 4.8,
    ratingCount: 124,
    uploadedBy: 'Rajesh Kumar',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Linked List Implementation Patterns',
    description: 'Curated problem set with solutions for linked lists including insertion, deletion, and traversal.',
    fileType: 'PDF',
    fileUrl: '/materials/linked-list-patterns.pdf',
    averageRating: 4.6,
    ratingCount: 189,
    uploadedBy: 'Priya Sharma',
    createdAt: '2024-01-10',
  },
]

interface MaterialViewerPageProps {
  params: Promise<{
    examId: string
    branchId: string
    subjectId: string
    topicId: string
    materialId: string
  }>
}

export default async function MaterialViewerPage({ params }: MaterialViewerPageProps) {
  const { examId, branchId, subjectId, topicId, materialId } = await params
  const material = mockMaterials.find(m => m.id === materialId) || mockMaterials[0]
  const backUrl = `/exams/${examId}/${branchId}/${subjectId}/${topicId}`

  return (
    <MaterialViewerContent material={material} backUrl={backUrl} />
  )
}

function MaterialViewerContent({ material, backUrl }: { material: typeof mockMaterials[0], backUrl: string }) {
  const { isLoggedIn } = useAuth()
  const [reportReason, setReportReason] = useState("")
  const [reportComment, setReportComment] = useState("")
  const [reportSubmitted, setReportSubmitted] = useState(false)

  const handleSubmitReport = () => {
    if (!reportReason) {
      alert("Please select a reason for the report")
      return
    }
    console.log("[v0] Report submitted:", { materialId: material.id, reason: reportReason, comment: reportComment })
    setReportSubmitted(true)
    setTimeout(() => {
      setReportReason("")
      setReportComment("")
      setReportSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href={backUrl} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <Button size="sm" asChild>
              <a href={material.fileUrl} download>
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">{material.title}</h1>
            <p className="text-sm text-muted-foreground">By {material.uploadedBy}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white border border-border rounded-lg mb-8 overflow-hidden">
          <div className="h-[600px] overflow-y-auto border-b border-border">
            <div className="p-6 space-y-6 text-sm leading-relaxed">
              {/* Array Basics Section */}
              <div>
                <h3 className="text-lg font-bold mb-3">1. Array Basics</h3>
                <p className="mb-3">
                  An array is a linear data structure that stores a collection of elements of the same type in contiguous memory locations. Arrays provide O(1) access time to any element by its index, making them efficient for direct lookups.
                </p>
                <p className="mb-3">
                  Key characteristics:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Fixed size in most languages (though dynamic arrays like Python lists adjust automatically)</li>
                  <li>Zero-indexed (first element at index 0)</li>
                  <li>Contiguous memory allocation</li>
                  <li>Homogeneous elements (all same type)</li>
                </ul>
              </div>

              {/* Array Traversal Section */}
              <div>
                <h3 className="text-lg font-bold mb-3">2. Array Traversal</h3>
                <p className="mb-3">
                  Traversal is the process of visiting each element of an array exactly once. This is the foundation for many array algorithms.
                </p>
                <p className="mb-3">
                  <strong>Linear Traversal (O(n) time):</strong> Visit each element sequentially from index 0 to n-1. Common uses include finding maximum/minimum, calculating sum, or printing all elements.
                </p>
                <p className="mb-3">
                  <strong>Reverse Traversal (O(n) time):</strong> Visit elements from last to first. Useful for problems requiring backward processing or when you need to maintain relative order in reverse.
                </p>
              </div>

              {/* Searching Section */}
              <div>
                <h3 className="text-lg font-bold mb-3">3. Searching Techniques</h3>
                <p className="mb-3">
                  <strong>Linear Search (O(n) time):</strong> Check each element sequentially until the target is found. Works on unsorted arrays but is inefficient for large datasets.
                </p>
                <p className="mb-3">
                  <strong>Binary Search (O(log n) time):</strong> Requires sorted array. Divide and conquer approach - compare middle element with target, eliminating half of remaining elements each iteration.
                </p>
                <p className="mb-3">
                  <strong>Jump Search (O(√n) time):</strong> Jump ahead by fixed steps, then perform linear search. Good compromise between linear and binary search for certain scenarios.
                </p>
              </div>

              {/* Prefix Sums Section */}
              <div>
                <h3 className="text-lg font-bold mb-3">4. Prefix Sums Technique</h3>
                <p className="mb-3">
                  Prefix sum is a preprocessing technique that allows range sum queries to be answered in O(1) time after O(n) preprocessing.
                </p>
                <p className="mb-3">
                  <strong>Construction:</strong> Create prefix array where prefix[i] = sum of elements from index 0 to i. This can be done in single O(n) pass.
                </p>
                <p className="mb-3">
                  <strong>Range Query:</strong> Sum of elements from index L to R = prefix[R] - prefix[L-1]. This transforms range sum from O(n) to O(1) after preprocessing.
                </p>
                <p>
                  <strong>Common applications:</strong> Range sum queries, finding subarrays with given sum, matrix sum calculations.
                </p>
              </div>

              {/* Two Pointer Section */}
              <div>
                <h3 className="text-lg font-bold mb-3">5. Two-Pointer Technique</h3>
                <p className="mb-3">
                  Two-pointer is a powerful technique using two pointers to traverse array efficiently, reducing space complexity and often achieving O(n) solutions.
                </p>
                <p className="mb-3">
                  <strong>Patterns:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Opposite ends:</strong> Start from beginning and end, move toward center. Used in finding pairs with target sum, container with most water.</li>
                  <li><strong>Same direction:</strong> Both pointers move forward at different speeds. Used in cycle detection, removing duplicates, partition problems.</li>
                  <li><strong>Sliding window:</strong> Maintain window of elements using two pointers. Used in substring problems, max subarray of fixed size.</li>
                </ul>
                <p className="mt-3">
                  <strong>Benefits:</strong> Often reduces nested loops from O(n²) to O(n), maintains relative order easily, minimal extra space.
                </p>
              </div>

              {/* Problem Solving Strategies */}
              <div>
                <h3 className="text-lg font-bold mb-3">6. Common Problem-Solving Strategies</h3>
                <p className="mb-3">
                  <strong>Identify the problem type:</strong> Determine if it's a searching, sorting, partitioning, or pattern-matching problem. This guides your approach.
                </p>
                <p className="mb-3">
                  <strong>Consider constraints:</strong> Analyze time and space limits. O(n log n) may be acceptable for 10^6 elements but not for 10^9 elements.
                </p>
                <p className="mb-3">
                  <strong>Use appropriate techniques:</strong> Match the problem with suitable algorithms. Sorted array? Use binary search. Need range operations? Use prefix sums. Multiple conditions? Try two-pointers.
                </p>
                <p className="mb-3">
                  <strong>Optimize incrementally:</strong> Start with brute force to ensure correctness, then optimize. Many array problems have multiple valid solutions with different complexities.
                </p>
                <p>
                  <strong>Test edge cases:</strong> Empty arrays, single element, duplicates, negative numbers, maximum values. Edge cases often reveal flaws in logic.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Material Info */}
          <section className="border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">About this material</h2>
            <p className="text-muted-foreground mb-6">{material.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Rating:</span>
                <span className="font-medium">{material.averageRating.toFixed(1)}</span>
                <span className="text-muted-foreground">({material.ratingCount} ratings)</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                Uploaded: {new Date(material.createdAt).toLocaleDateString('en-GB')}
              </span>
            </div>
          </section>

          {/* Rating Section */}
          <section className="border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Rate this material</h3>
            {isLoggedIn ? (
              <RatingComponent materialId={material.id} currentRating={0} />
            ) : (
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Log in to rate this material.</p>
              </div>
            )}
          </section>

          {/* Report Section */}
          <section className="border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Report this material</h3>
            {isLoggedIn ? (
              reportSubmitted ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-sm text-green-800">Thank you for your report. We'll review it shortly.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Reason Dropdown */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Reason</label>
                    <select
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      <option value="">Select a reason...</option>
                      <option value="plagiarism">Plagiarism</option>
                      <option value="incorrect-content">Incorrect Content</option>
                      <option value="spam">Spam</option>
                      <option value="inappropriate-content">Inappropriate Content</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Comment Text Input */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Comment</label>
                    <textarea
                      value={reportComment}
                      onChange={(e) => setReportComment(e.target.value)}
                      placeholder="Briefly explain the issue (optional)"
                      className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                      rows={4}
                    />
                  </div>

                  {/* Submit Report Button */}
                  <Button 
                    onClick={handleSubmitReport}
                    className="w-full bg-destructive hover:bg-destructive/90 text-white"
                  >
                    Submit Report
                  </Button>
                </div>
              )
            ) : (
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Log in to report this material.</p>
              </div>
            )}
          </section>

          {/* Comment Section */}
          <section className="border border-border rounded-lg p-6">
            <CommentSection materialId={material.id} isLoggedIn={isLoggedIn} />
          </section>
        </div>
      </div>
    </div>
  )
}
