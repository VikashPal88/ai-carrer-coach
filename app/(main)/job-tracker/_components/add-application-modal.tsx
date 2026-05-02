"use client";

import { useState } from "react";
import { X, Briefcase, MapPin, Link, DollarSign, Calendar, ChevronDown, Loader2 } from "lucide-react";
import { AppStatus } from "./mock-data";

interface FormData {
  company: string;
  position: string;
  location: string;
  jobType: string;
  status: AppStatus;
  appliedOn: string;
  salary: string;
  source: string;
  jobUrl: string;
  nextStep: string;
  notes: string;
}

const INITIAL: FormData = {
  company: "", position: "", location: "", jobType: "Remote",
  status: "Applied", appliedOn: new Date().toISOString().split("T")[0],
  salary: "", source: "LinkedIn", jobUrl: "", nextStep: "", notes: "",
};

const STATUS_OPTIONS: AppStatus[] = ["Applied", "Under Review", "Interview", "Offer", "Rejected"];
const SOURCE_OPTIONS = ["LinkedIn", "Careers Page", "Referrals", "Job Board", "Company Website", "Others"];
const JOB_TYPES = ["Remote", "Hybrid", "On-site"];

const STATUS_DOT: Record<AppStatus, string> = {
  "Applied": "bg-blue-500",
  "Under Review": "bg-amber-500",
  "Interview": "bg-indigo-500",
  "Offer": "bg-green-500",
  "Rejected": "bg-red-500",
};

// ─── Shared Field Components ─────────────────────────────────────────────────

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold text-foreground mb-1.5">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function Input({
  icon, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode }) {
  return (
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>}
      <input
        {...props}
        className={`w-full border rounded-lg py-2 text-sm bg-background outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-muted-foreground/60 ${icon ? "pl-9 pr-3" : "px-3"} ${props.className ?? ""}`}
      />
    </div>
  );
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        {...props}
        className="w-full border rounded-lg px-3 py-2 text-sm bg-background outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all appearance-none cursor-pointer"
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
    </div>
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full border rounded-lg px-3 py-2 text-sm bg-background outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-muted-foreground/60 resize-none"
    />
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd?: (data: FormData) => void;
}

export function AddApplicationModal({ open, onClose, onAdd }: Props) {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  if (!open) return null;

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.company.trim()) errs.company = "Company name is required";
    if (!form.position.trim()) errs.position = "Position is required";
    if (!form.appliedOn) errs.appliedOn = "Applied date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    onAdd?.(form);
    setForm(INITIAL);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-background w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border pointer-events-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-background z-10">
            <div>
              <h2 className="text-base font-bold">Add New Application</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Track a new job application</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-muted/60 transition-colors text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">

            {/* Row 1: Company + Position */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label required>Company Name</Label>
                <Input
                  icon={<Briefcase className="h-3.5 w-3.5" />}
                  placeholder="e.g. Google"
                  value={form.company}
                  onChange={set("company")}
                />
                {errors.company && <p className="text-[11px] text-red-500 mt-1">{errors.company}</p>}
              </div>
              <div>
                <Label required>Position / Job Title</Label>
                <Input
                  placeholder="e.g. Software Engineer"
                  value={form.position}
                  onChange={set("position")}
                />
                {errors.position && <p className="text-[11px] text-red-500 mt-1">{errors.position}</p>}
              </div>
            </div>

            {/* Row 2: Location + Job Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Location</Label>
                <Input
                  icon={<MapPin className="h-3.5 w-3.5" />}
                  placeholder="e.g. Bangalore, IN"
                  value={form.location}
                  onChange={set("location")}
                />
              </div>
              <div>
                <Label>Job Type</Label>
                <Select value={form.jobType} onChange={set("jobType")}>
                  {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
                </Select>
              </div>
            </div>

            {/* Row 3: Status + Applied Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Application Status</Label>
                <div className="relative">
                  <span className={`absolute left-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full ${STATUS_DOT[form.status]}`} />
                  <select
                    value={form.status}
                    onChange={set("status")}
                    className="w-full border rounded-lg pl-8 pr-8 py-2 text-sm bg-background outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div>
                <Label required>Applied On</Label>
                <Input
                  type="date"
                  icon={<Calendar className="h-3.5 w-3.5" />}
                  value={form.appliedOn}
                  onChange={set("appliedOn")}
                />
                {errors.appliedOn && <p className="text-[11px] text-red-500 mt-1">{errors.appliedOn}</p>}
              </div>
            </div>

            {/* Row 4: Salary + Source */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Salary Range</Label>
                <Input
                  icon={<DollarSign className="h-3.5 w-3.5" />}
                  placeholder="e.g. ₹20–30 LPA"
                  value={form.salary}
                  onChange={set("salary")}
                />
              </div>
              <div>
                <Label>Source</Label>
                <Select value={form.source} onChange={set("source")}>
                  {SOURCE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                </Select>
              </div>
            </div>

            {/* Job URL */}
            <div>
              <Label>Job Posting URL</Label>
              <Input
                type="url"
                icon={<Link className="h-3.5 w-3.5" />}
                placeholder="https://careers.google.com/..."
                value={form.jobUrl}
                onChange={set("jobUrl")}
              />
            </div>

            {/* Next Step */}
            <div>
              <Label>Next Step</Label>
              <Input
                placeholder="e.g. Technical Round on May 30"
                value={form.nextStep}
                onChange={set("nextStep")}
              />
            </div>

            {/* Notes */}
            <div>
              <Label>Notes</Label>
              <Textarea
                rows={3}
                placeholder="Add any personal notes, recruiter contact, or reminders..."
                value={form.notes}
                onChange={set("notes")}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t gap-3">
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500">*</span> Required fields
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-60 flex items-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  {loading ? "Saving..." : "Add Application"}
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}
