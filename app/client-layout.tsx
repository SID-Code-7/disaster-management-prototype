"use client"

import type React from "react"

import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // subscribe to search params changes without rendering the Map-like object
  const _search = useSearchParams()

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SiteHeader />
        {/* removed rendering of useSearchParams() to avoid invalid JSX children */}
      </Suspense>
      <main className="min-h-dvh">{children}</main>
      <Analytics />
    </>
  )
}

export { ClientLayout }
export default ClientLayout
