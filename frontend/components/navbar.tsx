'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { BookOpen, ChevronDown, LogOut, LayoutDashboard, Upload, FileText, Settings, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export const Navbar = function NavbarComponent() {
  const { user, isLoggedIn, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const getLoginUrl = () => {
    // Don't redirect from auth pages themselves
    if (pathname.startsWith('/auth/')) {
      return '/auth/login'
    }
    // For other pages, add the current path as redirect
    return `/auth/login?redirect=${encodeURIComponent(pathname)}`
  }

  const getSignupUrl = () => {
    // Don't redirect from auth pages themselves
    if (pathname.startsWith('/auth/')) {
      return '/auth/signup'
    }
    // For other pages, add the current path as redirect
    return `/auth/signup?redirect=${encodeURIComponent(pathname)}`
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-6 w-6 text-primary" />
          <span>PeerPrep</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {isLoggedIn && user?.role === 'admin' && (
            <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
              Admin Dashboard
            </Link>
          )}
        </div>

        {/* Auth Buttons or User Menu */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Button variant="ghost" asChild>
                <Link href={getLoginUrl()}>Log In</Link>
              </Button>
              <Button asChild>
                <Link href={getSignupUrl()}>Sign Up</Link>
              </Button>
            </>
          ) : (
            <TooltipProvider>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <span>{user?.role === 'admin' ? 'Admin' : user?.fullName}</span>
                    {user?.role === 'teacher' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <GraduationCap className="h-4 w-4 text-blue-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Teacher</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {user?.role === 'admin' ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/exams" className="flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        User Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/exams" className="flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/upload" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Study Material
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </TooltipProvider>
          )}
        </div>
      </div>
    </header>
  )
}
