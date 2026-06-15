'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
  avatar: string
}

interface CommentSectionProps {
  materialId: string
  isLoggedIn: boolean
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Sayan Mondal',
    content: 'This guide covers all the array topics that appeared in last year\'s MAKAUT exam! The two-pointer technique section was especially helpful. Wish I had found this earlier.',
    createdAt: '2025-01-20',
    avatar: 'SM',
  },
  {
    id: '2',
    author: 'Priya Sharma',
    content: 'Great resource for CSE semester exams. The prefix sum technique explanations are clear and the examples are well-chosen. Definitely helped me prepare better.',
    createdAt: '2025-01-19',
    avatar: 'PS',
  },
  {
    id: '3',
    author: 'Subhajit Kundu',
    content: 'Pretty comprehensive for an array guide. Covers most of the important problems. My only feedback is that the searching section could have more advanced examples.',
    createdAt: '2025-01-18',
    avatar: 'SK',
  },
  {
    id: '4',
    author: 'Sneha Reddy',
    content: 'Exactly what I needed for my Data Structures exam prep! The explanations are beginner-friendly and the difficulty progression is perfect for CSE students.',
    createdAt: '2025-01-17',
    avatar: 'SR',
  },
  {
    id: '5',
    author: 'Vikram Singh',
    content: 'This material helped me understand array traversal and searching better. Previous year MAKAUT questions are similar to the problems covered here.',
    createdAt: '2025-01-16',
    avatar: 'VS',
  },
]

export function CommentSection({ materialId, isLoggedIn }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAllComments, setShowAllComments] = useState(false)

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: `${comments.length + 1}`,
        author: 'You',
        content: newComment,
        createdAt: new Date().toISOString().split('T')[0],
        avatar: 'YO',
      }
      setComments([newCommentObj, ...comments])
      setNewComment('')
      setIsSubmitting(false)
    }, 500)
  }

  const displayedComments = showAllComments ? comments : comments.slice(0, 3)
  const totalComments = 124

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Comments ({totalComments})</h3>

        {isLoggedIn ? (
          <div className="mb-6 space-y-3">
            <Textarea
              placeholder="Share your thoughts about this material..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-24"
              disabled={isSubmitting}
            />
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || isSubmitting}
              size="sm"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Log in to comment on this material.</p>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {displayedComments.map((comment) => (
            <Card key={comment.id} className="p-4">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback className="text-xs font-medium">{comment.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-medium text-sm">{comment.author}</p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.content}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* See all comments button */}
        {!showAllComments && comments.length > 3 && (
          <Button
            variant="ghost"
            onClick={() => setShowAllComments(true)}
            className="mt-4 w-full"
          >
            See all comments
          </Button>
        )}
      </div>
    </div>
  )
}
