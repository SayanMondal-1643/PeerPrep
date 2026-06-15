'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useToast } from '@/hooks/use-toast'
import { HierarchyNameModal } from '@/components/hierarchy-name-modal'
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal'

interface Topic {
  id: string
  name: string
  materials: number
}

interface Subject {
  id: string
  name: string
  topics: Topic[]
  topicCount: number
  materialCount: number
}

interface Branch {
  id: string
  name: string
  subjects: Subject[]
  subjectCount: number
  topicCount: number
  materialCount: number
}

interface Exam {
  id: string
  name: string
  branches: Branch[]
  branchCount: number
  subjectCount: number
  topicCount: number
  materialCount: number
}

interface HierarchyTreeProps {
  exams: Exam[]
  onAddExamClick?: () => void
}

export function HierarchyTree({ exams: initialExams, onAddExamClick }: HierarchyTreeProps) {
  const { toast } = useToast()
  const [exams, setExams] = useState<Exam[]>(initialExams)
  const [expandedExams, setExpandedExams] = useState<Set<string>>(new Set())
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set())
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set())

  // Modal states
  const [nameModal, setNameModal] = useState<{
    isOpen: boolean
    type: 'addExam' | 'addBranch' | 'addSubject' | 'addTopic' | 'editExam' | 'editBranch' | 'editSubject' | 'editTopic' | null
    title: string
    description: string
    placeholder: string
    initialValue: string
    examId?: string
    branchId?: string
    subjectId?: string
    topicId?: string
    currentName?: string
  }>({
    isOpen: false,
    type: null,
    title: '',
    description: '',
    placeholder: '',
    initialValue: '',
  })

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    type: 'exam' | 'branch' | 'subject' | 'topic' | null
    title: string
    description: string
    cascadeInfo?: { branches?: number; subjects?: number; topics?: number; materials?: number }
    itemName: string
    examId?: string
    branchId?: string
    subjectId?: string
    topicId?: string
  }>({
    isOpen: false,
    type: null,
    title: '',
    description: '',
    itemName: '',
  })

  // Generate unique IDs
  const generateId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  // Attach click handler to Add Exam button
  useEffect(() => {
    const button = document.getElementById('add-exam-btn')
    if (button) {
      const clickHandler = () => handleAddExam()
      button.addEventListener('click', clickHandler)
      return () => button.removeEventListener('click', clickHandler)
    }
  }, [])

  // Accordion toggle handlers
  const toggleExamExpand = (examId: string) => {
    const newSet = new Set(expandedExams)
    if (newSet.has(examId)) {
      newSet.delete(examId)
    } else {
      newSet.add(examId)
    }
    setExpandedExams(newSet)
  }

  const toggleBranchExpand = (branchId: string) => {
    const newSet = new Set(expandedBranches)
    if (newSet.has(branchId)) {
      newSet.delete(branchId)
    } else {
      newSet.add(branchId)
    }
    setExpandedBranches(newSet)
  }

  const toggleSubjectExpand = (subjectId: string) => {
    const newSet = new Set(expandedSubjects)
    if (newSet.has(subjectId)) {
      newSet.delete(subjectId)
    } else {
      newSet.add(subjectId)
    }
    setExpandedSubjects(newSet)
  }

  // Add handlers
  const handleAddExam = () => {
    setNameModal({
      isOpen: true,
      type: 'addExam' as any,
      title: 'Add Exam',
      description: 'Enter the name of the new exam',
      placeholder: 'Exam name (e.g., GATE, JEE, NEET)',
      initialValue: '',
    })
  }

  const handleAddBranch = (examId: string, examName: string) => {
    setNameModal({
      isOpen: true,
      type: 'addBranch',
      title: 'Add Branch',
      description: `Add a new branch to ${examName}`,
      placeholder: 'Branch name (e.g., CSE, ECE, ME)',
      initialValue: '',
      examId,
    })
  }

  const handleAddSubject = (examId: string, branchId: string, branchName: string, examName: string) => {
    setNameModal({
      isOpen: true,
      type: 'addSubject',
      title: 'Add Subject',
      description: `Add a new subject to ${examName} > ${branchName}`,
      placeholder: 'Subject name (e.g., Data Structures, Physics)',
      initialValue: '',
      examId,
      branchId,
    })
  }

  const handleAddTopic = (examId: string, branchId: string, subjectId: string, examName: string, branchName: string, subjectName: string) => {
    setNameModal({
      isOpen: true,
      type: 'addTopic',
      title: 'Add Topic',
      description: `Add a new topic to **${examName} > ${branchName} > ${subjectName}**`,
      placeholder: 'Topic name (e.g., Arrays, Mechanics)',
      initialValue: '',
      examId,
      branchId,
      subjectId,
    })
  }

  // Edit handlers
  const handleEditExam = (exam: Exam) => {
    setNameModal({
      isOpen: true,
      type: 'editExam',
      title: 'Edit Exam',
      description: 'Update the exam name',
      placeholder: 'Exam name',
      initialValue: exam.name,
      examId: exam.id,
      currentName: exam.name,
    })
  }

  const handleEditBranch = (branch: Branch, examId: string) => {
    setNameModal({
      isOpen: true,
      type: 'editBranch',
      title: 'Edit Branch',
      description: 'Update the branch name',
      placeholder: 'Branch name',
      initialValue: branch.name,
      examId,
      branchId: branch.id,
      currentName: branch.name,
    })
  }

  const handleEditSubject = (subject: Subject, examId: string, branchId: string) => {
    setNameModal({
      isOpen: true,
      type: 'editSubject',
      title: 'Edit Subject',
      description: 'Update the subject name',
      placeholder: 'Subject name',
      initialValue: subject.name,
      examId,
      branchId,
      subjectId: subject.id,
      currentName: subject.name,
    })
  }

  const handleEditTopic = (topic: Topic, examId: string, branchId: string, subjectId: string) => {
    setNameModal({
      isOpen: true,
      type: 'editTopic',
      title: 'Edit Topic',
      description: 'Update the topic name',
      placeholder: 'Topic name',
      initialValue: topic.name,
      examId,
      branchId,
      subjectId,
      topicId: topic.id,
      currentName: topic.name,
    })
  }

  // Delete handlers
  const handleDeleteExam = (examId: string, examName: string, cascadeCount: any) => {
    setDeleteModal({
      isOpen: true,
      type: 'exam',
      title: 'Delete Exam',
      description: `Are you sure you want to delete "${examName}"? This action cannot be undone.`,
      cascadeInfo: cascadeCount,
      itemName: 'Exam',
      examId,
    })
  }

  const handleDeleteBranch = (examId: string, branchId: string, branchName: string, cascadeCount: any) => {
    setDeleteModal({
      isOpen: true,
      type: 'branch',
      title: 'Delete Branch',
      description: `Are you sure you want to delete "${branchName}"? This action cannot be undone.`,
      cascadeInfo: cascadeCount,
      itemName: 'Branch',
      examId,
      branchId,
    })
  }

  const handleDeleteSubject = (examId: string, branchId: string, subjectId: string, subjectName: string, cascadeCount: any) => {
    setDeleteModal({
      isOpen: true,
      type: 'subject',
      title: 'Delete Subject',
      description: `Are you sure you want to delete "${subjectName}"? This action cannot be undone.`,
      cascadeInfo: cascadeCount,
      itemName: 'Subject',
      examId,
      branchId,
      subjectId,
    })
  }

  const handleDeleteTopic = (examId: string, branchId: string, subjectId: string, topicId: string, topicName: string, materialCount: number) => {
    setDeleteModal({
      isOpen: true,
      type: 'topic',
      title: 'Delete Topic',
      description: `Are you sure you want to delete "${topicName}"? This action cannot be undone.`,
      cascadeInfo: { materials: materialCount },
      itemName: 'Topic',
      examId,
      branchId,
      subjectId,
      topicId,
    })
  }

  // Submit handlers for modals
  const handleNameModalSubmit = (name: string) => {
    const newExams = JSON.parse(JSON.stringify(exams))

    if (nameModal.type === 'addExam') {
      const newExam: Exam = {
        id: generateId('exam'),
        name,
        branches: [],
        branchCount: 0,
        subjectCount: 0,
        topicCount: 0,
        materialCount: 0,
      }
      newExams.push(newExam)
      toast({ title: 'Success', description: 'Exam added successfully' })
    } else if (nameModal.type === 'addBranch' && nameModal.examId) {
      const exam = newExams.find((e: Exam) => e.id === nameModal.examId)
      if (exam) {
        const newBranch: Branch = {
          id: generateId('branch'),
          name,
          subjects: [],
          subjectCount: 0,
          topicCount: 0,
          materialCount: 0,
        }
        exam.branches.push(newBranch)
        exam.branchCount += 1
        setExpandedExams(new Set([...expandedExams, nameModal.examId]))
        toast({ title: 'Success', description: 'Branch added successfully' })
      }
    } else if (nameModal.type === 'addSubject' && nameModal.examId && nameModal.branchId) {
      const exam = newExams.find((e: Exam) => e.id === nameModal.examId)
      const branch = exam?.branches.find((b: Branch) => b.id === nameModal.branchId)
      if (branch) {
        const newSubject: Subject = {
          id: generateId('subject'),
          name,
          topics: [],
          topicCount: 0,
          materialCount: 0,
        }
        branch.subjects.push(newSubject)
        branch.subjectCount += 1
        exam.subjectCount += 1
        setExpandedBranches(new Set([...expandedBranches, nameModal.branchId]))
        toast({ title: 'Success', description: 'Subject added successfully' })
      }
    } else if (nameModal.type === 'addTopic' && nameModal.examId && nameModal.branchId && nameModal.subjectId) {
      const exam = newExams.find((e: Exam) => e.id === nameModal.examId)
      const branch = exam?.branches.find((b: Branch) => b.id === nameModal.branchId)
      const subject = branch?.subjects.find((s: Subject) => s.id === nameModal.subjectId)
      if (subject) {
        const newTopic: Topic = {
          id: generateId('topic'),
          name,
          materials: 0,
        }
        subject.topics.push(newTopic)
        subject.topicCount += 1
        branch.topicCount += 1
        exam.topicCount += 1
        setExpandedSubjects(new Set([...expandedSubjects, nameModal.subjectId]))
        toast({ title: 'Success', description: 'Topic added successfully' })
      }
    } else if (nameModal.type === 'editExam' && nameModal.examId) {
      const exam = newExams.find((e: Exam) => e.id === nameModal.examId)
      if (exam) {
        exam.name = name
        toast({ title: 'Success', description: 'Exam updated successfully' })
      }
    } else if (nameModal.type === 'editBranch' && nameModal.examId && nameModal.branchId) {
      const exam = newExams.find((e: Exam) => e.id === nameModal.examId)
      const branch = exam?.branches.find((b: Branch) => b.id === nameModal.branchId)
      if (branch) {
        branch.name = name
        toast({ title: 'Success', description: 'Branch updated successfully' })
      }
    } else if (nameModal.type === 'editSubject' && nameModal.examId && nameModal.branchId && nameModal.subjectId) {
      const exam = newExams.find((e: Exam) => e.id === nameModal.examId)
      const branch = exam?.branches.find((b: Branch) => b.id === nameModal.branchId)
      const subject = branch?.subjects.find((s: Subject) => s.id === nameModal.subjectId)
      if (subject) {
        subject.name = name
        toast({ title: 'Success', description: 'Subject updated successfully' })
      }
    } else if (nameModal.type === 'editTopic' && nameModal.examId && nameModal.branchId && nameModal.subjectId && nameModal.topicId) {
      const exam = newExams.find((e: Exam) => e.id === nameModal.examId)
      const branch = exam?.branches.find((b: Branch) => b.id === nameModal.branchId)
      const subject = branch?.subjects.find((s: Subject) => s.id === nameModal.subjectId)
      const topic = subject?.topics.find((t: Topic) => t.id === nameModal.topicId)
      if (topic) {
        topic.name = name
        toast({ title: 'Success', description: 'Topic updated successfully' })
      }
    }

    setExams(newExams)
    setNameModal({ ...nameModal, isOpen: false })
  }

  const handleDeleteConfirm = () => {
    const newExams = JSON.parse(JSON.stringify(exams))

    if (deleteModal.type === 'exam' && deleteModal.examId) {
      const index = newExams.findIndex((e: Exam) => e.id === deleteModal.examId)
      if (index > -1) {
        newExams.splice(index, 1)
        toast({ title: 'Success', description: 'Exam deleted successfully' })
      }
    } else if (deleteModal.type === 'branch' && deleteModal.examId && deleteModal.branchId) {
      const exam = newExams.find((e: Exam) => e.id === deleteModal.examId)
      if (exam) {
        const branch = exam.branches.find((b: Branch) => b.id === deleteModal.branchId)
        const index = exam.branches.findIndex((b: Branch) => b.id === deleteModal.branchId)
        if (index > -1) {
          exam.branchCount -= 1
          exam.subjectCount -= branch.subjectCount
          exam.topicCount -= branch.topicCount
          exam.materialCount -= branch.materialCount
          exam.branches.splice(index, 1)
          toast({ title: 'Success', description: 'Branch deleted successfully' })
        }
      }
    } else if (deleteModal.type === 'subject' && deleteModal.examId && deleteModal.branchId && deleteModal.subjectId) {
      const exam = newExams.find((e: Exam) => e.id === deleteModal.examId)
      const branch = exam?.branches.find((b: Branch) => b.id === deleteModal.branchId)
      if (branch) {
        const subject = branch.subjects.find((s: Subject) => s.id === deleteModal.subjectId)
        const index = branch.subjects.findIndex((s: Subject) => s.id === deleteModal.subjectId)
        if (index > -1) {
          branch.subjectCount -= 1
          branch.topicCount -= subject.topicCount
          branch.materialCount -= subject.materialCount
          exam.subjectCount -= 1
          exam.topicCount -= subject.topicCount
          exam.materialCount -= subject.materialCount
          branch.subjects.splice(index, 1)
          toast({ title: 'Success', description: 'Subject deleted successfully' })
        }
      }
    } else if (deleteModal.type === 'topic' && deleteModal.examId && deleteModal.branchId && deleteModal.subjectId && deleteModal.topicId) {
      const exam = newExams.find((e: Exam) => e.id === deleteModal.examId)
      const branch = exam?.branches.find((b: Branch) => b.id === deleteModal.branchId)
      const subject = branch?.subjects.find((s: Subject) => s.id === deleteModal.subjectId)
      if (subject) {
        const topic = subject.topics.find((t: Topic) => t.id === deleteModal.topicId)
        const index = subject.topics.findIndex((t: Topic) => t.id === deleteModal.topicId)
        if (index > -1) {
          subject.topicCount -= 1
          subject.materialCount -= topic.materials
          branch.topicCount -= 1
          branch.materialCount -= topic.materials
          exam.topicCount -= 1
          exam.materialCount -= topic.materials
          subject.topics.splice(index, 1)
          toast({ title: 'Success', description: 'Topic deleted successfully' })
        }
      }
    }

    setExams(newExams)
    setDeleteModal({ ...deleteModal, isOpen: false })
  }

  return (
    <>
      <div className="space-y-2">
        {exams.map((exam) => (
          <div key={exam.id} className="border border-border rounded-lg overflow-hidden">
            {/* Exam Level */}
            <div
              className="bg-background hover:bg-muted/50 transition-colors p-4 flex items-center justify-between group cursor-pointer"
              onClick={() => toggleExamExpand(exam.id)}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  {expandedExams.has(exam.id) ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg">{exam.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {exam.branchCount} Branches • {exam.subjectCount} Subjects • {exam.topicCount} Topics • {exam.materialCount} Materials
                  </p>
                </div>
              </div>

              {/* Actions - visible on hover */}
              <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="ghost" onClick={() => handleAddBranch(exam.id, exam.name)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add Branch</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="ghost" onClick={() => handleEditExam(exam)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit Exam</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteExam(exam.id, exam.name, { branches: exam.branchCount, subjects: exam.subjectCount, topics: exam.topicCount, materials: exam.materialCount })}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete Exam</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Branch Level */}
            {expandedExams.has(exam.id) && (
              <div className="border-t border-border bg-muted/30">
                {exam.branches.map((branch) => (
                  <div key={branch.id} className="border-b border-border last:border-b-0">
                    <div
                      className="bg-background hover:bg-muted/50 transition-colors p-4 ml-6 flex items-center justify-between group cursor-pointer"
                      onClick={() => toggleBranchExpand(branch.id)}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          {expandedBranches.has(branch.id) ? (
                            <ChevronDown className="h-5 w-5" />
                          ) : (
                            <ChevronRight className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold">{branch.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {branch.subjectCount} Subjects • {branch.topicCount} Topics • {branch.materialCount} Materials
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="sm" variant="ghost" onClick={() => handleAddSubject(exam.id, branch.id, branch.name, exam.name)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Add Subject</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="sm" variant="ghost" onClick={() => handleEditBranch(branch, exam.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit Branch</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="sm" variant="ghost" onClick={() => handleDeleteBranch(exam.id, branch.id, branch.name, { subjects: branch.subjectCount, topics: branch.topicCount, materials: branch.materialCount })}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete Branch</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    {/* Subject Level */}
                    {expandedBranches.has(branch.id) && (
                      <div className="bg-muted/20">
                        {branch.subjects.map((subject) => (
                          <div key={subject.id} className="border-b border-border last:border-b-0">
                            <div
                              className="bg-background hover:bg-muted/50 transition-colors p-4 ml-12 flex items-center justify-between group cursor-pointer"
                              onClick={() => toggleSubjectExpand(subject.id)}
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="flex-shrink-0">
                                  {expandedSubjects.has(subject.id) ? (
                                    <ChevronDown className="h-5 w-5" />
                                  ) : (
                                    <ChevronRight className="h-5 w-5" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-semibold">{subject.name}</h5>
                                  <p className="text-sm text-muted-foreground">
                                    {subject.topicCount} Topics • {subject.materialCount} Materials
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button size="sm" variant="ghost" onClick={() => handleAddTopic(exam.id, branch.id, subject.id, exam.name, branch.name, subject.name)}>
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Add Topic</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button size="sm" variant="ghost" onClick={() => handleEditSubject(subject, exam.id, branch.id)}>
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Edit Subject</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button size="sm" variant="ghost" onClick={() => handleDeleteSubject(exam.id, branch.id, subject.id, subject.name, { topics: subject.topicCount, materials: subject.materialCount })}>
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Delete Subject</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>

                            {/* Topic Level */}
                            {expandedSubjects.has(subject.id) && (
                              <div className="bg-muted/10">
                                {subject.topics.map((topic) => (
                                  <div key={topic.id} className="border-b border-border last:border-b-0">
                                    <div className="bg-background hover:bg-muted/50 transition-colors p-4 ml-18 flex items-center justify-between group">
                                      <div className="flex-1 min-w-0">
                                        <h6 className="font-medium">{topic.name}</h6>
                                        <p className="text-sm text-muted-foreground">{topic.materials} Materials</p>
                                      </div>

                                      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button size="sm" variant="ghost" onClick={() => handleEditTopic(topic, exam.id, branch.id, subject.id)}>
                                                <Edit className="h-4 w-4" />
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Edit Topic</TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button size="sm" variant="ghost" onClick={() => handleDeleteTopic(exam.id, branch.id, subject.id, topic.id, topic.name, topic.materials)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Delete Topic</TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Name Modal */}
      <HierarchyNameModal
        isOpen={nameModal.isOpen}
        onClose={() => setNameModal({ ...nameModal, isOpen: false })}
        onSubmit={handleNameModalSubmit}
        title={nameModal.title}
        description={nameModal.description}
        placeholder={nameModal.placeholder}
        initialValue={nameModal.initialValue}
      />

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        onConfirm={handleDeleteConfirm}
        title={deleteModal.title}
        description={deleteModal.description}
        cascadeInfo={deleteModal.cascadeInfo}
        itemName={deleteModal.itemName}
      />
    </>
  )
}
