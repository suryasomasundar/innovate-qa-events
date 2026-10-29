import Link from "next/link"
import Image from "next/image"
import { Sparkles, Heart, Instagram, Linkedin, Youtube } from "lucide-react"
import siteConfig from "@/data/site-config.json"
import { BASE_PATH, RECORDINGS_URL } from "@/lib/constants"

// Custom X/Twitter icon since lucide doesn't have the new X logo
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// Custom TikTok icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

const footerLinks = {
  event: [
    { label: "Innovate QA 2027", href: "/events/2027" },
    { label: "Workshop Day", href: "/events/workshop-day" },
    { label: "2026 Recordings", href: RECORDINGS_URL },
    { label: "Speakers", href: "/events/2027#speakers" },
    { label: "2027 Schedule", href: "/events/2027#schedule" },
  ],
  community: [
    { label: "Membership", href: "/community" },
    { label: "Podcast", href: "/podcast" },
    { label: "Become a Speaker", href: "/volunteer" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Awards", href: "/awards" },
    { label: "Meetups", href: "/meetups" },
  ],
  pastEvents: [
    { label: "Innovate QA 2026", href: "/events/2026" },
    { label: "Innovate QA 2025", href: "/events/2025" },
    { label: "Innovate QA 2024", href: "/events/2024" },
    { label: "Battle of AI Test Tools", href: "/battle-of-ai-test-tools" },
  ],
  company: [
    { label: "Sponsor Innovate QA 2027", href: "/sponsor" },
    { label: "Annual Partnerships", href: "/sponsor/annual-partnerships" },
    { label: "Custom Marketing Opportunities", href: "/sponsor/custom-marketing" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Diversity & Inclusion", href: "/diversity-inclusion" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src={`${BASE_PATH}/logo.svg`} alt="Innovate QA" width={36} height={36} className="h-9 w-9 rounded-lg object-contain" />
              <span className="text-xl font-bold text-foreground">Innovate QA</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The premier conference for Quality Professionals and Engineering Leaders. Practical, engineering-focused content where quality leaders connect, learn, and grow together.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {siteConfig.socials.instagram.url && (
                <Link 
                  href={siteConfig.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              )}
              {siteConfig.socials.linkedin.url && (
                <Link 
                  href={siteConfig.socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
              {siteConfig.socials.tiktok.url && (
                <Link 
                  href={siteConfig.socials.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <TikTokIcon className="h-5 w-5" />
                </Link>
              )}
              {siteConfig.socials.x.url && (
                <Link 
                  href={siteConfig.socials.x.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <XIcon className="h-5 w-5" />
                </Link>
              )}
              {siteConfig.socials.youtube.url && (
                <Link 
                  href={siteConfig.socials.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Event</h3>
            <ul className="space-y-2">
              {footerLinks.event.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Past Events</h3>
            <ul className="space-y-2">
              {footerLinks.pastEvents.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">© 2024-2026 Innovate QA Events. All Rights Reserved.</p>
          <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1">
            Created with <Heart className="h-4 w-4 text-primary fill-primary" /> by Innovate QA Team
          </p>
        </div>
      </div>
    </footer>
  )
}
