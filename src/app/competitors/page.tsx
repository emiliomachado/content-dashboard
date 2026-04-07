import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Activity } from "lucide-react";

const competitors = [
  { name: "Competitor A", handle: "@competitor_a", followers: "—", engagement: "—", posts: "—" },
  { name: "Competitor B", handle: "@competitor_b", followers: "—", engagement: "—", posts: "—" },
  { name: "Competitor C", handle: "@competitor_c", followers: "—", engagement: "—", posts: "—" },
];

export default function CompetitorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-orange-400" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Competitor Tracker</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Monitor competitor activity and engagement.
          </p>
        </div>
        <Badge className="ml-auto" variant="secondary">Coming Soon</Badge>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tracked Competitors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            <div className="grid grid-cols-4 text-xs text-muted-foreground pb-2 border-b border-border font-medium">
              <span>Account</span>
              <span className="text-center">Followers</span>
              <span className="text-center">Eng. Rate</span>
              <span className="text-center">Posts/mo</span>
            </div>
            {competitors.map((c, i) => (
              <div key={i} className="grid grid-cols-4 py-3 border-b border-border last:border-0 items-center">
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.handle}</p>
                </div>
                <p className="text-sm text-center">{c.followers}</p>
                <p className="text-sm text-center">{c.engagement}</p>
                <p className="text-sm text-center">{c.posts}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Follower Growth Comparison</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-40 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Add competitors to begin tracking.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-40 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">No recent activity to display.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
