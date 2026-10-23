"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BASE_PATH, RECORDINGS_URL } from "@/lib/constants"
import { Menu, ChevronDown, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRecordingsLaunch } from "@/components/use-recordings-launch"
import { MemberAuthControls } from "@/components/member-auth-controls"

const navLinks = [
  { href: "/tickets", label: "2027 Tickets" },
  { href: "/about", label: "About" },
  { href: "/sponsor", label: "Become a Sponsor" },
]

const pastEvents = [
  { href: "/events/2026", label: "Innovate QA 2026", year: 2026 },
  { href: "/events/2025", label: "Innovate QA 2025", year: 2025 },
  { href: "/events/2024", label: "Innovate QA 2024", year: 2024 },
  { href: "/battle-of-ai-test-tools", label: "Battle of AI Test Tools", year: 2026 },
]

const communityLinks = [
  { href: "/community", label: "Free Membership (Beta)" },
  { href: "/volunteer", label: "Volunteer / Speak" },
  { href: "/awards", label: "Awards" },
  { href: "/authors", label: "Community Authors" },
]


export function Navigation() {
  const [open, setOpen] = useState(false)
  const isRecordingsLaunched = useRecordingsLaunch()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={`${BASE_PATH}/logo.svg`}
            alt="Innovate QA Logo" 
            width={48} 
            height={48}
            className="h-12 w-12"
          />
          <span className="text-xl font-bold text-foreground">Innovate QA</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Community
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {communityLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href} className="w-full cursor-pointer">
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Past Events
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {pastEvents.map((event) => (
                <DropdownMenuItem key={event.href} asChild>
                  <Link href={event.href} className="w-full cursor-pointer">
                    {event.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

        
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="outline">
            <a href="/contact">Contact Us</a>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <a href="/#newsletter">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Subscribe
            </a>
          </Button>
          <MemberAuthControls />
          {isRecordingsLaunched ? (
            <Button asChild className="gap-2 shadow-md">
              <a href={RECORDINGS_URL}>
                <Sparkles className="h-4 w-4 motion-safe:animate-pulse" />
                Watch Recordings
                <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider motion-safe:animate-pulse">
                  New
                </span>
              </a>
            </Button>
          ) : (
            <Button className="gap-2 shadow-md" disabled>
              Launches Aug 10
            </Button>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex items-center gap-2 px-2 pt-2">
              <Image
                src={`${BASE_PATH}/logo.svg`}
                alt="Innovate QA Logo"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="text-lg font-bold text-foreground">Innovate QA</span>
            </div>
            <nav className="flex flex-col gap-4 mt-8 px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-primary active:text-primary/80 transition-colors px-2 py-1 -mx-2 rounded-md hover:bg-accent/50 active:bg-accent"
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-border pt-4 mt-2">
                <p className="text-sm font-semibold text-muted-foreground mb-3 px-2 uppercase tracking-wider">Community</p>
                {communityLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-base font-medium text-foreground hover:text-primary active:text-primary/80 transition-colors py-2 px-2 -mx-2 rounded-md hover:bg-accent/50 active:bg-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-border pt-4 mt-2">
                <p className="text-sm font-semibold text-muted-foreground mb-3 px-2 uppercase tracking-wider">Past Events</p>
                {pastEvents.map((event) => (
                  <Link
                    key={event.href}
                    href={event.href}
                    onClick={() => setOpen(false)}
                    className="block text-base font-medium text-foreground hover:text-primary active:text-primary/80 transition-colors py-2 px-2 -mx-2 rounded-md hover:bg-accent/50 active:bg-accent"
                  >
                    {event.label}
                  </Link>
                ))}
              </div>



              <div className="flex flex-col gap-2 mt-6 border-t border-border pt-4">
                {isRecordingsLaunched ? (
                  <Button asChild className="w-full gap-2">
                    <a href={RECORDINGS_URL} onClick={() => setOpen(false)}>
                      <Sparkles className="h-4 w-4 motion-safe:animate-pulse" />
                      Watch Recordings
                      <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider motion-safe:animate-pulse">
                        New
                      </span>
                    </a>
                  </Button>
                ) : (
                  <Button className="w-full" disabled>
                    Launches Aug 10
                  </Button>
                )}
                <MemberAuthControls mobile />
                <Button asChild variant="outline" className="w-full gap-2">
                  <a href="/#newsletter" onClick={() => setOpen(false)}>
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Subscribe
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href="/contact" onClick={() => setOpen(false)}>Contact Us</a>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
