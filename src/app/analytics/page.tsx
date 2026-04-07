import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart2, TrendingUp, Eye, MousePointerClick, Users, Heart } from "lucide-react";

const linkedInMetrics = [
  { label: "Followers", value: "13,453", change: "—", icon: Users },
  { label: "Post Impressions", value: "—", change: "—", icon: Eye },
  { label: "Engagement Rate", value: "—", change: "—", icon: MousePointerClick },
  { label: "Reposts", value: "—", change: "—", icon: TrendingUp },
];

const brandMetrics = [
  {
    brand: "EmmiTec.Health",
    color: "text-blue-400",
    topTopics: ["#RemotePatientMonitoring", "#ConnectedCare", "#HealthTech", "#SaúdeDigital", "#Interoperabilidade"],
    audience: "Healthcare executives, hospital administrators, health tech investors, clinicians",
  },
  {
    brand: "PETJourney",
    color: "text-green-400",
    topTopics: ["#PETJourney", "#SaúdeAnimal", "#MedicinaVeterinária", "#CuidadoPreventivo", "#PetHealth"],
    audience: "Veterinarians, pet owners (tutores), animal health professionals",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BarChart2 className="h-6 w-6 text-blue-400" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            LinkedIn · Camera — EmmiTec.Health & PETJourney performance.
          </p>
        </div>
        <Badge className="ml-auto" variant="secondary">Coming Soon</Badge>
      </div>

      <div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-3">LinkedIn — Emilio Machado</p>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {linkedInMetrics.map((metric) => {
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
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {brandMetrics.map((b) => (
          <Card key={b.brand}>
            <CardHeader>
              <CardTitle className={`text-base ${b.color}`}>{b.brand}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-2">Top Hashtags</p>
                <div className="flex flex-wrap gap-2">
                  {b.topTopics.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Target Audience</p>
                <p className="text-sm text-muted-foreground">{b.audience}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Engagement Over Time</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-40 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Connect accounts to populate chart.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Follower Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-40 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Connect accounts to populate chart.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
