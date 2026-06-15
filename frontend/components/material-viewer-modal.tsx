'use client'

import { X, Download, FileText } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { RatingComponent } from '@/components/rating-component'
import { CommentSection } from '@/components/comment-section'
import { useAuth } from '@/lib/auth-context'

interface Material {
  id: string
  title: string
  description: string
  fileType: string
  fileUrl: string
  averageRating: number
  ratingCount: number
  uploadedBy: string
  createdAt: string
}

interface MaterialViewerModalProps {
  isOpen: boolean
  onClose: () => void
  material: Material | null
}

export function MaterialViewerModal({ isOpen, onClose, material }: MaterialViewerModalProps) {
  const { isLoggedIn } = useAuth()

  if (!material) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{material.title}</h2>
              <p className="text-sm text-muted-foreground">By {material.uploadedBy}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" asChild>
              <a href={material.fileUrl} download>
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            </Button>
            <span className="text-sm text-muted-foreground">{material.fileType} File</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Material Viewer */}
          <div className="p-6 border-b border-border">
            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center min-h-96">
              <div className="text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  {material.fileType} Viewer
                </p>
                <p className="text-xs text-muted-foreground">
                  {material.title}
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  Click "Download" to view the full material
                </p>
              </div>
            </div>
          </div>

          {/* Material Info */}
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold mb-2">About this material</h3>
            <p className="text-sm text-muted-foreground mb-4">{material.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">
                Rating: <span className="font-medium text-foreground">{material.averageRating.toFixed(1)}</span> ({material.ratingCount} ratings)
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">Uploaded: {new Date(material.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Rating Component */}
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold mb-4">Rate this material</h3>
            {isLoggedIn ? (
              <RatingComponent materialId={material.id} currentRating={0} />
            ) : (
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Log in to rate this material.</p>
              </div>
            )}
          </div>

          {/* Comment Section */}
          <div className="p-6">
            <CommentSection materialId={material.id} isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
