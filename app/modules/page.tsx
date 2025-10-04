import Link from "next/link"
import { modules } from "@/lib/modules"
import { GradientBox } from "@/components/gradient-box"

export default function ModulesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-balance">Preparedness Modules</h1>
        <p className="text-muted-foreground leading-relaxed mt-2">
          Learn through bite-sized actions and quick quizzes. Each module mixes practical checklists with scenarios to
          keep things engaging.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {modules.map((m) => (
          <GradientBox key={m.id} className="h-full">
            <article className="inner p-5 h-full flex flex-col">
              <img src={m.image || "/placeholder.svg"} alt={m.imageAlt} className="w-full rounded-md" />
              <h2 className="mt-4 text-xl font-semibold">{m.title}</h2>
              <p className="mt-1 text-muted-foreground">{m.description}</p>
              <div className="mt-4 flex-1" />
              <div className="mt-3 flex gap-2">
                <Link
                  href={`/modules/${m.id}`}
                  className="rounded-md px-4 py-2 text-background"
                  style={{
                    background: "linear-gradient(90deg, var(--color-brand-accent), var(--color-brand-primary))",
                  }}
                >
                  Open Module
                </Link>
                <Link href="/dashboard" className="rounded-md border px-4 py-2">
                  Dashboard
                </Link>
                <Link href={`/quizzes/${m.id}`} className="rounded-md border px-4 py-2">
                  Take Quiz
                </Link>
              </div>
            </article>
          </GradientBox>
        ))}
      </div>
    </div>
  )
}
