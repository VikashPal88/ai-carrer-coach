import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  {
    title: "Poster Challenge",
    date: "Wed, 20 May",
    time: "7 p.m.",
  },
  {
    title: "Career Day",
    date: "Fri, 22 May",
    time: "7 p.m.",
  },
  {
    title: "Typography Master Class",
    date: "Fri, 22 May",
    time: "9 p.m.",
  },
  {
    title: "Learning Figma",
    date: "Tue, 26 May",
    time: "7 p.m.",
  },
  {
    title: "Presentation for Branding",
    date: "Wed, 28 May",
    time: "7 p.m.",
  },
];

export const UpcomingEvents = () => {
  return (
    <Card className="border-none shadow-sm rounded-3xl h-fit">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800">Events</CardTitle>
        <Button variant="link" className="text-indigo-500 font-medium h-auto p-0">
          View all <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-5 pt-4">
        {events.map((event, index) => (
          <div key={index} className="flex flex-col space-y-2 border-b border-gray-100 last:border-0 pb-4 last:pb-0">
            <h4 className="text-sm font-semibold text-slate-800">{event.title}</h4>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {event.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {event.time}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
