'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Eye, Download } from 'lucide-react'

interface MarksheetViewerModalProps {
  isOpen: boolean
  onClose: () => void
  marksheetUrl?: string
  studentName?: string
}

export default function MarksheetViewerModal({
  isOpen,
  onClose,
  marksheetUrl = 'https://via.placeholder.com/800x1000?text=Marksheet',
  studentName = 'Student',
}: MarksheetViewerModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Marksheet - {studentName}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Marksheet Preview */}
          <div className="bg-muted rounded-lg p-4 min-h-[600px] flex items-center justify-center">
            <img
              src={marksheetUrl}
              alt="Marksheet"
              className="max-w-full max-h-[600px] rounded"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
