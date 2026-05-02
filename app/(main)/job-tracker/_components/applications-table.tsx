"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Download, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { JOBS, JobApp, AppStatus } from "./mock-data";

const STATUS_STYLES: Record<AppStatus, string> = {
  "Applied": "bg-blue-50 text-blue-600 border-blue-200",
  "Under Review": "bg-amber-50 text-amber-600 border-amber-200",
  "Interview": "bg-blue-50 text-blue-600 border-blue-200",
  "Offer": "bg-green-50 text-green-600 border-green-200",
  "Rejected": "bg-red-50 text-red-600 border-red-200",
};

const LOGO_COLORS: Record<string, string> = {
  G: "bg-white border border-gray-200",
  M: "bg-white border border-gray-200",
  A: "bg-white border border-gray-200",
  N: "bg-green-600",
  T: "bg-red-600",
  S: "bg-green-500",
  I: "bg-blue-700",
  Ad: "bg-red-600",
};

const PAGE_SIZE = 10;

function CompanyLogo({ company, logo }: { company: string; logo: string }) {
  const colorClass = LOGO_COLORS[logo] || "bg-gray-100";
  return (
    <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${colorClass} text-gray-800`}>
      {logo}
    </div>
  );
}

export function ApplicationsTable() {
  const [tab, setTab] = useState<"All" | "Active" | "Archived">("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = JOBS.filter((j) =>
    j.company.toLowerCase().includes(query.toLowerCase()) ||
    j.position.toLowerCase().includes(query.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-background rounded-xl border flex flex-col min-w-0 overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b">
        {/* Tabs */}
        <div className="flex gap-1">
          {(["All", "Active", "Archived"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                tab === t
                  ? "text-foreground border-b-2 border-blue-600 rounded-none"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search + Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search by company, role..."
              className="w-full sm:w-56 pl-8 pr-3 py-1.5 text-xs border rounded-lg bg-muted/40 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border rounded-lg hover:bg-muted/50 transition-colors font-medium">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border rounded-lg hover:bg-muted/50 transition-colors font-medium">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Table — desktop */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              {["Company", "Position", "Location", "Applied On", "Last Update", "Status", "Next Step", "Salary", "Source", "Actions"].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paged.map((job) => (
              <TableRow key={job.id} job={job} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-border">
        {paged.map((job) => (
          <MobileCard key={job.id} job={job} />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t text-xs text-muted-foreground">
        <span>Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} applications</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1 rounded border disabled:opacity-40 hover:bg-muted/50"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-6 h-6 rounded text-xs font-medium ${p === page ? "bg-blue-600 text-white" : "border hover:bg-muted/50"}`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1 rounded border disabled:opacity-40 hover:bg-muted/50"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function TableRow({ job }: { job: JobApp }) {
  return (
    <tr className="hover:bg-muted/20 transition-colors group">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <CompanyLogo company={job.company} logo={job.logo} />
          <span className="font-medium text-sm">{job.company}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground">{job.position}</td>
      <td className="px-4 py-3 text-sm text-muted-foreground">{job.location}</td>
      <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{job.appliedOn}</td>
      <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{job.lastUpdate}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${STATUS_STYLES[job.status]}`}>
          {job.status}
        </span>
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground">
        {job.nextStep ? (
          <div>
            <div className="font-medium text-foreground">{job.nextStep}</div>
            {job.nextStepDate && <div className="text-[11px]">{job.nextStepDate}</div>}
          </div>
        ) : "–"}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{job.salary}</td>
      <td className="px-4 py-3 text-sm text-muted-foreground">{job.source}</td>
      <td className="px-4 py-3">
        <button className="p-1 rounded hover:bg-muted/60 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </button>
      </td>
    </tr>
  );
}

function MobileCard({ job }: { job: JobApp }) {
  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CompanyLogo company={job.company} logo={job.logo} />
          <div>
            <p className="font-semibold text-sm">{job.company}</p>
            <p className="text-xs text-muted-foreground">{job.position}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${STATUS_STYLES[job.status]}`}>
          {job.status}
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span>{job.location}</span>
        <span>Applied: {job.appliedOn}</span>
        <span>{job.salary}</span>
        <span>{job.source}</span>
      </div>
      {job.nextStep && (
        <p className="text-xs text-blue-600 font-medium">Next: {job.nextStep} {job.nextStepDate && `(${job.nextStepDate})`}</p>
      )}
    </div>
  );
}
