"use client"

import SafetyKitPro from "@/components/safety-kit-pro"

export default function SafetyKitPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-pretty">Safety Kit</h1>
      <p className="text-muted-foreground mt-2">
        Prepare a go-bag with essentials so you can act fast in an emergency.
      </p>
      <div className="mt-6">
        <SafetyKitPro maxSelect={8} />
      </div>
    </main>
  )
}
