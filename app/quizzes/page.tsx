"use client"

import Link from "next/link"
import { modules } from "@/lib/modules"

export default function QuizzesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-pretty">Preparedness Quizzes</h1>
        <p className="text-muted-foreground mt-2">
          Test your knowledge for each disaster module. Your progress is saved locally.
        </p>
      </header>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((m) => (
          <li key={m.id} className="gradient-border">
            <div className="inner p-4">
              <h2 className="text-lg font-medium">{m.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-2">{m.description}</p>
              <div className="mt-4">
                <Link
                  href={`/quizzes/${m.id}`}
                  className="inline-flex items-center rounded-md px-3 py-2 bg-primary text-primary-foreground"
                >
                  Start quiz
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
