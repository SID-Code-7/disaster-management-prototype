import Link from "next/link"
import { GradientBox } from "@/components/gradient-box"
import { ProgressOverview } from "./partials/progress-overview"

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div className="space-y-5">
          <h1 className="text-4xl font-bold text-balance">
            Be ready, stay safe with <span className="gradient-text">DisasterReady</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Interactive modules, quick checklists, and scenario-based quizzes that keep students engaged while learning
            real-world preparedness for natural disasters.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/modules"
              className="rounded-md px-4 py-2 text-background"
              style={{ background: "linear-gradient(90deg, var(--color-brand-accent), var(--color-brand-primary))" }}
            >
              Start Learning
            </Link>
            <Link href="/dashboard" className="rounded-md px-4 py-2 border">
              View Dashboard
            </Link>
          </div>
        </div>
        <GradientBox className="md:justify-self-end md:w-[520px]">
          <div className="inner p-6">
            <img
              src="/students-learning-disaster-preparedness.jpg"
              alt="Students learning disaster preparedness"
              className="w-full rounded-md"
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold">What you’ll get</h2>
              <ul className="mt-2 list-disc pl-5 text-muted-foreground leading-relaxed">
                <li>Hands-on checklists and micro-lessons</li>
                <li>Short scenario quizzes to reinforce decisions</li>
                <li>Personal dashboard to track your progress</li>
              </ul>
            </div>
          </div>
        </GradientBox>
      </section>

      <section className="mt-12">
        <ProgressOverview />
      </section>
    </div>
  )
}
