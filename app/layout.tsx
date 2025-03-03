import type React from "react"
import type { Metadata } from "next"
import { ClientLayout } from "./client-layout"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mountain Travels Admin Dashboard",
  description: "Admin dashboard for Mountain Travels Pakistan",
    generator: 'v0.dev'
}

// Developed by: Saqlain Shah

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}



import './globals.css'