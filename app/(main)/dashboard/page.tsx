import { getIndustryInsights } from "@/lib/api/dashboard";
import { getUserOnboardingStatus } from "@/lib/api/user";
import { redirect } from "next/navigation";
import SummaryCard from "./_components/summary-card";
import { ActivityChart } from "./_components/activity-chart";
import { ProgressChart } from "./_components/progress-chart";
import { RecentActivities } from "./_components/recent-activities";
import { UpcomingEvents } from "./_components/upcoming-events";
import { Recommendations } from "./_components/recommendations";
import { QuoteCard } from "./_components/quote-card";
import { CalendarCard } from "./_components/calendar-card";

export default async function DashboardPage() {
  const { isOnboarded } = await getUserOnboardingStatus();

  // If not onboarded, redirect to onboarding page
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const insights = await getIndustryInsights();

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 bg-[#f8f9fa] min-h-screen rounded-3xl mb-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, Vikash 👋</h1>
        <p className="text-muted-foreground text-base">Let's achieve your career goals today.</p>
      </div>

      <SummaryCard />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-8 space-y-6">
          <ActivityChart />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProgressChart />
            <Recommendations />
          </div>

          <RecentActivities />
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-4 space-y-6">
          <CalendarCard />
          <UpcomingEvents />
          <QuoteCard />
        </div>
      </div>
    </div>
  );
}
