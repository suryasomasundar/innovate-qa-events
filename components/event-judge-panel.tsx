import Image from "next/image"
import { Linkedin } from "lucide-react"
import { BASE_PATH } from "@/lib/constants"

type EventJudge = {
  id: string
  name: string
  title?: string
  company?: string
  image?: string
  linkedin?: string
}

function imageSrc(judge: EventJudge) {
  return judge.image ? `${BASE_PATH}${judge.image}` : "/placeholder.svg"
}

export function EventJudgePanel({ judges, year = 2026 }: { judges: EventJudge[]; year?: number }) {
  if (judges.length === 0) return null

  return (
    <section id="judges" className="bg-[#f8f5fb] py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-normal text-muted-foreground">Awards Judges</p>
            <h2 className="text-5xl font-semibold leading-none tracking-normal text-primary md:text-6xl lg:text-7xl">
              Judges
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg lg:justify-self-end">
            Meet the panel shaping the Innovate QA {year} Awards through excellence, innovation, and impact across the software quality community.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {judges.map((judge) => (
            <article
              key={judge.id}
              className="overflow-hidden rounded-lg border border-border/70 bg-white shadow-[0_16px_34px_rgba(45,24,64,0.08)] transition-colors hover:border-primary/30"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={imageSrc(judge)}
                  alt={judge.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="relative min-h-[152px] px-5 py-5 pr-16">
                <h3 className="text-base font-bold leading-tight text-foreground">{judge.name}</h3>
                {judge.title && (
                  <p className="mt-2 text-sm font-semibold leading-snug text-primary">{judge.title}</p>
                )}
                {judge.company && <p className="mt-1 text-sm text-muted-foreground">{judge.company}</p>}

                {judge.linkedin && (
                  <a
                    href={judge.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
                    aria-label={`${judge.name} on LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
