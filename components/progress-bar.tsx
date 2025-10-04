"use client"

import { cn } from "@/lib/utils"

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div
      className={cn("w-full h-2 rounded-full bg-muted", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-label="Progress"
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${clamped}%`,
          background: "linear-gradient(90deg, var(--color-brand-accent), var(--color-brand-primary))",
        }}
      />
    </div>
  )
}
