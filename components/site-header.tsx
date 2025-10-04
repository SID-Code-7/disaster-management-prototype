"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const nav = [
    { href: "/", label: "Home" },
    { href: "/modules", label: "Modules" },
    { href: "/quizzes", label: "Quizzes" },
    { href: "/safety-kit", label: "Safety Kit" },
    { href: "/dashboard", label: "Dashboard" },
  ]

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          <span className="gradient-text">DisasterReady</span>
          <span className="sr-only">DisasterReady Home</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.disabled ? "#" : item.href}
              aria-disabled={item.disabled ? true : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm",
                pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                item.disabled && "opacity-50 pointer-events-none",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
