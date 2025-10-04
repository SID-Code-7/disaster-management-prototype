"use client"

import MockDrill from "@/components/mock-drill"

export default function MockDrillPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-pretty">Virtual Mock Drill</h1>
      <p className="text-muted-foreground mt-2">
        Practice your response in a timed, game-like simulation. Make the right moves in the right order.
      </p>
      <div className="mt-6">
        <MockDrill />
      </div>
    </main>
  )
}
