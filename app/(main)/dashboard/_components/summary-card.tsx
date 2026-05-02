import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const SummaryCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Career Score Card */}
      <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-sm rounded-3xl">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-muted-foreground font-medium text-sm">Career Score</h3>
          <div className="flex items-baseline gap-2">
            <h1 className="text-4xl font-bold text-slate-800">85</h1>
          </div>
          <div className="flex justify-between items-center text-sm font-medium">
            <p className="text-muted-foreground">Excellent</p>
            <p className="text-emerald-500 flex items-center bg-emerald-50 px-2 py-1 rounded-full">
              <ArrowUpRight className="w-3 h-3 mr-1" /> 12%
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Applications Card */}
      <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-sm rounded-3xl">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-muted-foreground font-medium text-sm">Applications</h3>
          <div className="flex items-baseline gap-2">
            <h1 className="text-4xl font-bold text-slate-800">24</h1>
          </div>
          <div className="flex justify-between items-center text-sm font-medium">
            <p className="text-muted-foreground">Total Applied</p>
          </div>
        </CardContent>
      </Card>

      {/* Interviews Card */}
      <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-sm rounded-3xl">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-muted-foreground font-medium text-sm">Interviews</h3>
          <div className="flex items-baseline gap-2">
            <h1 className="text-4xl font-bold text-slate-800">6</h1>
          </div>
          <div className="flex justify-between items-center text-sm font-medium">
            <p className="text-muted-foreground">This Month</p>
          </div>
        </CardContent>
      </Card>

      {/* Profile Views Card */}
      <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-sm rounded-3xl">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-muted-foreground font-medium text-sm">Profile Views</h3>
          <div className="flex items-baseline gap-2">
            <h1 className="text-4xl font-bold text-slate-800">124</h1>
          </div>
          <div className="flex justify-between items-center text-sm font-medium">
            <p className="text-muted-foreground">This Month</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCard;