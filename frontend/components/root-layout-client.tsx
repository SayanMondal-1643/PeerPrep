"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";

interface RootLayoutClientProps {
  children: ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  return (
    <>
      <Navbar />
      {children}
      <Toaster />
    </>
  );
}
