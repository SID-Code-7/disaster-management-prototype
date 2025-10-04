"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useProgress } from "@/hooks/use-progress"
import { modules } from "@/lib/modules"
import { GradientBox } from "@/components/gradient-box"
import { ProgressBar } from "@/components/progress-bar"

export default function DashboardPage() {
  const { data, reset } = useProgress()

  const rows = useMemo(() => {
    return modules.map((m) => {
      const p = data[m.id]
      const checklist = p?.checklistCompletion || 0
      const quizPct = p?.quizTotal ? Math.round(((p?.quizScore || 0) / p.quizTotal) * 100) : 0
      const combined = Math.round((checklist + quizPct) / 2)
      return { id: m.id, title: m.title, checklist, quizPct, combined }
    })
  }, [data])

  const overall = rows.length ? Math.round(rows.reduce((acc, r) => acc + r.combined, 0) / rows.length) : 0

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Track your preparedness across modules and resume where you left off.
        </p>
      </header>

      <GradientBox>
        <div className="inner p-5">
          <p className="text-sm text-muted-foreground">Overall Preparedness</p>
          <div className="mt-2">
            <ProgressBar value={overall} />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              className="rounded-md px-4 py-2 text-background"
              style={{ background: "linear-gradient(90deg, var(--color-brand-accent), var(--color-brand-primary))" }}
              onClick={() => reset()}
            >
              Reset Progress
            </button>
            <Link href="/modules" className="rounded-md border px-4 py-2">
              Go to Modules
            </Link>
          </div>
        </div>
      </GradientBox>

      <section className="grid gap-4 md:grid-cols-2">
        {rows.map((r) => (
          <GradientBox key={r.id}>
            <div className="inner p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{r.title}</h2>
                <Link href={`/modules/${r.id}`} className="text-sm underline">
                  Open
                </Link>
              </div>
              <div className="mt-3 space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Checklist</div>
                  <ProgressBar value={r.checklist} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Quiz</div>
                  <ProgressBar value={r.quizPct} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Module total</div>
                  <ProgressBar value={r.combined} />
                </div>
              </div>
            </div>
          </GradientBox>
        ))}
      </section>
    </div>
  )
}
