import Image from "next/image"
import { Trophy } from "lucide-react"
import type { AwardNominee } from "@/lib/awards"

export function AwardsTrophy({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`awards-trophy ${className}`}>
      <div className="awards-trophy-ring" />
      <Trophy strokeWidth={1.2} />
      <span />
    </div>
  )
}

export function NomineePortrait({ nominee, large = false }: { nominee: AwardNominee; large?: boolean }) {
  return (
    <div className={`awards-portrait ${large ? "awards-portrait-large" : ""}`}>
      <Image src={nominee.photo} alt={`Illustrated demo portrait for ${nominee.name}`} fill sizes={large ? "(min-width: 768px) 380px, 80vw" : "(min-width: 768px) 280px, 80vw"} className="object-cover" />
      <span aria-hidden="true" className="awards-portrait-monogram">{nominee.name.split(" ").map((part) => part[0]).join("")}</span>
    </div>
  )
}
