"use client"

import { useMemo } from "react"
import { useKit, type KitItem } from "@/hooks/use-kit"

const DEFAULT_ITEMS: KitItem[] = [
  { id: "water", name: "Water (3 days)", category: "food", note: "4L per person per day" },
  { id: "food", name: "Non-perishable food (3 days)", category: "food" },
  { id: "meds", name: "Medications", category: "health" },
  { id: "first-aid", name: "First aid kit", category: "health" },
  { id: "flashlight", name: "Flashlight + batteries", category: "tools" },
  { id: "radio", name: "Battery/hand-crank radio", category: "tools" },
  { id: "charger", name: "Power bank/charger", category: "tools" },
  { id: "docs", name: "Copies of IDs & documents", category: "docs" },
  { id: "cash", name: "Emergency cash", category: "essentials" },
  { id: "whistle", name: "Whistle", category: "tools" },
  { id: "mask", name: "N95 mask", category: "health" },
  { id: "blanket", name: "Space blanket", category: "essentials" },
  { id: "toiletries", name: "Basic toiletries (soap, toothbrush)", category: "essentials" },
  { id: "multitool", name: "Multi-tool", category: "tools" },
  { id: "map", name: "Local map + contact list", category: "docs" },
]

export default function SafetyKit() {
  const { items, selected, toggle, clear, count, total, target, isSelected } = useKit(DEFAULT_ITEMS, {
    maxSelect: 8,
  })

  const grouped = useMemo(() => {
    const g: Record<string, KitItem[]> = {}
    for (const it of items) {
      g[it.category] = g[it.category] || []
      g[it.category].push(it)
    }
    return g
  }, [items])

  const pct = Math.round((count / (target || 1)) * 100)
  const limitReached = count >= target

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Build Your Safety Kit</h2>
          <p className="text-sm text-muted-foreground">
            Select up to {target} of {total} recommended items. Progress is saved on this device.
          </p>
        </div>
        <button onClick={clear} className="rounded-md px-3 py-2 bg-muted text-foreground">
          Reset
        </button>
      </header>

      <div className="gradient-border">
        <div className="inner p-4">
          <div className="flex items-center justify-between">
            <div aria-label="Kit progress" className="text-sm text-muted-foreground mb-2">
              {count} of {target} selected ({pct}%)
            </div>
            {limitReached ? (
              <div className="text-xs text-muted-foreground" role="status">
                Selection limit reached
              </div>
            ) : null}
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

      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(grouped).map(([category, arr]) => (
          <section key={category} className="space-y-3">
            <h3 className="text-sm uppercase tracking-wide text-muted-foreground">{category}</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {arr.map((it) => {
                const active = isSelected(it.id)
                const disabled = !active && limitReached
                return (
                  <li key={it.id}>
                    <button
                      onClick={() => !disabled && toggle(it.id)}
                      disabled={disabled}
                      className={`w-full text-left gradient-border ${
                        active ? "ring-2 ring-[hsl(var(--ring))]" : ""
                      } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
                      aria-pressed={active}
                      aria-disabled={disabled || undefined}
                    >
                      <div className="inner p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{it.name}</span>
                          <span
                            className={`ml-3 inline-flex h-5 w-5 items-center justify-center rounded-md text-xs ${
                              active
                                ? "bg-primary text-primary-foreground"
                                : disabled
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-muted text-foreground"
                            }`}
                            aria-hidden
                          >
                            {active ? "✓" : disabled ? "•" : "+"}
                          </span>
                        </div>
                        {it.note ? <p className="text-xs text-muted-foreground mt-1">{it.note}</p> : null}
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
