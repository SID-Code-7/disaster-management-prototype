"use client"

import type React from "react"

import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { Suspense } from "react"

function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SiteHeader />
      </Suspense>
      <main className="min-h-dvh">{children}</main>
      <Analytics />
    </>
  )
}

export { ClientLayout }
export default ClientLayout
