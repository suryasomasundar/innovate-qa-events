import { TicketOrder } from "@/components/ticket-sales"
import { generateSEO } from "@/components/seo"
import event from "@/data/events/2027.json"

export const metadata = generateSEO({
  title: `Plan Your ${event.name} Order`,
  description: "Choose your conference tickets and optional workshop day. Payments coming soon.",
  canonical: "/tickets/order",
  noIndex: true,
})

export default function TicketOrderPage() {
  return <TicketOrder />
}
