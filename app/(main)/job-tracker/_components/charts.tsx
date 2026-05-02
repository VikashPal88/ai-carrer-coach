"use client";

import { FUNNEL_DATA, SUCCESS_RATES, SOURCE_DATA, TREND_DATA } from "./mock-data";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { TrendingUp, Lightbulb, AlertCircle } from "lucide-react";

// ─── Application Funnel ──────────────────────────────────────────────────────

export function ApplicationFunnel() {
  const max = FUNNEL_DATA[0].value;
  return (
    <div>
      <h3 className="font-semibold text-sm mb-3">Application Funnel</h3>
      <div className="space-y-1.5">
        {FUNNEL_DATA.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="h-7 rounded flex items-center justify-end pr-2 text-white text-xs font-bold transition-all"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: item.color,
                minWidth: 40,
              }}
            >
              {item.value}
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{item.name}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3">Conversion rate: <span className="font-semibold text-foreground">8%</span></p>
    </div>
  );
}

// ─── Insights Panel ──────────────────────────────────────────────────────────

const insights = [
  { icon: <TrendingUp className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />, text: "Your response rate is 38%, above the industry average." },
  { icon: <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />, text: "You have 2 applications pending follow-up." },
  { icon: <Lightbulb className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />, text: "Consider applying to more Product Engineer roles." },
];

export function InsightsPanel() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h3 className="font-semibold text-sm">Insights</h3>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-600">BETA</span>
      </div>
      <div className="space-y-2.5">
        {insights.map((i, idx) => (
          <div key={idx} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
            {i.icon}
            <span>{i.text}</span>
          </div>
        ))}
      </div>
      <button className="mt-3 text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
        View full insights →
      </button>
    </div>
  );
}

// ─── Success Rate by Stage ────────────────────────────────────────────────────

export function SuccessRate() {
  return (
    <div>
      <h3 className="font-semibold text-sm mb-3">Success Rate by Stage</h3>
      <div className="space-y-2.5">
        {SUCCESS_RATES.map((s) => (
          <div key={s.stage}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">{s.stage}</span>
              <span className="font-semibold">{s.rate}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${s.rate}%`, backgroundColor: s.color }} />
            </div>
          </div>
        ))}
      </div>
      <button className="mt-3 text-xs font-semibold text-blue-600 hover:underline">
        View detailed analytics →
      </button>
    </div>
  );
}

// ─── Application Trends ───────────────────────────────────────────────────────

export function ApplicationTrends() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">Application Trends</h3>
        <select className="text-xs border rounded px-2 py-1 bg-background text-foreground outline-none">
          <option>Last 6 months</option>
          <option>Last 3 months</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={TREND_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          <Line type="monotone" dataKey="apps" stroke="#6366f1" strokeWidth={2} dot={{ r: 3, fill: "#6366f1" }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Top Sources Donut ────────────────────────────────────────────────────────

export function TopSources() {
  return (
    <div>
      <h3 className="font-semibold text-sm mb-4">Top Sources</h3>
      <div className="flex items-center gap-4">
        <PieChart width={110} height={110}>
          <Pie data={SOURCE_DATA} cx={50} cy={50} innerRadius={30} outerRadius={50} paddingAngle={2} dataKey="value">
            {SOURCE_DATA.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <div className="space-y-1.5">
          {SOURCE_DATA.map((s) => (
            <div key={s.name} className="flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
              <span className="text-muted-foreground">{s.name}</span>
              <span className="font-semibold ml-auto">{s.value}% ({s.count})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
