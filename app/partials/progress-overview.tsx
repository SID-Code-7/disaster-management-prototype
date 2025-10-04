"use client"

import Link from "next/link"
import { useProgress } from "@/hooks/use-progress"
import { modules } from "@/lib/modules"
import { ProgressBar } from "@/components/progress-bar"
import { GradientBox } from "@/components/gradient-box"

export function ProgressOverview() {
  const { data } = useProgress()
  const totals = modules.map((m) => {
    const p = data[m.id]
    const checklist = p?.checklistCompletion || 0
    const quizPct = p?.quizTotal ? Math.round(((p?.quizScore || 0) / p.quizTotal) * 100) : 0
    const combined = Math.round((checklist + quizPct) / 2)
    return { id: m.id, title: m.title, combined }
  })

  const average = totals.length ? Math.round(totals.reduce((a, b) => a + b.combined, 0) / totals.length) : 0

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Your Preparedness Snapshot</h2>
      <GradientBox>
        <div className="inner p-4">
          <p className="text-sm text-muted-foreground">Average across modules</p>
          <div className="mt-2">
            <ProgressBar value={average} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {totals.map((t) => (
              <Link
                key={t.id}
                href={`/modules/${t.id}`}
                className="rounded-md border px-3 py-2 text-sm hover:bg-accent"
              >
                {t.title}: {t.combined}%
              </Link>
            ))}
          </div>
        </div>
      </GradientBox>
    </div>
  )
}
