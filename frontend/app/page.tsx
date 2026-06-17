'use client'

import Link from "next/link"
import { ArrowRight, Users, Star, BookOpen } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UploadAuthModal } from "@/components/upload-auth-modal"
import { useAuth } from "@/lib/auth-context"

export default function LandingPage() {
  const { isLoggedIn } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleUploadClick = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
            Collaborative Exam Preparation Platform
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Access peer-curated study materials to prepare smarter for your exams.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/exams">
                Browse Materials
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {isLoggedIn ? (
              <Button size="lg" variant="outline" asChild>
                <Link href="/upload">Upload Material</Link>
              </Button>
            ) : (
              <Button size="lg" variant="outline" onClick={handleUploadClick}>
                Upload Material
              </Button>
            )}
          </div>

          <UploadAuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} intendedPath="/upload" />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose PeerPrep</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-start gap-4 p-6 rounded-lg border border-border bg-card">
              <div className="p-3 rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Structured Learning</h3>
              <p className="text-muted-foreground leading-relaxed">
                Navigate through a well-organized hierarchy of exams, branches, subjects, and topics to find exactly
                what you need.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 p-6 rounded-lg border border-border bg-card">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Peer-Curated Content</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access study materials shared and curated by teachers, toppers, and fellow students.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 p-6 rounded-lg border border-border bg-card">
              <div className="p-3 rounded-lg bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Best Materials First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Discover the best materials quickly through community ratings and reviews. Quality content rises to the top.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 p-6 rounded-lg border border-border bg-card">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Community Driven</h3>
              <p className="text-muted-foreground leading-relaxed">
                Contribute your own study materials and help fellow students succeed in their academic journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Preparing?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of students who are acing their exams with PeerPrep.
          </p>
          <Button size="lg" asChild>
            <Link href="/exams">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">PeerPrep</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 PeerPrep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
