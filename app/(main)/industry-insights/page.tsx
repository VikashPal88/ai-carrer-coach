import { getIndustryInsights } from "@/lib/api/dashboard";
import DashboardView from "../industry-insights/_component/dashboard-view";
import { getUserOnboardingStatus } from "@/lib/api/user";
import { redirect } from "next/navigation";

export default async function IndustryInsightPage() {
    const { isOnboarded } = await getUserOnboardingStatus();

    // If not onboarded, redirect to onboarding page
    if (!isOnboarded) {
        redirect("/onboarding");
    }

    const insights = await getIndustryInsights();

    return (
        <div className="container mx-auto">
            <DashboardView insights={insights} />
        </div>
    );
}