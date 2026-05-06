"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useTranslations } from "next-intl"

interface ShortcutsModalProps {
  open: boolean
  onClose: () => void
}

function ShortcutRow({ keys, label }: { keys: string[]; label: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-fg-muted text-[13px]">{label}</span>
      <div className="flex items-center gap-1">
        {keys.map((k) => (
          <kbd
            key={k}
            className="bg-bg-hover text-fg-muted rounded-md px-2 py-1 font-mono text-[11px] leading-none"
          >
            {k}
          </kbd>
        ))}
      </div>
    </div>
  )
}

function ShortcutSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-fg-faint mb-1 text-[10px] font-semibold tracking-widest uppercase">
        {title}
      </p>
      <div className="divide-line divide-y">{children}</div>
    </div>
  )
}

export function ShortcutsModal({ open, onClose }: ShortcutsModalProps) {
  const t = useTranslations("ShortcutsModal")

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="border-line-strong bg-bg-raise max-w-sm p-0">
        <DialogHeader className="border-line border-b px-5 py-4">
          <DialogTitle className="text-fg font-mono text-[14px]">{t("title")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 px-5 py-4">
          <ShortcutSection title={t("sectionNavigation")}>
            <ShortcutRow keys={["←", "→"]} label={t("navigate")} />
            <ShortcutRow keys={["⌘", "K"]} label={t("search")} />
          </ShortcutSection>
          <ShortcutSection title={t("sectionHome")}>
            <ShortcutRow keys={["space"]} label={t("start")} />
            <ShortcutRow keys={["P"]} label={t("practice")} />
            <ShortcutRow keys={["S"]} label={t("surprise")} />
          </ShortcutSection>
          <ShortcutSection title={t("sectionGeneral")}>
            <ShortcutRow keys={["?"]} label={t("openShortcuts")} />
          </ShortcutSection>
        </div>
      </DialogContent>
    </Dialog>
  )
}
