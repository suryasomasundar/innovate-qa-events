import { TicketSales } from "@/components/ticket-sales"
import { generateSEO } from "@/components/seo"
import event from "@/data/events/2027.json"

export const metadata = generateSEO({
  title: `${event.name} Tickets`,
  description: `Explore conference tickets, Workshop Day Passes, team pricing, and the post-event Virtual Pass for ${event.name} at ${event.venue.name}.`,
  canonical: "/tickets",
})

export default function TicketsPage() {
  return <TicketSales />
}
