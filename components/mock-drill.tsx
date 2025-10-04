"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type Step = {
  id: string
  label: string
  tip?: string
}

const EARTHQUAKE_STEPS: Step[] = [
  { id: "drop", label: "Drop", tip: "Get low to the ground to avoid being knocked over." },
  { id: "cover", label: "Cover", tip: "Take cover under sturdy furniture, protect head and neck." },
  { id: "hold", label: "Hold On", tip: "Hold on until shaking stops." },
  { id: "evacuate", label: "Evacuate if unsafe", tip: "If structure is unsafe after shaking, exit carefully." },
  { id: "utilities", label: "Check utilities", tip: "Turn off gas/electric if you suspect damage." },
  { id: "kit", label: "Grab kit", tip: "Take your go-bag if you need to leave." },
  { id: "contact", label: "Contact family plan", tip: "Use your emergency contact plan and regroup." },
]

function shuffle<T>(arr: T[]) {
  const out = arr.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export default function MockDrill() {
  const [started, setStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [idx, setIdx] = useState(0) // current required step index
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [over, setOver] = useState(false)

  const steps = EARTHQUAKE_STEPS
  const current = steps[idx]
  const choices = useMemo(() => shuffle(steps).slice(0, 4), [idx]) // 4 choices each round

  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!started || over) return
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          window.clearInterval(timerRef.current!)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [started, over])

  useEffect(() => {
    if (timeLeft === 0) setOver(true)
  }, [timeLeft])

  const handleChoice = (id: string) => {
    if (over || !started) return
    if (id === current.id) {
      setScore((s) => s + 10)
      const next = idx + 1
      if (next >= steps.length) {
        setOver(true)
      } else {
        setIdx(next)
      }
    } else {
      setMistakes((m) => m + 1)
      setScore((s) => Math.max(0, s - 5))
    }
  }

  const reset = () => {
    setStarted(false)
    setTimeLeft(60)
    setIdx(0)
    setScore(0)
    setMistakes(0)
    setOver(false)
  }

  const pct = Math.round((idx / steps.length) * 100)

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Virtual Mock Drill</h2>
          <p className="text-sm text-muted-foreground">Earthquake response, gamified. Pick the correct next step.</p>
        </div>
        <div className="text-sm text-muted-foreground">
          Time: <span aria-live="polite">{timeLeft}s</span> • Score: {score} • Mistakes: {mistakes}
        </div>
      </header>

      <div className="gradient-border">
        <div className="inner p-4">
          <div className="text-sm text-muted-foreground mb-2">
            Progress: {idx} / {steps.length} steps ({pct}%)
          </div>
          <div
            className="h-2 w-full rounded-full bg-muted overflow-hidden"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {!started ? (
        <div className="flex items-center gap-3">
          <button onClick={() => setStarted(true)} className="rounded-md px-4 py-2 bg-primary text-primary-foreground">
            Start Drill
          </button>
          <button onClick={reset} className="rounded-md px-3 py-2 bg-muted text-foreground">
            Reset
          </button>
        </div>
      ) : over ? (
        <div className="space-y-4">
          <div className="gradient-border">
            <div className="inner p-4">
              <h3 className="text-lg font-medium">Drill Complete</h3>
              <p className="text-sm text-muted-foreground">
                Final score: {score}. Mistakes: {mistakes}. {timeLeft === 0 ? "Time ran out." : "Great job!"}
              </p>
            </div>
          </div>
          <button onClick={reset} className="rounded-md px-4 py-2 bg-primary text-primary-foreground">
            Try Again
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="gradient-border">
            <div className="inner p-4">
              <div className="text-sm text-muted-foreground mb-1">Next required step:</div>
              <div className="text-2xl font-semibold">{current.label}</div>
              {current.tip ? <p className="text-sm text-muted-foreground mt-2">{current.tip}</p> : null}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {choices.map((c) => (
              <button key={c.id} onClick={() => handleChoice(c.id)} className="gradient-border text-left">
                <div className="inner p-3">
                  <div className="font-medium">{c.label}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
