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
    <MatteSection as="div" className="relative min-h-dvh">
      <div className="app-field" aria-hidden />
      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col gap-5 px-4 py-4 lg:flex-row lg:gap-6">
        <Sidebar org={org} profile={profile} demo={isDemoMode} />
        <main className="min-w-0 flex-1 pb-16 lg:pt-2">
          <Topbar credits={org.credits} />
          {children}
        </main>
      </div>
    </MatteSection>
  );
}
