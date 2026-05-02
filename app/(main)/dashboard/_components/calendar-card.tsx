"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from "date-fns";

export const CalendarCard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { weekStarts: 1 }); // Monday start
  const endDate = endOfWeek(monthEnd, { weekStarts: 1 });

  const dateFormat = "d";
  const days = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  const weekDays = ["m", "t", "w", "t", "f", "s", "s"];

  return (
    <Card className="border-none shadow-sm rounded-[2rem] pb-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
        <button onClick={handlePrevMonth} className="text-slate-400 hover:text-slate-700 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-semibold text-slate-800">
          {format(currentDate, "MMMM")}
        </h2>
        <button onClick={handleNextMonth} className="text-slate-400 hover:text-slate-700 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </CardHeader>
      <CardContent className="px-6">
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekDays.map((day, idx) => (
            <div key={idx} className="text-xs font-medium text-muted-foreground w-8 h-8 flex items-center justify-center mx-auto">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center">
          {days.map((day, idx) => {
            const isSelected = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, currentDate);
            
            return (
              <div
                key={idx}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium mx-auto transition-all
                  ${!isCurrentMonth ? "text-slate-300" : "text-slate-700"}
                  ${isSelected ? "bg-indigo-500 text-white shadow-md shadow-indigo-200" : "hover:bg-slate-100 cursor-pointer"}
                `}
              >
                {format(day, dateFormat)}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
