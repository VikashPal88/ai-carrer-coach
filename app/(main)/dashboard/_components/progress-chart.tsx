"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { CheckCircle2, Circle } from "lucide-react";

const data = [
  { name: "Completed", value: 75 },
  { name: "Remaining", value: 25 },
];

const COLORS = ["#6366f1", "#e0e7ff"]; // Indigo

const checklist = [
  { text: "Resume Updated", completed: true },
  { text: "DSA Practice", completed: false },
  { text: "Interview Practice", completed: true },
  { text: "Applications", completed: true },
];

export const ProgressChart = () => {
  return (
    <Card className="border-none shadow-sm rounded-3xl h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6 pt-4">
        <div className="relative w-36 h-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-2xl font-bold text-slate-800">75%</span>
          </div>
        </div>

        <div className="w-full space-y-3">
          {checklist.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              {item.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
              ) : (
                <Circle className="w-5 h-5 text-blue-500 fill-blue-100" />
              )}
              <span className={`text-sm font-medium ${item.completed ? 'text-slate-700' : 'text-slate-700'}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
