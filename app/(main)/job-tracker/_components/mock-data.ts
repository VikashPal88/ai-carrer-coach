export type AppStatus = "Applied" | "Under Review" | "Interview" | "Offer" | "Rejected";

export interface JobApp {
  id: string;
  company: string;
  logo: string; // first letter fallback
  position: string;
  location: string;
  appliedOn: string;
  lastUpdate: string;
  status: AppStatus;
  nextStep?: string;
  nextStepDate?: string;
  salary: string;
  source: string;
}

export const JOBS: JobApp[] = [
  { id: "1", company: "Google", logo: "G", position: "Software Engineer", location: "Bangalore, IN", appliedOn: "May 20, 2024", lastUpdate: "May 25, 2024", status: "Interview", nextStep: "Technical Round", nextStepDate: "May 30, 2024", salary: "₹25–30 LPA", source: "LinkedIn" },
  { id: "2", company: "Microsoft", logo: "M", position: "Software Engineer", location: "Bangalore, IN", appliedOn: "May 18, 2024", lastUpdate: "May 18, 2024", status: "Under Review", salary: "₹20–28 LPA", source: "Referrals" },
  { id: "3", company: "Amazon", logo: "A", position: "SDE II", location: "Hyderabad, IN", appliedOn: "May 15, 2024", lastUpdate: "Jun 5, 2024", status: "Interview", nextStep: "Onsite Interview", nextStepDate: "Jun 9, 2024", salary: "₹28–35 LPA", source: "Careers Page" },
  { id: "4", company: "Apple", logo: "A", position: "iOS Developer", location: "Bangalore, IN", appliedOn: "May 10, 2024", lastUpdate: "May 12, 2024", status: "Rejected", salary: "₹30–40 LPA", source: "LinkedIn" },
  { id: "5", company: "Adobe", logo: "Ad", position: "Product Engineer", location: "Noida, IN", appliedOn: "May 8, 2024", lastUpdate: "May 9, 2024", status: "Under Review", salary: "₹18–25 LPA", source: "LinkedIn" },
  { id: "6", company: "Nvidia", logo: "N", position: "Software Engineer", location: "Pune, IN", appliedOn: "May 5, 2024", lastUpdate: "May 28, 2024", status: "Interview", nextStep: "Coding Round", nextStepDate: "May 28, 2024", salary: "₹24–32 LPA", source: "Referrals" },
  { id: "7", company: "Tesla", logo: "T", position: "Data Engineer", location: "Pune, IN", appliedOn: "May 2, 2024", lastUpdate: "May 30, 2024", status: "Offer", nextStep: "Respond by", nextStepDate: "Jun 2, 2024", salary: "₹30–40 LPA", source: "Careers Page" },
  { id: "8", company: "Netflix", logo: "N", position: "Software Engineer", location: "Bangalore, IN", appliedOn: "Apr 28, 2024", lastUpdate: "May 2, 2024", status: "Rejected", salary: "₹30–35 LPA", source: "LinkedIn" },
  { id: "9", company: "Spotify", logo: "S", position: "Software Engineer", location: "Bangalore, IN", appliedOn: "Apr 25, 2024", lastUpdate: "Apr 26, 2024", status: "Under Review", salary: "₹22–28 LPA", source: "LinkedIn" },
  { id: "10", company: "IBM", logo: "I", position: "DevOps Engineer", location: "Pune, IN", appliedOn: "Apr 20, 2024", lastUpdate: "Apr 22, 2024", status: "Rejected", salary: "₹15–22 LPA", source: "Careers Page" },
];

export const FUNNEL_DATA = [
  { name: "Applied", value: 24, color: "#6366f1" },
  { name: "Under Review", value: 6, color: "#3b82f6" },
  { name: "Interview", value: 5, color: "#22c55e" },
  { name: "Offer", value: 2, color: "#f59e0b" },
  { name: "Rejected", value: 11, color: "#ef4444" },
];

export const TREND_DATA = [
  { month: "Jan 2024", apps: 3 },
  { month: "Feb 2024", apps: 5 },
  { month: "Mar 2024", apps: 8 },
  { month: "Apr 2024", apps: 11 },
  { month: "May 2024", apps: 9 },
  { month: "Jun 2024", apps: 6 },
];

export const SOURCE_DATA = [
  { name: "LinkedIn", value: 45, count: 11, color: "#6366f1" },
  { name: "Careers Page", value: 25, count: 6, color: "#22c55e" },
  { name: "Referrals", value: 20, count: 5, color: "#3b82f6" },
  { name: "Others", value: 10, count: 2, color: "#f59e0b" },
];

export const SUCCESS_RATES = [
  { stage: "Application", rate: 100, color: "#6366f1" },
  { stage: "Interview", rate: 42, color: "#3b82f6" },
  { stage: "Offer", rate: 40, color: "#22c55e" },
  { stage: "Overall", rate: 8, color: "#f59e0b" },
];
