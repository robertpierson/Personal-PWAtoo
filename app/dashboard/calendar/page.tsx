import { CareTag } from "@/components/CareTag";
import { CalendarGrid } from "@/components/app/CalendarGrid";
import { getCalendar } from "@/lib/data";
import { isDemoMode } from "@/lib/demo";

export default async function CalendarPage() {
  const items = await getCalendar();
  const monthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="mx-auto max-w-5xl">
      <CareTag>Calendar</CareTag>
      <h1 className="subhead mt-2">{monthName}</h1>
      <div className="mt-8">
        <CalendarGrid initialItems={items} demo={isDemoMode} />
      </div>
    </div>
  );
}
