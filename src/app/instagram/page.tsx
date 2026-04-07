import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, ImagePlus, Heart, MessageCircle, Users } from "lucide-react";

const accounts = [
  {
    brand: "EmmiTec.Health",
    handle: "@emmitec.health",
    color: "text-blue-400",
    stats: [
      { label: "Followers", value: "—", icon: Users },
      { label: "Posts", value: "—", icon: ImagePlus },
      { label: "Avg. Likes", value: "—", icon: Heart },
      { label: "Avg. Comments", value: "—", icon: MessageCircle },
    ],
  },
  {
    brand: "PETJourney",
    handle: "@petjourney",
    color: "text-green-400",
    stats: [
      { label: "Followers", value: "—", icon: Users },
      { label: "Posts", value: "—", icon: ImagePlus },
      { label: "Avg. Likes", value: "—", icon: Heart },
      { label: "Avg. Comments", value: "—", icon: MessageCircle },
    ],
  },
];

const contentPillars = [
  { brand: "EmmiTec.Health", pillar: "Remote Patient Monitoring", lang: "EN/PT" },
  { brand: "EmmiTec.Health", pillar: "Connected Care & Interoperability", lang: "EN/PT" },
  { brand: "EmmiTec.Health", pillar: "Digital Health Innovation", lang: "EN/PT" },
  { brand: "EmmiTec.Health", pillar: "NCHA & Partnership Announcements", lang: "EN" },
  { brand: "PETJourney", pillar: "Pet Health Data Continuity", lang: "PT/EN" },
  { brand: "PETJourney", pillar: "Veterinary Innovation", lang: "PT" },
  { brand: "PETJourney", pillar: "Tutor Education & Awareness", lang: "PT" },
];

export default function InstagramPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Camera className="h-6 w-6 text-pink-400" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Instagram Manager</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            EmmiTec.Health · PETJourney — posts, stories, and engagement.
          </p>
        </div>
        <Badge className="ml-auto" variant="secondary">Coming Soon</Badge>
      </div>

      {accounts.map((account) => (
        <div key={account.brand} className="space-y-3">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${account.color}`}>{account.brand}</span>
            <span className="text-xs text-muted-foreground">{account.handle}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {account.stats.map((stat) => {
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
        </div>
      ))}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Content Pillars</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            <div className="grid grid-cols-3 text-xs text-muted-foreground pb-2 border-b border-border font-medium">
              <span>Brand</span>
              <span>Pillar</span>
              <span className="text-right">Language</span>
            </div>
            {contentPillars.map((p, i) => (
              <div key={i} className="grid grid-cols-3 py-2.5 border-b border-border last:border-0 items-center">
                <span className="text-xs font-medium text-muted-foreground">{p.brand}</span>
                <span className="text-sm">{p.pillar}</span>
                <Badge variant="outline" className="text-xs w-fit ml-auto">{p.lang}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
