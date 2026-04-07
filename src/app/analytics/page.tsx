import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart2, TrendingUp, Eye, MousePointerClick, Users } from "lucide-react";

const metrics = [
  { label: "Total Reach", value: "—", change: "—", icon: Eye },
  { label: "Impressions", value: "—", change: "—", icon: TrendingUp },
  { label: "Engagement Rate", value: "—", change: "—", icon: MousePointerClick },
  { label: "New Followers", value: "—", change: "—", icon: Users },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BarChart2 className="h-6 w-6 text-blue-400" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Track performance metrics and audience growth.
          </p>
        </div>
        <Badge className="ml-auto" variant="secondary">Coming Soon</Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.change} from last period</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Engagement Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-48 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Chart will appear here once data is connected.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Audience Demographics</CardTitle>
          </CardHeader>
          <CardContent className="h-48 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Demographics will appear here once data is connected.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
