'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ApplyTopperBadgeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: TopperBadgeApplicationData) => void
}

export interface TopperBadgeApplicationData {
  exam: string
  branch: string
  subject: string
  year: string
  cgpa: string
  marksheet: File | null
}

const examOptions = ['GATE', 'MAKAUT', 'Jadavpur University', 'University of Kalyani', 'University of Calcutta']

const branchOptions: Record<string, string[]> = {
  MAKAUT: ['CSE', 'IT', 'ECE', 'AEIE', 'CE', 'ME', 'BME'],
  GATE: ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IN'],
  'Jadavpur University': ['CSE', 'ECE', 'ME', 'CE'],
  'University of Kalyani': ['CSE', 'IT', 'Physics', 'Chemistry'],
  'University of Calcutta': ['CSE', 'IT', 'Science', 'Commerce'],
}

const subjectOptions: Record<string, string[]> = {
  CSE: ['DSA', 'DBMS', 'OS', 'OOPs', 'Networks', 'AI/ML'],
  IT: ['DBMS', 'Web Development', 'CA', 'Network Security', 'Cloud Computing'],
  ECE: ['Digital Logic', 'Signals & Systems', 'Analog Electronics', 'Electromagnetics', 'Microprocessors'],
  ME: ['Thermodynamics', 'Fluid Mechanics', 'Machine Design', 'Manufacturing'],
  CE: ['Structural Analysis', 'Hydraulics', 'Geotechnical Engineering'],
  AEIE: ['Control Systems', 'Power Electronics', 'Electrical Machines'],
  BME: ['Biomedical Instrumentation', 'Physiology', 'Biomechanics'],
  EE: ['Power Systems', 'Electrical Machines', 'Control Systems'],
  IN: ['Data Structures', 'Databases', 'Systems'],
  Physics: ['Mechanics', 'Thermodynamics', 'Optics'],
  Chemistry: ['Organic Chemistry', 'Inorganic Chemistry'],
  Science: ['Physics', 'Chemistry', 'Biology'],
  Commerce: ['Accounting', 'Economics', 'Business Studies'],
}

export default function ApplyTopperBadgeModal({
  isOpen,
  onClose,
  onSubmit,
}: ApplyTopperBadgeModalProps) {
  const [formData, setFormData] = useState<TopperBadgeApplicationData>({
    exam: '',
    branch: '',
    subject: '',
    year: '',
    cgpa: '',
    marksheet: null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleExamChange = (value: string) => {
    setFormData({ ...formData, exam: value, branch: '', subject: '' })
  }

  const handleBranchChange = (value: string) => {
    setFormData({ ...formData, branch: value, subject: '' })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      if (!validTypes.includes(file.type)) {
        setErrors({ ...errors, marksheet: 'Only PDF and image files are allowed' })
        return
      }
      setFormData({ ...formData, marksheet: file })
      setErrors({ ...errors, marksheet: '' })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.exam) newErrors.exam = 'Exam is required'
    if (!formData.branch) newErrors.branch = 'Branch is required'
    if (!formData.subject) newErrors.subject = 'Subject is required'
    if (!formData.year) newErrors.year = 'Year is required'
    if (!formData.cgpa) newErrors.cgpa = 'CGPA is required'
    if (!formData.marksheet) newErrors.marksheet = 'Marksheet is required'
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSubmit(formData)
    setFormData({ exam: '', branch: '', subject: '', year: '', cgpa: '', marksheet: null })
    setErrors({})
    onClose()
  }

  const availableBranches = formData.exam ? branchOptions[formData.exam] || [] : []
  const availableSubjects = formData.branch ? subjectOptions[formData.branch] || [] : []

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply for Topper Badge</DialogTitle>
          <DialogDescription>
            Submit your details and marksheet to apply for a topper badge
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Exam */}
          <div className="space-y-2">
            <Label htmlFor="exam">Exam *</Label>
            <Select value={formData.exam} onValueChange={handleExamChange}>
              <SelectTrigger id="exam">
                <SelectValue placeholder="Select exam" />
              </SelectTrigger>
              <SelectContent>
                {examOptions.map((exam) => (
                  <SelectItem key={exam} value={exam}>
                    {exam}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.exam && <p className="text-sm text-red-500">{errors.exam}</p>}
          </div>

          {/* Branch */}
          <div className="space-y-2">
            <Label htmlFor="branch">Branch *</Label>
            <Select value={formData.branch} onValueChange={handleBranchChange} disabled={!formData.exam}>
              <SelectTrigger id="branch">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {availableBranches.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.branch && <p className="text-sm text-red-500">{errors.branch}</p>}
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })} disabled={!formData.branch}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {availableSubjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
          </div>

          {/* Year */}
          <div className="space-y-2">
            <Label htmlFor="year">Year *</Label>
            <Input
              id="year"
              type="number"
              min="2000"
              max="2100"
              placeholder="Enter year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            />
            {errors.year && <p className="text-sm text-red-500">{errors.year}</p>}
          </div>

          {/* CGPA */}
          <div className="space-y-2">
            <Label htmlFor="cgpa">CGPA *</Label>
            <Input
              id="cgpa"
              type="number"
              min="0"
              max="10"
              step="0.1"
              placeholder="Enter CGPA (0-10)"
              value={formData.cgpa}
              onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
            />
            {errors.cgpa && <p className="text-sm text-red-500">{errors.cgpa}</p>}
          </div>

          {/* Marksheet Upload */}
          <div className="space-y-2">
            <Label htmlFor="marksheet">Marksheet Upload (PDF or Image) *</Label>
            <input
              id="marksheet"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="block w-full text-sm text-muted-foreground
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-primary-foreground
                hover:file:bg-primary/90"
            />
            {formData.marksheet && (
              <p className="text-sm text-green-600">File selected: {formData.marksheet.name}</p>
            )}
            {errors.marksheet && <p className="text-sm text-red-500">{errors.marksheet}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Submit Application
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
