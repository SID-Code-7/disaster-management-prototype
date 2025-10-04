"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "disaster-ready:safety-kit:v1"

export type KitItem = {
  id: string
  name: string
  note?: string
  category: "essentials" | "health" | "tools" | "docs" | "food"
}

export function useKit(initialItems: KitItem[], options?: { maxSelect?: number }) {
  const [selected, setSelected] = useState<string[]>([])
  const [items] = useState<KitItem[]>(initialItems)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setSelected(parsed.filter((x) => typeof x === "string"))
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selected))
    } catch {}
  }, [selected])

  const target = Math.max(0, Math.min(options?.maxSelect ?? items.length, items.length))

  const toggle = (id: string) =>
    setSelected((prev) => {
      const has = prev.includes(id)
      if (has) return prev.filter((x) => x !== id)
      if (prev.length >= target) return prev // cap reached; ignore
      return [...prev, id]
    })

  const clear = () => setSelected([])

  return {
    items,
    selected,
    toggle,
    clear,
    count: selected.length,
    total: items.length, // keep for backward compatibility (total available items)
    target, // <NEW> maximum items allowed to select
    isSelected: (id: string) => selected.includes(id),
  }
}
