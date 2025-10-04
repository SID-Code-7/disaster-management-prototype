"use client"

import useSWR from "swr"

type ModuleProgress = {
  checklist?: boolean[]
  checklistCompletion?: number
  quizScore?: number
  quizTotal?: number
}

export type ProgressState = Record<string, ModuleProgress>

const KEY = "dr_progress_v1"

const fetcher = (): ProgressState => {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

const save = (data: ProgressState) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

export function useProgress() {
  const { data = {}, mutate } = useSWR<ProgressState>(KEY, fetcher, { fallbackData: {} })

  const update = (moduleId: string, patch: Partial<ModuleProgress>) => {
    const next = { ...data, [moduleId]: { ...(data[moduleId] || {}), ...patch } }
    save(next)
    mutate(next, { revalidate: false })
  }

  const reset = () => {
    save({})
    mutate({}, { revalidate: false })
  }

  return { data, update, reset }
}
