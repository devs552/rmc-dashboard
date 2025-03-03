"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/signin"

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-grow overflow-hidden">
          <Header userRole={""} />
          <main className="flex-grow overflow-auto bg-gray-100 p-6">{children}</main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  )
}

