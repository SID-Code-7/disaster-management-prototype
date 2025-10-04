"use client"

import { useState } from "react"
import { useProgress } from "@/hooks/use-progress"
import { cn } from "@/lib/utils"

export type QuizQuestion = {
  id: string
  question: string
  options: string[]
  answerIndex: number
  explanation?: string
}

export function Quiz({
  moduleId,
  questions,
  className,
}: { moduleId: string; questions: QuizQuestion[]; className?: string }) {
  const { data, update } = useProgress()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [score, setScore] = useState(data?.[moduleId]?.quizScore || 0)
  const [finished, setFinished] = useState(false)

  const q = questions[current]

  const submit = () => {
    if (selected === null) return
    const correct = selected === q.answerIndex
    setFeedback(correct ? "correct" : "wrong")
    if (correct) {
      const newScore = score + 1
      setScore(newScore)
    }
  }

  const next = () => {
    const nextIdx = current + 1
    if (nextIdx >= questions.length) {
      setFinished(true)
      update(moduleId, {
        quizScore: score,
        quizTotal: questions.length,
      })
    } else {
      setCurrent(nextIdx)
      setSelected(null)
      setFeedback(null)
    }
  }

  if (!questions.length) return null

  return (
    <div className={cn("space-y-4", className)}>
      {!finished ? (
        <>
          <div className="text-sm text-muted-foreground">
            Question {current + 1} of {questions.length}
          </div>
          <h3 className="text-lg font-semibold text-pretty">{q.question}</h3>
          <div className="grid gap-2">
            {q.options.map((opt, i) => {
              const active = selected === i
              const correctChoice = feedback && i === q.answerIndex
              const wrongChoice = feedback && selected === i && i !== q.answerIndex
              return (
                <button
                  key={i}
                  className={cn(
                    "rounded-md border px-3 py-2 text-left transition-colors",
                    active && "border-foreground",
                    correctChoice && "border-green-600/50",
                    wrongChoice && "border-red-600/50",
                  )}
                  onClick={() => setSelected(i)}
                  aria-pressed={active}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {feedback && (
            <div
              className={cn(
                "rounded-md border px-3 py-2 text-sm",
                feedback === "correct" ? "border-green-600/50" : "border-red-600/50",
              )}
            >
              {feedback === "correct" ? "Correct! " : "Not quite. "}
              {q.explanation}
            </div>
          )}

          <div className="flex gap-2">
            <button
              className="rounded-md px-4 py-2 text-sm text-background"
              style={{ background: "linear-gradient(90deg, var(--color-brand-accent), var(--color-brand-primary))" }}
              onClick={feedback ? next : submit}
            >
              {feedback ? "Next" : "Submit"}
            </button>
            <div className="text-sm text-muted-foreground self-center">Score: {score}</div>
          </div>
        </>
      ) : (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Great job!</h3>
          <p className="text-muted-foreground">
            You scored {score} out of {questions.length}.
          </p>
          <button
            className="rounded-md px-4 py-2 text-sm text-background"
            style={{ background: "linear-gradient(90deg, var(--color-brand-accent), var(--color-brand-primary))" }}
            onClick={() => {
              setCurrent(0)
              setSelected(null)
              setFeedback(null)
              setScore(0)
              setFinished(false)
            }}
          >
            Retry quiz
          </button>
        </div>
      )}
    </div>
  )
}

export default Quiz
