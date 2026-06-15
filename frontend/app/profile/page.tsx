'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CheckCircle, Clock, XCircle, Upload, GraduationCap, Medal, Trophy, Star, Download, Trash2 } from 'lucide-react'
import ApplyTopperBadgeModal, { TopperBadgeApplicationData } from '@/components/apply-topper-badge-modal'

interface StudentProfile {
  college?: string
  branch?: string
  year?: string
}

interface TeacherProfile {
  university?: string
  department?: string
  expertise?: string
}

// Department to expertise mapping
const departmentExpertise: Record<string, string[]> = {
  cse: ['DBMS', 'Operating Systems', 'Computer Networks', 'DSA', 'Web Development', 'AI/ML'],
  it: ['Database Design', 'Network Security', 'Cloud Computing', 'Software Testing', 'System Architecture'],
  ece: ['Analog Electronics', 'Digital Electronics', 'Signals & Systems', 'Electromagnetics', 'Microprocessors'],
  ce: ['Structural Analysis', 'Concrete Technology', 'Geotechnical Engineering', 'Hydraulics', 'Transportation'],
  me: ['Thermodynamics', 'Fluid Mechanics', 'Machine Design', 'Manufacturing', 'Heat Transfer'],
}

interface UploadedMaterial {
  id: string
  title: string
  exam: string
  branch: string
  subject: string
  topic: string
  uploadDate: string
  status: 'approved' | 'pending' | 'rejected'
  rating: number
  ratingCount: number
  isBestMaterial?: boolean
}

interface TopperBadge {
  id: string
  subject: string
  exam: string
  branch: string
  year: string
  status: 'Applied' | 'Approved' | 'Rejected'
}

// Mock data for student materials - organized by email
const studentMaterialsByEmail: Record<string, UploadedMaterial[]> = {
  'subhajit@example.com': [
    {
      id: '3',
      title: 'ACID Properties in Database Transactions',
      exam: 'MAKAUT',
      branch: 'CSE',
      subject: 'Database Management Systems',
      topic: 'Transactions',
      uploadDate: '2025-05-25',
      status: 'pending',
      rating: 0,
      ratingCount: 0,
    },
    {
      id: '2',
      title: 'GATE Practice Problems on Deadlocks',
      exam: 'GATE',
      branch: 'CS & IT',
      subject: 'Operating Systems',
      topic: 'Deadlocks',
      uploadDate: '2024-12-23',
      status: 'approved',
      rating: 4.2,
      ratingCount: 18,
    },
    {
      id: '1',
      title: 'Solved GATE PYQs on Binary Search and Time Complexity',
      exam: 'GATE',
      branch: 'CS & IT',
      subject: 'Algorithms',
      topic: 'Searching',
      uploadDate: '2024-01-15',
      status: 'approved',
      rating: 4.8,
      ratingCount: 45,
      isBestMaterial: true,
    },
  ],
  'sayan@example.com': [
    {
      id: '7',
      title: '3NF vs BCNF',
      exam: 'MAKAUT',
      branch: 'CSE',
      subject: 'Database Management Systems',
      topic: 'Normalization',
      uploadDate: '2025-07-10',
      status: 'pending',
      rating: 0,
      ratingCount: 0,
    },
    {
      id: '6',
      title: 'Types of Inheritance',
      exam: 'MAKAUT',
      branch: 'CSE',
      subject: 'Object-Oriented Programming',
      topic: 'Inheritance and Polymorphism',
      uploadDate: '2024-11-06',
      status: 'approved',
      rating: 4.3,
      ratingCount: 19,
    },
    {
      id: '5',
      title: 'BFS vs DFS',
      exam: 'MAKAUT',
      branch: 'CSE',
      subject: 'Data Structures and Algorithms',
      topic: 'Graphs',
      uploadDate: '2024-02-01',
      status: 'approved',
      rating: 4.4,
      ratingCount: 22,
      isBestMaterial: true,
    },
  ],
}

// Mock data for teacher profile
const teacherMaterials: UploadedMaterial[] = [
  {
    id: '3',
    title: 'GATE Practice Problems on Process Scheduling',
    exam: 'GATE',
    branch: 'CS & IT',
    subject: 'Operating Systems',
    topic: 'CPU Scheduling',
    uploadDate: '2025-12-31',
    status: 'approved',
    rating: 4.3,
    ratingCount: 34,
  },
  {
    id: '1',
    title: 'Solved GATE Numericals on Pipelining',
    exam: 'GATE',
    branch: 'CS & IT',
    subject: 'Computer Organization and Architecture',
    topic: 'Instruction Pipelining',
    uploadDate: '2023-10-21',
    status: 'approved',
    rating: 4.9,
    ratingCount: 78,
    isBestMaterial: true,
  },
  {
    id: '4',
    title: 'Postfix Expression Evaluation',
    exam: 'MAKAUT',
    branch: 'CSE',
    subject: 'Data Structures and Algorithms',
    topic: 'Stacks',
    uploadDate: '2016-05-17',
    status: 'approved',
    rating: 4.5,
    ratingCount: 28,
  },
  {
    id: '2',
    title: 'Necessary Conditions for Deadlock',
    exam: 'MAKAUT',
    branch: 'CSE',
    subject: 'Operating Systems',
    topic: 'Deadlocks',
    uploadDate: '2015-02-01',
    status: 'approved',
    rating: 4.6,
    ratingCount: 52,
    isBestMaterial: true,
  },
]

// Dummy topper badge data for different students
const topperBadgesData: Record<string, TopperBadge[]> = {
  'subhajit@example.com': [
    {
      id: '1',
      subject: 'DBMS',
      exam: 'MAKAUT',
      branch: 'CSE',
      year: '2025',
      status: 'Applied',
    },
    {
      id: '2',
      subject: 'DSA',
      exam: 'MAKAUT',
      branch: 'CSE',
      year: '2024',
      status: 'Approved',
    },
    {
      id: '3',
      subject: 'Signals & Systems',
      exam: 'MAKAUT',
      branch: 'ECE',
      year: '2024',
      status: 'Rejected',
    },
  ],
  'sayan@example.com': [],
}

const getStatusIcon = (status: string) => {
  const tooltipTexts: Record<string, string> = {
    approved: 'Approved',
    pending: 'Pending',
    rejected: 'Rejected',
  }

  switch (status) {
    case 'approved':
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CheckCircle className="h-5 w-5 text-green-500 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipTexts[status]}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    case 'pending':
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Clock className="h-5 w-5 text-amber-500 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipTexts[status]}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    case 'rejected':
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <XCircle className="h-5 w-5 text-red-500 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipTexts[status]}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    default:
      return null
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    college: '',
    branch: '',
    year: '',
  })
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>({
    university: '',
    department: '',
    expertise: '',
  })
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [studentFormData, setStudentFormData] = useState<StudentProfile>(studentProfile)
  const [teacherFormData, setTeacherFormData] = useState<TeacherProfile>(teacherProfile)
  const [isApplyBadgeModalOpen, setIsApplyBadgeModalOpen] = useState(false)
  const [topperBadges, setTopperBadges] = useState<TopperBadge[]>(
    topperBadgesData[user?.email || ''] || []
  )

  if (!user || (user.role !== 'student' && user.role !== 'teacher')) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">Only students and teachers can access the profile page.</p>
        </div>
      </div>
    )
  }

  const handleSaveStudentProfile = () => {
    setStudentProfile(studentFormData)
    setIsEditDialogOpen(false)
  }

  const handleSaveTeacherProfile = () => {
    setTeacherProfile(teacherFormData)
    setIsEditDialogOpen(false)
  }

  const handleStudentFormChange = (field: string, value: string) => {
    setStudentFormData({ ...studentFormData, [field]: value })
  }

  const handleTeacherFormChange = (field: string, value: string) => {
    setTeacherFormData({ ...teacherFormData, [field]: value })
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  const getMaterialsForRole = () => {
    if (user.role === 'teacher') {
      return teacherMaterials
    } else {
      // Return user-specific student materials based on email
      return studentMaterialsByEmail[user.email] || []
    }
  }

  const materialsData = getMaterialsForRole()
  const materialsCount = materialsData.length
  const ratingsCount = user.role === 'teacher' 
    ? materialsData.filter((m) => m.ratingCount > 0).reduce((sum, m) => sum + m.ratingCount, 0)
    : materialsData.filter((m) => m.ratingCount > 0).length * 5
  const commentsCount = user.role === 'teacher' ? materialsData.length * 3 : materialsData.length * 2

  const handleBadgeApplicationSubmit = (data: TopperBadgeApplicationData) => {
    const newBadge: TopperBadge = {
      id: Date.now().toString(),
      subject: data.subject,
      exam: data.exam,
      branch: data.branch,
      year: data.year.toString(),
      status: 'Applied',
    }
    setTopperBadges([...topperBadges, newBadge])
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Profile Header */}
        <Card className="p-8 mb-8">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl font-semibold bg-primary text-primary-foreground">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{user.fullName}</h1>
                {user.role === 'teacher' ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <GraduationCap className="h-6 w-6 text-blue-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Teacher</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  user.email !== 'sayan@example.com' && user.email !== 'subhajit@example.com' && (
                    <Badge variant="secondary">Student</Badge>
                  )
                )}
              </div>
              <p className="text-muted-foreground mb-4">
                Joined on {user.email === 'sayan@example.com' ? '12/12/2022' : user.email === 'teacher@example.com' ? '15/07/2010' : '20/10/2022'}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </Card>

        {/* Academic Information */}
        <Card className="p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {user.role === 'teacher' ? 'Professional Information' : 'Academic Information'}
            </h2>
            <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
              if (!open) {
                setIsEditDialogOpen(false)
              } else {
                setStudentFormData(studentProfile)
                setTeacherFormData(teacherProfile)
                setIsEditDialogOpen(true)
              }
            }}>
              <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {user.role === 'teacher' ? 'Edit Professional Information' : 'Edit Academic Information'}
                  </DialogTitle>
                  <DialogDescription>
                    {user.role === 'teacher'
                      ? 'Update your college/university, department, and expertise information.'
                      : 'Update your college, branch, and year information.'}
                  </DialogDescription>
                </DialogHeader>
                {user.role === 'teacher' ? (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="university">College / University</Label>
                      <Input
                        id="university"
                        placeholder="Enter your college/university name"
                        value={teacherFormData.university || ''}
                        onChange={(e) => handleTeacherFormChange('university', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select 
                        value={teacherFormData.department || ''} 
                        onValueChange={(value) => {
                          setTeacherFormData({ ...teacherFormData, department: value, expertise: '' })
                        }}
                      >
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cse">CSE</SelectItem>
                          <SelectItem value="it">IT</SelectItem>
                          <SelectItem value="ece">ECE</SelectItem>
                          <SelectItem value="ce">CE</SelectItem>
                          <SelectItem value="me">ME</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expertise">Teaching Subject / Expertise</Label>
                      <Select
                        value={teacherFormData.expertise || ''}
                        onValueChange={(value) => {
                          setTeacherFormData({ ...teacherFormData, expertise: value })
                        }}
                        disabled={!teacherFormData.department}
                      >
                        <SelectTrigger id="expertise">
                          <SelectValue placeholder="Select expertise" />
                        </SelectTrigger>
                        <SelectContent>
                          {teacherFormData.department &&
                            departmentExpertise[teacherFormData.department]?.map((exp) => (
                              <SelectItem key={exp} value={exp}>
                                {exp}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleSaveTeacherProfile} className="w-full mt-2">
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="college">College</Label>
                      <Input
                        id="college"
                        placeholder="Enter your college name"
                        value={studentFormData.college || ''}
                        onChange={(e) => handleStudentFormChange('college', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch</Label>
                      <Select
                        value={studentFormData.branch || ''}
                        onValueChange={(value) => {
                          setStudentFormData({ ...studentFormData, branch: value })
                        }}
                      >
                        <SelectTrigger id="branch">
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cse">CSE</SelectItem>
                          <SelectItem value="it">IT</SelectItem>
                          <SelectItem value="ece">ECE</SelectItem>
                          <SelectItem value="ce">CE</SelectItem>
                          <SelectItem value="me">ME</SelectItem>
                          <SelectItem value="aeie">AEIE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Select
                        value={studentFormData.year || ''}
                        onValueChange={(value) => {
                          setStudentFormData({ ...studentFormData, year: value })
                        }}
                      >
                        <SelectTrigger id="year">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1st Year</SelectItem>
                          <SelectItem value="2">2nd Year</SelectItem>
                          <SelectItem value="3">3rd Year</SelectItem>
                          <SelectItem value="4">4th Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleSaveStudentProfile} className="w-full mt-2">
                      Save Changes
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>

          {user.role === 'teacher' ? (
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">College / University</p>
                <p className="text-lg font-medium">{teacherProfile.university || 'Not added'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Department</p>
                <p className="text-lg font-medium">{teacherProfile.department?.toUpperCase() || 'Not added'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Teaching Subject / Expertise</p>
                <p className="text-lg font-medium">{teacherProfile.expertise || 'Not added'}</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">College</p>
                <p className="text-lg font-medium">{studentProfile.college || 'Not added'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Branch</p>
                <p className="text-lg font-medium">{studentProfile.branch?.toUpperCase() || 'Not added'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Year</p>
                <p className="text-lg font-medium">
                  {studentProfile.year
                    ? `${studentProfile.year}${['st', 'nd', 'rd', 'th'][parseInt(studentProfile.year) - 1]} Year`
                    : 'Not added'}
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Contribution Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">{materialsCount}</p>
              <p className="text-muted-foreground">Materials Uploaded</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">{ratingsCount}</p>
              <p className="text-muted-foreground">Ratings Given</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">{commentsCount}</p>
              <p className="text-muted-foreground">Comments Posted</p>
            </div>
          </Card>
        </div>

        {/* Uploaded Materials */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Your Uploaded Materials</h2>

          {materialsData.length === 0 ? (
            <div className="text-center py-12">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">You haven't uploaded any materials yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {materialsData.map((material) => (
                <div
                  key={material.id}
                  className="border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors relative"
                >
                  {/* Top-right corner: Best Material badge and Approval Status */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    {material.isBestMaterial && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Trophy className="h-5 w-5 text-amber-500 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Best Material</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    {getStatusIcon(material.status)}
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{material.title}</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium text-foreground">Exam:</span> {material.exam}
                        </div>
                        <div>
                          <span className="font-medium text-foreground">Branch:</span> {material.branch}
                        </div>
                        <div>
                          <span className="font-medium text-foreground">Subject:</span> {material.subject}
                        </div>
                        <div>
                          <span className="font-medium text-foreground">Topic:</span> {material.topic}
                        </div>
                      </div>
                    </div>
                    {user?.email === 'admin@example.com' && (
                      <Button 
                        size="sm"
                        className={material.isBestMaterial ? "bg-destructive hover:bg-destructive/90 text-white" : "bg-amber-500 hover:bg-amber-600 text-white"}
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log("[v0] Admin toggled best material status for:", material.id)
                        }}
                      >
                        {material.isBestMaterial ? "Remove Best" : "Set as Best"}
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      Uploaded on {formatDate(material.uploadDate)}
                    </span>
                    <div className="flex items-center gap-4">
                      {material.ratingCount > 0 && (
                        <div className="flex items-center gap-1">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= Math.round(material.rating)
                                    ? 'fill-primary text-primary'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground ml-1">
                            ({material.ratingCount})
                          </span>
                        </div>
                      )}
                      {material.ratingCount === 0 && (
                        <span className="text-sm text-muted-foreground">No ratings yet</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Topper Badges Section - Only for Students */}
        {user.role === 'student' && (
          <Card className="p-8 mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Topper Badges</h2>
              <Button onClick={() => setIsApplyBadgeModalOpen(true)}>
                Apply for a New Badge
              </Button>
            </div>

            {topperBadges.length === 0 ? (
              <div className="text-center py-12">
                <Medal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">You haven't applied for any topper badges yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Exam</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topperBadges.map((badge) => (
                      <TableRow key={badge.id}>
                        <TableCell className="font-medium">{badge.subject}</TableCell>
                        <TableCell>{badge.exam}</TableCell>
                        <TableCell>{badge.branch}</TableCell>
                        <TableCell>{badge.year}</TableCell>
                        <TableCell>
                          {badge.status === 'Approved' && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <CheckCircle className="h-5 w-5 text-green-500 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Approved</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {badge.status === 'Applied' && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Clock className="h-5 w-5 text-amber-500 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Applied</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {badge.status === 'Rejected' && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <XCircle className="h-5 w-5 text-red-500 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Rejected</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        )}
      </div>

      {/* Apply for Badge Modal */}
      <ApplyTopperBadgeModal
        isOpen={isApplyBadgeModalOpen}
        onClose={() => setIsApplyBadgeModalOpen(false)}
        onSubmit={handleBadgeApplicationSubmit}
      />
    </div>
  )
}
