"use client";

import { useState } from "react";
import { Plus, FileText, Clock, Users, Trophy, XCircle } from "lucide-react";
import { AddApplicationModal } from "./_components/add-application-modal";
import { ApplicationsTable } from "./_components/applications-table";
import {
    ApplicationFunnel,
    InsightsPanel,
    SuccessRate,
    ApplicationTrends,
    TopSources,
} from "./_components/charts";

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({
    label, value, sub, icon, iconBg,
}: {
    label: string; value: string | number; sub: string;
    icon: React.ReactNode; iconBg: string;
}) {
    return (
        <div className="bg-background rounded-xl border p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
            <div className={`p-2.5 rounded-xl shrink-0 ${iconBg}`}>{icon}</div>
            <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide leading-tight">{label}</p>
                <p className="text-2xl font-bold leading-tight">{value}</p>
                <p className="text-[11px] text-muted-foreground">{sub}</p>
            </div>
        </div>
    );
}

// ─── Sidebar Section Wrapper ─────────────────────────────────────────────────
function SideSection({ children }: { children: React.ReactNode }) {
    return <div className="bg-background rounded-xl border p-4">{children}</div>;
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function JobTrackerPage() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="min-h-screen  bg-muted/30 p-4 md:p-6 lg:p-2">
            <AddApplicationModal open={modalOpen} onClose={() => setModalOpen(false)} />
            <div className=" mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Job Application Tracker</h1>
                        <p className="text-sm text-muted-foreground mt-0.5">Track, manage, and analyze your job applications in one place.</p>
                    </div>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-colors w-fit"
                    >
                        <Plus className="h-4 w-4" /> Add Application
                    </button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    <StatCard label="Total Applications" value={24} sub="All time" icon={<FileText className="h-5 w-5 text-indigo-500" />} iconBg="bg-indigo-50" />
                    <StatCard label="Under Review" value={6} sub="25% of total" icon={<Clock className="h-5 w-5 text-amber-500" />} iconBg="bg-amber-50" />
                    <StatCard label="Interviews" value={5} sub="21% of total" icon={<Users className="h-5 w-5 text-blue-500" />} iconBg="bg-blue-50" />
                    <StatCard label="Offers" value={2} sub="8% of total" icon={<Trophy className="h-5 w-5 text-green-500" />} iconBg="bg-green-50" />
                    <StatCard label="Rejections" value={11} sub="46% of total" icon={<XCircle className="h-5 w-5 text-red-500" />} iconBg="bg-red-50" />
                </div>

                {/* Main 3-column grid: table + right sidebar */}
                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-4">

                    {/* Left: Table */}
                    <div className="min-w-0 w-full overflow-hidden">
                        <ApplicationsTable />
                    </div>

                    {/* Right Sidebar */}
                    <div className="flex flex-col gap-4">
                        <SideSection>
                            <ApplicationFunnel />
                        </SideSection>
                        <SideSection>
                            <InsightsPanel />
                        </SideSection>
                        <SideSection>
                            <SuccessRate />
                        </SideSection>
                    </div>
                </div>

                {/* Bottom Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-background rounded-xl border p-4">
                        <ApplicationTrends />
                    </div>
                    <div className="bg-background rounded-xl border p-4">
                        <TopSources />
                    </div>
                </div>

            </div>
        </div>
    );
}