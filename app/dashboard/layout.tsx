import { Sidebar } from "@/components/app/Sidebar";
import { Topbar } from "@/components/app/Topbar";
import { MatteSection } from "@/components/glass/MatteSection";
import { getWorkspace } from "@/lib/data";
import { isDemoMode } from "@/lib/demo";

export const metadata = {
  title: "Bandana — Command center",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { org, profile } = await getWorkspace();

  return (
    <MatteSection as="div" className="min-h-dvh">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 lg:flex-row">
        <Sidebar org={org} profile={profile} demo={isDemoMode} />
        <main className="min-w-0 flex-1 pb-16 lg:pt-4">
          <Topbar credits={org.credits} />
          {children}
        </main>
      </div>
    </MatteSection>
  );
}
