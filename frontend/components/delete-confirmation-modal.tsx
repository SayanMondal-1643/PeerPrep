'use client'

import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  cascadeInfo?: {
    branches?: number
    subjects?: number
    topics?: number
    materials?: number
  }
  itemName: string
  isLoading?: boolean
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  cascadeInfo,
  itemName,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription className="pt-2">{description}</DialogDescription>
        </DialogHeader>

        {/* Cascade Impact */}
        {cascadeInfo && Object.values(cascadeInfo).some(v => v > 0) && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-4 my-4">
            <p className="text-sm font-semibold text-red-900 dark:text-red-200 mb-2">This will also delete:</p>
            <ul className="text-sm text-red-800 dark:text-red-300 space-y-1">
              {cascadeInfo.branches !== undefined && cascadeInfo.branches > 0 && (
                <li>• {cascadeInfo.branches} branch{cascadeInfo.branches !== 1 ? 'es' : ''}</li>
              )}
              {cascadeInfo.subjects !== undefined && cascadeInfo.subjects > 0 && (
                <li>• {cascadeInfo.subjects} subject{cascadeInfo.subjects !== 1 ? 's' : ''}</li>
              )}
              {cascadeInfo.topics !== undefined && cascadeInfo.topics > 0 && (
                <li>• {cascadeInfo.topics} topic{cascadeInfo.topics !== 1 ? 's' : ''}</li>
              )}
              {cascadeInfo.materials !== undefined && cascadeInfo.materials > 0 && (
                <li>• {cascadeInfo.materials} material{cascadeInfo.materials !== 1 ? 's' : ''}</li>
              )}
            </ul>
          </div>
        )}

        <DialogFooter className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : `Delete ${itemName}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
