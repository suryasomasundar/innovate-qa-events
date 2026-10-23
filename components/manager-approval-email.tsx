"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

type ManagerApprovalEmailProps = {
  email: string
}

export function ManagerApprovalEmail({ email }: ManagerApprovalEmailProps) {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="rounded-2xl border border-purple-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-purple-100 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-purple-800">Ready-to-use request</p>
          <h2 className="mt-1 text-2xl font-bold">Copy, personalize, and send</h2>
        </div>
        <Button type="button" onClick={copyEmail} className="min-h-11 bg-purple-800 text-white hover:bg-purple-900">
          {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
          {copied ? "Copied" : "Copy email"}
        </Button>
      </div>
      <pre className="whitespace-pre-wrap p-5 font-sans text-sm leading-7 text-slate-700 md:p-7">{email}</pre>
    </div>
  )
}
