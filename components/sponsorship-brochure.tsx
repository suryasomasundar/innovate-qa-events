"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { Download, LoaderCircle } from "lucide-react"
import { appConfig } from "@/lib/app-config"
import sponsorData from "@/data/sponsor/2027.json"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Work email", type: "email", autoComplete: "email" },
  { name: "linkedin", label: "LinkedIn profile URL", type: "url", autoComplete: "url" },
  { name: "company", label: "Company", type: "text", autoComplete: "organization" },
  { name: "title", label: "Job title", type: "text", autoComplete: "organization-title" },
]

export function SponsorshipBrochure() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const { brochureUrl, leadCaptureEndpoint } = appConfig.sponsorship
  const configured = Boolean(brochureUrl && leadCaptureEndpoint)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!configured || status === "submitting") return
    const formData = new FormData(event.currentTarget)
    setStatus("submitting")
    try {
      const response = await fetch(leadCaptureEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })
      if (!response.ok) throw new Error("Brochure request failed")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="h-auto min-h-11 whitespace-normal">
          <Download className="mr-2 h-5 w-5 shrink-0" aria-hidden="true" />
          Download Sponsorship Brochure
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Download Sponsorship Brochure</DialogTitle>
          <DialogDescription>Tell us about yourself to access the {sponsorData.conference.eventName} sponsorship brochure. All fields are required.</DialogDescription>
        </DialogHeader>
        {status === "success" ? (
          <div className="space-y-4">
            <p role="status">Your details have been submitted. Your brochure is ready.</p>
            <Button asChild className="h-auto min-h-11 whitespace-normal">
              <a href={brochureUrl} download target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />Download brochure
              </a>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={`brochure-${field.name}`}>{field.label} (required)</Label>
                <Input id={`brochure-${field.name}`} name={field.name} type={field.type} autoComplete={field.autoComplete} required maxLength={300} disabled={status === "submitting"} />
              </div>
            ))}
            <p className="text-sm text-muted-foreground">
              We use these details to respond to your sponsorship inquiry. Read our <Link href="/privacy-policy" className="underline underline-offset-4">privacy policy</Link>.
            </p>
            {!configured && <p id="brochure-unavailable" role="status" className="text-sm">The brochure download is not available yet. Please <a href="mailto:contact@innovateqaevents.com?subject=Sponsorship%20brochure" className="underline underline-offset-4">contact us for a copy</a>.</p>}
            {status === "error" && <p role="alert" className="text-sm text-destructive">We could not submit your details. Please try again or email contact@innovateqaevents.com.</p>}
            <Button type="submit" disabled={!configured || status === "submitting"} aria-describedby={!configured ? "brochure-unavailable" : undefined} className="w-full h-auto min-h-11 whitespace-normal">
              {status === "submitting" ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Download className="mr-2 h-4 w-4" aria-hidden="true" />}
              {status === "submitting" ? "Submitting..." : "Get Sponsorship Brochure"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}