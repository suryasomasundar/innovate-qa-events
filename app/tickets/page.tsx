import { TicketSales } from "@/components/ticket-sales"
import { generateSEO } from "@/components/seo"
import event from "@/data/events/2027.json"

export const metadata = generateSEO({
  title: `${event.name} Tickets`,
  description: `Explore conference tickets, standalone Workshop Day Passes, workshop add-ons, and team pricing for ${event.name} at ${event.venue.name}.`,
  canonical: "/tickets",
})

export default function TicketsPage() {
  return <TicketSales />
}
