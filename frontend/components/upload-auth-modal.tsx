'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface UploadAuthModalProps {
  isOpen: boolean
  onClose: () => void
  intendedPath?: string
}

export function UploadAuthModal({ isOpen, onClose, intendedPath = '/upload' }: UploadAuthModalProps) {
  const loginUrl = `/auth/login?redirect=${encodeURIComponent(intendedPath)}`
  const signupUrl = `/auth/signup?redirect=${encodeURIComponent(intendedPath)}`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Authentication Required</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <DialogDescription className="text-base text-center">
            You need to log in to upload study materials.
          </DialogDescription>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
            <Button asChild className="flex-1" variant="default">
              <Link href={loginUrl}>Log In</Link>
            </Button>
            <Button asChild className="flex-1" variant="outline">
              <Link href={signupUrl}>Sign Up</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
