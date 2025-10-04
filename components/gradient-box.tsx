import { cn } from "@/lib/utils"
import type { PropsWithChildren } from "react"
import type { JSX } from "react/jsx-runtime"

type Props = PropsWithChildren<{
  className?: string
  innerClassName?: string
  as?: keyof JSX.IntrinsicElements
}>

export function GradientBox({ className, innerClassName, as = "div", children }: Props) {
  const Comp: any = as
  return (
    <Comp className={cn("gradient-border card-hover", className)}>
      <div className={cn("inner p-4", innerClassName)}>{children}</div>
    </Comp>
  )
}
