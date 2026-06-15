'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type UserRole = 'student' | 'teacher' | 'admin'

interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
  isVerifiedTeacher?: boolean
  institutionName?: string
  linkedinProfile?: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => void
  redirectTo: string | null
  setRedirectTo: (path: string | null) => void
}

export interface SignupData {
  fullName: string
  email: string
  password: string
  role: UserRole
  institutionName?: string
  linkedinProfile?: string
  researchgateProfile?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [redirectTo, setRedirectTo] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    // Email to name mapping
    const emailToNameMap: Record<string, { name: string; role: UserRole }> = {
      'admin@example.com': { name: 'Admin User', role: 'admin' },
      'teacher@example.com': { name: 'Runa Mukherjee', role: 'teacher' },
      'subhajit@example.com': { name: 'Subhajit Kundu', role: 'student' },
      'sayan@example.com': { name: 'Sayan Mondal', role: 'student' },
    }

    const userConfig = emailToNameMap[email]

    if (userConfig) {
      const isTeacher = userConfig.role === 'teacher'
      setUser({
        id: `user-${email}`,
        email,
        fullName: userConfig.name,
        role: userConfig.role,
        isVerifiedTeacher: isTeacher ? true : undefined,
      })
    } else {
      // Simulate student login for any other credentials
      setUser({
        id: `user-${Date.now()}`,
        email,
        fullName: email.split('@')[0].replace(/[._]/g, ' '),
        role: 'student',
      })
    }
  }

  const signup = async (data: SignupData) => {
    // Mock signup logic
    setUser({
      id: `user-${Date.now()}`,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      isVerifiedTeacher: data.role === 'teacher' ? false : undefined,
      institutionName: data.institutionName,
      linkedinProfile: data.linkedinProfile,
    })
  }

  const logout = () => {
    setUser(null)
    setRedirectTo(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout, redirectTo, setRedirectTo }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
