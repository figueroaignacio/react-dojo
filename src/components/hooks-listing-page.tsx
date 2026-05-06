"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import type { CustomHook, HookCategory } from "@/content/custom-hooks"
import { useLocaleRouter } from "@/hooks/use-locale-router"
import { REPOSITORY } from "@/lib/constants"
import { ExternalLink, GitBranch, GitFork, Plus, Star } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

const categoryColors: Record<HookCategory, string> = {
  state: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  dom: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  utility: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  async: "bg-purple-400/10 text-purple-400 border-purple-400/20",
}

const CATEGORIES: Array<{ id: HookCategory | "all"; label: string }> = [
  { id: "all", label: "All" },
  { id: "state", label: "State" },
  { id: "dom", label: "DOM" },
  { id: "utility", label: "Utility" },
  { id: "async", label: "Async" },
]

interface HooksListingPageProps {
  hooks: CustomHook[]
}

export function HooksListingPage({ hooks }: HooksListingPageProps) {
  const t = useTranslations("CustomHooks")
  const { push } = useLocaleRouter()
  const [activeCategory, setActiveCategory] = useState<HookCategory | "all">("all")
  const [addOpen, setAddOpen] = useState(false)

  const filtered =
    activeCategory === "all" ? hooks : hooks.filter((h) => h.category === activeCategory)

  return (
    <div className="mx-auto max-w-[1000px] px-5 py-10 md:px-12 md:py-20">
      {/* Header */}
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <div className="text-fg-dim mb-3 flex items-center gap-3 text-[11px] tracking-[0.14em] uppercase">
            <span>{t("sectionLabel")}</span>
            <span className="bg-fg-faint h-px w-4" />
            <span>{t("hookCount", { count: hooks.length })}</span>
          </div>
          <h1 className="text-fg font-mono text-[32px] leading-none font-medium">{t("title")}</h1>
          <p className="text-fg-muted mt-4 max-w-lg text-[16px] leading-[1.65]">
            {t("description")}
          </p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="text-fg-muted hover:border-fg-strong hover:text-fg border-line flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 font-mono text-[12px] transition-colors"
        >
          <Plus className="h-[13px] w-[13px]" strokeWidth={2} />
          {t("addHook")}
        </button>
      </div>

      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={[
              "border-line rounded-md border px-3 py-1.5 font-mono text-[12px] transition-colors",
              activeCategory === cat.id
                ? "border-fg-strong bg-bg-raise text-fg"
                : "border-line text-fg-dim hover:border-fg-strong hover:text-fg-muted",
            ].join(" ")}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Hook cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((hook) => (
          <button
            key={hook.id}
            onClick={() => push(`/hooks/${hook.id}`)}
            className="border-line hover:border-fg-strong bg-bg flex cursor-pointer flex-col gap-3 rounded-lg border p-5 text-left transition-all hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span
                className={`border-line rounded border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase ${categoryColors[hook.category]}`}
              >
                {hook.category}
              </span>
            </div>
            <div>
              <h2 className="text-fg group-hover:text-fg font-mono text-[15px] font-medium transition-colors">
                {hook.label}
              </h2>
              <p className="text-fg-muted mt-1.5 text-[13px] leading-[1.6]">{hook.description}</p>
            </div>
            <span className="text-fg-dim group-hover:text-fg-muted mt-auto text-[11px] transition-colors">
              {t("viewHook")} →
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="border-line rounded-lg border px-6 py-16 text-center">
          <p className="text-fg-dim text-[13px]">{t("noHooks")}</p>
        </div>
      )}

      {/* Add hook dialog */}
      <AddHookDialog open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  )
}

function AddHookDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("CustomHooks")
  const repoUrl = `https://github.com/${REPOSITORY}`

  const steps = [
    {
      icon: Star,
      number: "01",
      title: t("step1Title"),
      description: t("step1Desc"),
      href: repoUrl,
      linkText: t("step1Link"),
      accent: "text-amber-400",
      ring: "border-amber-400/30 bg-amber-400/6",
    },
    {
      icon: GitFork,
      number: "02",
      title: t("step2Title"),
      description: t("step2Desc"),
      href: `${repoUrl}/fork`,
      linkText: t("step2Link"),
      accent: "text-blue-400",
      ring: "border-blue-400/30 bg-blue-400/6",
    },
    {
      icon: GitBranch,
      number: "03",
      title: t("step3Title"),
      description: t("step3Desc"),
      href: `${repoUrl}/compare`,
      linkText: t("step3Link"),
      accent: "text-emerald-400",
      ring: "border-emerald-400/30 bg-emerald-400/6",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md gap-0 overflow-hidden p-0">
        {/* Header */}
        <div className="border-line border-b px-6 pt-6 pb-5">
          <DialogTitle className="text-fg text-[17px] leading-none font-semibold">
            {t("dialogTitle")}
          </DialogTitle>
          <p className="text-fg-muted mt-2 text-[13px] leading-[1.55]">{t("dialogSubtitle")}</p>
        </div>

        {/* Steps — vertical timeline */}
        <div className="px-6 py-5">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isLast = index === steps.length - 1
            return (
              <div key={step.number} className="relative flex gap-4">
                {/* Timeline column */}
                <div className="flex flex-col items-center">
                  <div
                    className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${step.ring}`}
                  >
                    <Icon className={`h-[15px] w-[15px] ${step.accent}`} strokeWidth={1.7} />
                  </div>
                  {!isLast && (
                    <div className="bg-line mt-1 mb-1 w-px flex-1" style={{ minHeight: 20 }} />
                  )}
                </div>

                {/* Content */}
                <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-5"}`}>
                  <div className="mb-0.5 flex items-baseline gap-2">
                    <span
                      className={`font-mono text-[9px] font-bold tracking-widest ${step.accent}`}
                    >
                      {step.number}
                    </span>
                    <h3 className="text-fg text-[13px] font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-fg-muted mb-2.5 text-[12px] leading-[1.65]">
                    {step.description}
                  </p>
                  <a
                    href={step.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-line bg-bg-raise text-fg-muted hover:border-line-strong hover:text-fg inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors"
                  >
                    {step.linkText}
                    <ExternalLink className="h-[9px] w-[9px] opacity-60" strokeWidth={2} />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="border-line bg-bg-raise mx-6 mb-5 flex items-center gap-2 rounded-md border px-3 py-2">
          <span className="text-fg-dim shrink-0 text-[10px]">{t("dialogNote")}</span>
          <code className="text-fg-muted truncate font-mono text-[10px]">
            src/content/custom-hooks/index.ts
          </code>
        </div>
      </DialogContent>
    </Dialog>
  )
}
