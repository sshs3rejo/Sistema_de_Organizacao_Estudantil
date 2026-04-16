import { EventsDashboard } from "@/components/events/events-dashboard"
import { getEvents } from "@/app/actions/events"

export default async function Home() {
  const events = await getEvents()

  return <EventsDashboard initialEvents={events} />
}
