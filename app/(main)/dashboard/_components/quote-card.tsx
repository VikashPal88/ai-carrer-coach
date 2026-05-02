import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export const QuoteCard = () => {
  return (
    <Card className="border-none shadow-sm rounded-3xl bg-indigo-50/50">
      <CardContent className="p-6 space-y-4 relative">
        <Quote className="w-10 h-10 text-indigo-200" />
        <h3 className="text-xl font-semibold text-slate-800 leading-snug">
          Consistent practice and tracking are the keys to success!
        </h3>
      </CardContent>
    </Card>
  );
};
