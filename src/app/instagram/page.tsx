import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Instagram, ImagePlus, Heart, MessageCircle, Users } from "lucide-react";

const stats = [
  { label: "Followers", value: "—", icon: Users },
  { label: "Posts", value: "—", icon: ImagePlus },
  { label: "Avg. Likes", value: "—", icon: Heart },
  { label: "Avg. Comments", value: "—", icon: MessageCircle },
];

export default function InstagramPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Instagram className="h-6 w-6 text-pink-400" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Instagram Manager</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage posts, stories, and engagement.
          </p>
        </div>
        <Badge className="ml-auto" variant="secondary">Coming Soon</Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Connect your Instagram account to view and manage posts here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
