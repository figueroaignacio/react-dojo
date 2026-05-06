"use client"

import { GitHubIcon } from "@/components/svg-icons"
import { authClient } from "@/lib/auth-client"

interface Props {
  label: string
}

export function GitHubSignInButton({ label }: Props) {
  return (
    <button
      type="button"
      onClick={async () => {
        await authClient.signIn.social({ provider: "github" })
      }}
      className="border-line-strong bg-bg-raise text-fg hover:border-fg-muted hover:bg-bg-hover flex items-center gap-2 rounded-md border px-3 py-1.5 text-[12px] font-medium transition-colors"
    >
      <GitHubIcon className="h-[15px] w-[15px]" />
      {label}
    </button>
  )
}
