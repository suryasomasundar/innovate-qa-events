"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const packageNames = ["Annual Marketing", "Annual + Conference"] as const

export function PartnershipPackages({
  packages,
  partnershipCallUrl,
  year,
}: {
  packages: string[][]
  partnershipCallUrl: string
  year: number
}) {
  const [selectedPackage, setSelectedPackage] = useState<0 | 1>(0)
  const selectedName = packageNames[selectedPackage]
  const proposalUrl = new URL(partnershipCallUrl)
  if (proposalUrl.protocol === "mailto:") {
    proposalUrl.searchParams.set("subject", `${selectedName} partnership proposal`)
    proposalUrl.searchParams.set("body", `Selected package: ${selectedName}\n\n${proposalUrl.searchParams.get("body") ?? ""}`)
  }

  return (
    <>
      <p id="package-selection-help" className="mb-4 text-sm text-muted-foreground">
        Select a package to highlight its benefits and tailor your proposal request.
      </p>
      <table className="w-full table-fixed border-collapse text-left text-sm md:text-base">
        <caption className="sr-only">Annual partnership package comparison</caption>
        <thead>
          <tr className="border-b-2 border-border">
            <th scope="col" className="w-[34%] px-2 py-4 font-semibold sm:px-4">Partnership includes</th>
            {packageNames.map((name, index) => (
              <th
                key={name}
                scope="col"
                className={cn("px-2 py-4 transition-colors sm:px-4", selectedPackage === index && "bg-primary/10")}
              >
                <Button
                  type="button"
                  variant={selectedPackage === index ? "default" : "outline"}
                  aria-pressed={selectedPackage === index}
                  aria-describedby="package-selection-help"
                  onClick={() => setSelectedPackage(index === 0 ? 0 : 1)}
                  className="h-auto min-h-11 w-full whitespace-normal"
                >
                  {selectedPackage === index && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
                  {name}
                </Button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {packages.map(([feature, annual, conference]) => (
            <tr key={feature} className="border-b border-border hover:bg-primary/5">
              <th scope="row" className="break-words px-2 py-4 font-medium sm:px-4">{feature}</th>
              {[annual, conference].map((value, index) => (
                <td
                  key={packageNames[index]}
                  className={cn(
                    "break-words px-2 py-4 text-muted-foreground transition-colors sm:px-4",
                    selectedPackage === index && "bg-primary/10 font-medium text-foreground",
                  )}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p role="status" className="mt-4 text-sm font-medium text-primary">
        Selected package: {selectedName}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button asChild className="h-auto min-h-11 whitespace-normal">
          <a href={proposalUrl.toString()}>
            Request {selectedName} Proposal
            <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
          </a>
        </Button>
        <Button asChild variant="outline" className="h-auto min-h-11 whitespace-normal">
          <Link href="/sponsor">
            Explore {year} conference sponsorship
            <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </>
  )
}
