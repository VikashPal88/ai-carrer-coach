import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Code, FileText } from "lucide-react";

const activities = [
  {
    title: "You practiced Array problems",
    time: "2 hours ago",
    icon: <Code className="w-4 h-4 text-indigo-500" />,
    bgColor: "bg-indigo-50",
  },
  {
    title: "You applied for Software Engineer at Google",
    time: "1 day ago",
    icon: <Briefcase className="w-4 h-4 text-emerald-500" />,
    bgColor: "bg-emerald-50",
  },
  {
    title: "Your resume scored 82%",
    time: "2 days ago",
    icon: <FileText className="w-4 h-4 text-blue-500" />,
    bgColor: "bg-blue-50",
  },
];

export const RecentActivities = () => {
  return (
    <Card className="border-none shadow-sm rounded-3xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${activity.bgColor}`}>
              {activity.icon}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-700 leading-tight">
                {activity.title}
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
