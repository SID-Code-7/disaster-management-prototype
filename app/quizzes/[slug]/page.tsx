import { notFound } from "next/navigation"
import { modules } from "@/lib/modules"
import Quiz from "@/components/quiz"

export default function QuizByModulePage({ params }: { params: { slug: string } }) {
  const mod = modules.find((m) => m.id === params.slug)
  if (!mod) return notFound()

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">{mod.title} Quiz</h1>
        <p className="text-muted-foreground mt-2">Answer quick scenarios to practice the right actions.</p>
      </header>
      <section className="gradient-border">
        <div className="inner p-4">
          <Quiz moduleId={mod.id} questions={mod.quiz} />
        </div>
      </section>
    </main>
  )
}
