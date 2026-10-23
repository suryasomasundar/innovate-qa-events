"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Show, SignInButton, SignUpButton, useUser } from "@clerk/react"
import { Camera, Check, Loader2, LogIn, Save, UserRoundPlus } from "lucide-react"
import { clerkEnabled } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const interestOptions = [
  "AI in testing",
  "Test automation",
  "Quality strategy",
  "Leadership",
  "Performance",
  "Accessibility",
  "Mobile testing",
  "Career growth",
]

type MemberProfile = {
  jobTitle: string
  company: string
  careerStage: string
  location: string
  linkedInUrl: string
  bio: string
  interests: string[]
  profileVisible: boolean
  joinedAt?: string
}

const emptyProfile: MemberProfile = {
  jobTitle: "",
  company: "",
  careerStage: "",
  location: "",
  linkedInUrl: "",
  bio: "",
  interests: [],
  profileVisible: false,
}

function ProfileEditor() {
  const { isLoaded, user } = useUser()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [profile, setProfile] = useState<MemberProfile>(emptyProfile)
  const [photo, setPhoto] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user) return
    const stored = (user.unsafeMetadata.memberProfile ?? {}) as Partial<MemberProfile>
    setFirstName(user.firstName ?? "")
    setLastName(user.lastName ?? "")
    setProfile({ ...emptyProfile, ...stored, interests: stored.interests ?? [] })
  }, [user])

  useEffect(() => {
    if (!photo) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(photo)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [photo])

  if (!isLoaded || !user) {
    return (
      <div className="flex min-h-[20rem] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-primary" aria-label="Loading member profile" />
      </div>
    )
  }

  const toggleInterest = (interest: string) => {
    setProfile((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest],
    }))
  }

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setMessage("")
    setError("")

    try {
      if (photo) await user.setProfileImage({ file: photo })
      await user.update({ firstName: firstName.trim(), lastName: lastName.trim() })
      await user.updateMetadata({
        unsafeMetadata: {
          memberProfile: {
            ...profile,
            joinedAt: profile.joinedAt ?? new Date().toISOString(),
          },
        },
      })
      setPhoto(null)
      setMessage("Your member profile has been updated.")
    } catch (caught) {
      const clerkError = caught as { errors?: Array<{ longMessage?: string; message?: string }> }
      setError(clerkError.errors?.[0]?.longMessage ?? clerkError.errors?.[0]?.message ?? "We could not save your profile. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={saveProfile} className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-col items-center justify-between gap-6 rounded-3xl border bg-card p-6 shadow-sm sm:flex-row sm:p-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group relative h-28 w-28 overflow-hidden rounded-full border-4 border-purple-100 bg-purple-50 shadow-sm"
            aria-label="Change profile photo"
          >
            <Image src={previewUrl ?? user.imageUrl} alt="Member profile" fill className="object-cover" unoptimized />
            <span className="absolute inset-0 flex items-center justify-center bg-purple-950/65 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100">
              <Camera className="h-6 w-6" aria-hidden="true" />
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            onChange={(event) => setPhoto(event.target.files?.[0] ?? null)}
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{user.fullName || "Your member profile"}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-3 text-sm font-semibold text-primary hover:underline">
              Upload a new photo
            </button>
            <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, or WebP.</p>
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full gap-2 sm:w-auto" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
          {saving ? "Saving…" : "Save profile"}
        </Button>
      </div>

      {message && <div role="status" className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">{message}</div>}
      {error && <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div>
              <h3 className="text-xl font-semibold">Professional details</h3>
              <p className="mt-1 text-sm text-muted-foreground">Help us personalize events, introductions, and opportunities.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job title</Label>
                <Input id="jobTitle" value={profile.jobTitle} onChange={(event) => setProfile({ ...profile, jobTitle: event.target.value })} placeholder="Senior SDET" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" value={profile.company} onChange={(event) => setProfile({ ...profile, company: event.target.value })} placeholder="Your organization" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="careerStage">Career stage</Label>
                <select
                  id="careerStage"
                  value={profile.careerStage}
                  onChange={(event) => setProfile({ ...profile, careerStage: event.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select one</option>
                  <option>Early-career QA Professional</option>
                  <option>QA / Test Engineer</option>
                  <option>Senior / Staff SDET</option>
                  <option>QA Manager</option>
                  <option>Engineering / Quality Leader</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={profile.location} onChange={(event) => setProfile({ ...profile, location: event.target.value })} placeholder="Seattle, WA or Remote" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="linkedInUrl">LinkedIn profile</Label>
                <Input id="linkedInUrl" type="url" value={profile.linkedInUrl} onChange={(event) => setProfile({ ...profile, linkedInUrl: event.target.value })} placeholder="https://www.linkedin.com/in/your-name" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="bio">Short bio</Label>
                <textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(event) => setProfile({ ...profile, bio: event.target.value.slice(0, 500) })}
                  placeholder="What are you working on, learning, or hoping to contribute?"
                  rows={5}
                  className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <p className="text-right text-xs text-muted-foreground">{profile.bio.length}/500</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Your interests</h3>
              <p className="mt-1 text-sm text-muted-foreground">Choose as many as you like.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {interestOptions.map((interest) => {
                  const selected = profile.interests.includes(interest)
                  return (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      aria-pressed={selected}
                      className={`rounded-full border px-3 py-2 text-sm transition-colors ${selected ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary/50"}`}
                    >
                      {selected && <Check className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />}
                      {interest}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-5 p-6">
              <h3 className="text-lg font-semibold">Privacy & communication</h3>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={profile.profileVisible}
                  onChange={(event) => setProfile({ ...profile, profileVisible: event.target.checked })}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>
                  <span className="block text-sm font-medium">Visible to other members</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">Off by default during beta. Your email is never shown.</span>
                </span>
              </label>
              <div className="rounded-xl border bg-muted/35 p-4">
                <p className="text-sm font-medium">Want community and event emails?</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Membership and newsletter subscriptions are managed separately.
                </p>
                <Link href="/#newsletter" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                  Subscribe for updates
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <Link href="/community" className="text-sm font-medium text-muted-foreground hover:text-primary">Back to community</Link>
        <Button type="submit" size="lg" className="w-full gap-2 sm:w-auto" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
          {saving ? "Saving…" : "Save profile"}
        </Button>
      </div>
    </form>
  )
}

function SignedOutProfilePrompt() {
  return (
    <Card className="mx-auto max-w-lg text-center shadow-lg">
      <CardContent className="p-8">
        <UserRoundPlus className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold">Join to create your profile</h2>
        <p className="mt-3 text-muted-foreground">Membership is free. Sign up with Google or email, then personalize your community profile.</p>
        <SignUpButton mode="modal" forceRedirectUrl="/member/profile">
          <Button size="lg" className="mt-6 w-full">Join free</Button>
        </SignUpButton>
        <SignInButton mode="modal">
          <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            <LogIn className="h-4 w-4" aria-hidden="true" /> Already a member? Sign in
          </button>
        </SignInButton>
      </CardContent>
    </Card>
  )
}

export function MemberProfileForm() {
  if (!clerkEnabled) {
    return (
      <Card className="mx-auto max-w-xl text-center">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold">Clerk connection required</h2>
          <p className="mt-3 text-muted-foreground">
            Add the existing Clerk publishable key to this main-site build to activate member accounts and profile editing.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Show when="signed-out"><SignedOutProfilePrompt /></Show>
      <Show when="signed-in"><ProfileEditor /></Show>
    </>
  )
}
