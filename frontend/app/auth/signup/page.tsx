'use client'

import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAuth } from '@/lib/auth-context'
import type { UserRole } from '@/lib/auth-context'

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signup, redirectTo, setRedirectTo } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [role, setRole] = useState<UserRole>('student')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    institutionName: '',
    linkedinProfile: '',
    researchgateProfile: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check for redirect URL in query params
    const redirect = searchParams.get('redirect')
    if (redirect && !redirectTo) {
      setRedirectTo(redirect)
    }
  }, [searchParams, redirectTo, setRedirectTo])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Validation
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all required fields')
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }

      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters')
        return
      }

      if (role === 'teacher' && !formData.institutionName) {
        setError('Institution name is required for teacher accounts')
        return
      }

      if (role === 'teacher' && !formData.linkedinProfile) {
        setError('LinkedIn profile is required for teacher accounts')
        return
      }

      await signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role,
        institutionName: formData.institutionName,
        linkedinProfile: formData.linkedinProfile,
        researchgateProfile: formData.researchgateProfile,
      })

      const destination = redirectTo || (searchParams.get('redirect') ?? '/exams')
      setRedirectTo(null)
      router.push(destination)
    } catch (err) {
      setError('Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-border">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create an Account</h1>
            <p className="text-muted-foreground text-sm">Join PeerPrep to acess and contribute structured study materials</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
                className="bg-card border-border focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-card border-border focus:ring-primary"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-card border-border focus:ring-primary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="bg-card border-border focus:ring-primary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              <Label>Account Type</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="role-student" />
                  <Label htmlFor="role-student" className="font-normal cursor-pointer">
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teacher" id="role-teacher" />
                  <Label htmlFor="role-teacher" className="font-normal cursor-pointer">
                    Teacher / Educator
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Conditional Teacher Fields */}
            {role === 'teacher' && (
              <div className="space-y-4 p-4 rounded-md bg-card border border-border">
                <div className="space-y-2">
                  <Label htmlFor="institutionName">Institution Name *</Label>
                  <Input
                    id="institutionName"
                    name="institutionName"
                    placeholder="Your university or school"
                    value={formData.institutionName}
                    onChange={handleInputChange}
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedinProfile">LinkedIn Profile URL *</Label>
                  <Input
                    id="linkedinProfile"
                    name="linkedinProfile"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedinProfile}
                    onChange={handleInputChange}
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="researchgateProfile">ResearchGate Profile URL (Optional)</Label>
                  <Input
                    id="researchgateProfile"
                    name="researchgateProfile"
                    type="url"
                    placeholder="https://researchgate.net/profile/yourprofile"
                    value={formData.researchgateProfile}
                    onChange={handleInputChange}
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Teacher accounts require admin verification before receiving the Verified Teacher badge.
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <SignupForm />
    </Suspense>
  )
}
