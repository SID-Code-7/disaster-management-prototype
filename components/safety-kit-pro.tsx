"use client"

import { useEffect, useMemo, useState } from "react"

type KitItem = {
  id: string
  label: string
  hint?: string
}

const DEFAULT_ITEMS: KitItem[] = [
  { id: "water", label: "Water (3-day supply)", hint: "3L per person/day" },
  { id: "food-bars", label: "Non-perishable Food", hint: "Ready-to-eat bars/cans" },
  { id: "flashlight", label: "Flashlight", hint: "With extra batteries" },
  { id: "batteries", label: "Batteries", hint: "AA/AAA for devices" },
  { id: "first-aid", label: "First Aid Kit", hint: "Bandages, antiseptic, etc." },
  { id: "meds", label: "Personal Medications", hint: "7-day supply + copies of prescriptions" },
  { id: "whistle", label: "Whistle", hint: "Signal for help" },
  { id: "mask", label: "N95 Masks", hint: "Dust/smoke/ash protection" },
  { id: "radio", label: "Battery/Hand-crank Radio", hint: "NOAA weather updates" },
  { id: "power-bank", label: "Power Bank", hint: "Phone backup power" },
  { id: "multi-tool", label: "Multi-tool", hint: "Basic repairs/utility" },
  { id: "blanket", label: "Thermal Blanket", hint: "Emergency warmth" },
  { id: "cash", label: "Small Cash", hint: "ATMs may be offline" },
  { id: "documents", label: "Important Documents", hint: "IDs, insurance, contacts" },
  { id: "sanitizer", label: "Hygiene & Sanitizer", hint: "Soap, wipes, sanitizer" },
]

const ESSENTIAL_IDS = new Set<string>([
  "water",
  "food-bars",
  "flashlight",
  "batteries",
  "first-aid",
  "meds",
  "radio",
  "documents",
])

const STORAGE_KEY = "safety-kit-v2"

export default function SafetyKitPro({
  maxSelect = 8,
  items = DEFAULT_ITEMS,
}: {
  maxSelect?: number
  items?: KitItem[]
}) {
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setSelected(parsed.filter((id) => items.some((i) => i.id === id)))
      }
    } catch {
      // ignore
    }
  }, [items])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selected))
    } catch {
      // ignore
    }
  }, [selected])

  const selectedSet = useMemo(() => new Set(selected), [selected])
  const selectedCount = selected.length
  const limitReached = selectedCount >= maxSelect

  const labelById = useMemo(() => Object.fromEntries(items.map((i) => [i.id, i.label] as const)), [items])
  const missingEssentials = useMemo(() => Array.from(ESSENTIAL_IDS).filter((id) => !selectedSet.has(id)), [selectedSet])
  const selectionComplete = selectedCount === maxSelect
  const isPerfectKit = selectionComplete && missingEssentials.length === 0
  const suggestionLabels = useMemo(
    () =>
      missingEssentials
        .map((id) => labelById[id])
        .filter(Boolean)
        .slice(0, 3),
    [missingEssentials, labelById],
  )

  const toggle = (id: string) => {
    setSelected((prev) => {
      const set = new Set(prev)
      if (set.has(id)) {
        set.delete(id)
      } else {
        // Enforce hard cap
        if (prev.length >= maxSelect) return prev
        set.add(id)
      }
      return Array.from(set)
    })
  }

  const reset = () => setSelected([])

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-pretty">Build Your Emergency Safety Kit</h1>
        <p className="text-sm opacity-80">
          Select exactly {maxSelect} items out of {items.length}. Your choices are saved in your browser.
        </p>
        <div className="flex items-center gap-3">
          <div aria-hidden className="h-2 w-40 rounded bg-muted/40 overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${(selectedCount / maxSelect) * 100}%` }}
            />
          </div>
          <span className="text-sm">
            {selectedCount}/{maxSelect} selected
          </span>
          {limitReached ? (
            <span className="text-xs text-foreground/80">Limit reached. Deselect to choose others.</span>
          ) : null}
          <button
            type="button"
            onClick={reset}
            className="ml-auto inline-flex items-center rounded-md border px-3 py-1.5 text-sm hover:bg-accent/50"
          >
            Reset
          </button>
        </div>
      </header>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const isSelected = selectedSet.has(item.id)
          const isDisabled = !isSelected && limitReached
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                disabled={isDisabled}
                className={[
                  "w-full text-left rounded-lg border p-4 transition",
                  isSelected ? "border-primary bg-primary/10" : "border-border hover:bg-accent/40",
                  isDisabled ? "opacity-50 cursor-not-allowed" : "",
                ].join(" ")}
                aria-pressed={isSelected}
                aria-label={`Select ${item.label}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{item.label}</div>
                    {item.hint ? <div className="text-xs opacity-80 mt-0.5">{item.hint}</div> : null}
                  </div>
                  <div
                    className={[
                      "h-5 w-5 rounded border flex items-center justify-center text-[10px]",
                      isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border",
                    ].join(" ")}
                    aria-hidden
                  >
                    {isSelected ? "✓" : ""}
                  </div>
                </div>
              </button>
            </li>
          )
        })}
      </ul>

      {selectionComplete ? (
        isPerfectKit ? (
          <div className="rounded-md border p-4 bg-primary/10">
            <p className="font-medium">Yes! Nice going — your kit covers the core essentials.</p>
            <p className="text-sm opacity-85 mt-1">
              You can always fine-tune for your family needs, pets, and local risks.
            </p>
          </div>
        ) : (
          <div className="rounded-md border p-4 bg-destructive/10">
            <p className="font-medium">You have to store more essential items.</p>
            {suggestionLabels.length > 0 ? (
              <p className="text-sm opacity-85 mt-1">Consider adding: {suggestionLabels.join(", ")}.</p>
            ) : null}
            <p className="text-sm opacity-85 mt-1">
              Deselect a non-essential item and choose an essential one to improve your kit.
            </p>
          </div>
        )
      ) : null}

      <div className="rounded-md border p-4">
        <h2 className="font-semibold mb-2">Tips</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Store your kit in an easy-to-carry bag in a known location.</li>
          <li>Check expiration dates every 6 months and rotate supplies.</li>
          <li>Customize for children, elderly, and pets.</li>
        </ul>
      </div>
    </section>
  )
}
