"use client"

import { useEffect, useMemo, useState } from "react"
import { useProgress } from "@/hooks/use-progress"
import { cn } from "@/lib/utils"

type ChecklistProps = {
  moduleId: string
  items: string[]
  className?: string
}

export function Checklist({ moduleId, items, className }: ChecklistProps) {
  const { data, update } = useProgress()
  const saved = data?.[moduleId]?.checklist || []
  const [checked, setChecked] = useState<boolean[]>(items.map((_, i) => saved[i] ?? false))

  useEffect(() => {
    setChecked(items.map((_, i) => saved[i] ?? false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId])

  const completed = useMemo(() => (checked.filter(Boolean).length / items.length) * 100, [checked, items.length])

  const toggle = (i: number) => {
    const next = [...checked]
    next[i] = !next[i]
    setChecked(next)
    update(moduleId, {
      checklist: next,
      checklistCompletion: Math.round((next.filter(Boolean).length / items.length) * 100),
    })
  }

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <label key={i} className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            className="mt-1 size-4 rounded border-input"
            checked={checked[i] || false}
            onChange={() => toggle(i)}
            aria-label={item}
          />
          <span className={cn("leading-relaxed", checked[i] && "line-through text-muted-foreground")}>{item}</span>
        </label>
      ))}
      <p className="text-sm text-muted-foreground">Checklist completion: {Math.round(completed)}%</p>
    </div>
  )
}
