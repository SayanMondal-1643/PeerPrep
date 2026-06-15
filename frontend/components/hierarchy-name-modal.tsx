'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface HierarchyNameModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (name: string) => void
  title: string
  description: string
  placeholder: string
  initialValue?: string
  isLoading?: boolean
}

export function HierarchyNameModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  placeholder,
  initialValue = '',
  isLoading = false,
}: HierarchyNameModalProps) {
  const [name, setName] = useState(initialValue)

  useEffect(() => {
    setName(initialValue)
  }, [initialValue, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim())
      setName('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="prose prose-sm max-w-none">
            {description.includes('**') ? (
              description.split(/(\*\*[^*]+\*\*)/g).map((part, idx) => 
                part.startsWith('**') ? <strong key={idx}>{part.slice(2, -2)}</strong> : part
              )
            ) : (
              description
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder={placeholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            disabled={isLoading}
          />

          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !name.trim()}>
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
