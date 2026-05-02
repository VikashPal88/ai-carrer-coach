import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Layout, Zap } from "lucide-react";

const recommendations = [
  {
    title: "System Design Interview",
    description: "Based on your goal",
    icon: <Layout className="w-5 h-5 text-blue-500" />,
    bgColor: "bg-blue-50",
  },
  {
    title: "Improve Resume",
    description: "Get higher ATS score",
    icon: <ClipboardList className="w-5 h-5 text-indigo-500" />,
    bgColor: "bg-indigo-50",
  },
  {
    title: "Top 20 Frontend Jobs",
    description: "Based on your profile",
    icon: <Zap className="w-5 h-5 text-slate-600" />,
    bgColor: "bg-slate-100",
  },
];

export const Recommendations = () => {
  return (
    <Card className="border-none shadow-sm rounded-3xl h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800 text-indigo-600">Recommended for you</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        {recommendations.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl ${item.bgColor}`}>
              {item.icon}
            </div>
            <div className="space-y-0.5 mt-1">
              <h4 className="text-sm font-semibold text-slate-800 leading-tight">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
