import Link from "next/link"
import Image from "next/image"
import { BASE_PATH } from "@/lib/constants"
import { Menu, ChevronDown, PlayCircle, Mail, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { buildSignInRedirect, getAuthSession } from "@/lib/authguard"

const navLinks = [
  { href: "/about", label: "About" },

  { href: "/sponsor", label: "Become a Sponsor" },
]

const pastEvents = [
  { href: "/events/2025", label: "Innovate QA 2025", year: 2025 },
  { href: "/events/2024", label: "Innovate QA 2024", year: 2024 },
  { href: "/battle-of-ai-test-tools", label: "Battle of AI Test Tools", year: 2026 },
]

const communityLinks = [
  { href: "/community", label: "Quality Leadership Community" },
  { href: "/recordings", label: "Member Recordings" },
  { href: "/volunteer", label: "Volunteer / Speak" },
  { href: "/awards", label: "Awards" },
  { href: "/authors", label: "Community Authors" },
]


function getInitials(nameOrEmail?: string) {
  if (!nameOrEmail) {
    return "M"
  }

  const parts = nameOrEmail.trim().split(/\s+/).filter(Boolean)

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }

  return nameOrEmail.slice(0, 2).toUpperCase()
}

export async function Navigation() {
  const session = await getAuthSession()
  const memberName = session?.user?.name || "Member"
  const memberEmail = session?.user?.email
  const initials = getInitials(memberName || memberEmail)
  const signInHref = buildSignInRedirect("/")

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
                <DropdownMenuItem key={event.year} asChild>
                  <Link href={event.href} className="w-full cursor-pointer">
                    {event.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

        
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-primary/10 text-sm font-semibold text-foreground transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <span className="sr-only">Open member menu</span>
                {initials}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">{memberName}</p>
                  {memberEmail ? <p className="text-xs font-normal text-muted-foreground">{memberEmail}</p> : null}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/recordings" className="w-full cursor-pointer">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Member recordings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact" className="w-full cursor-pointer">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/api/auth/logout?next=/" className="w-full cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="outline">
                <Link href={signInHref}>Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        <Sheet>
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
                    key={event.year}
                    href={event.href}
                    className="block text-base font-medium text-foreground hover:text-primary active:text-primary/80 transition-colors py-2 px-2 -mx-2 rounded-md hover:bg-accent/50 active:bg-accent"
                  >
                    {event.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-2 mt-6 border-t border-border pt-4">
                {session ? (
                  <>
                    <div className="flex items-center gap-3 rounded-lg border border-border/60 px-3 py-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-foreground">
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{memberName}</p>
                        {memberEmail ? <p className="text-xs text-muted-foreground">{memberEmail}</p> : null}
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/recordings">Member recordings</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/contact">Contact support</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <a href="/api/auth/logout?next=/">Logout</a>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={signInHref}>Sign in</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/signup">Sign up</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
