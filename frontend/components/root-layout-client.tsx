'use client'

import { ReactNode } from 'react'
import { Navbar } from '@/components/navbar'

interface RootLayoutClientProps {
  children: ReactNode
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
