import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Activity } from "lucide-react";

const healthTechCompetitors = [
  { name: "Vivify Health", handle: "@vivifyhealth", focus: "RPM", followers: "—", engagement: "—", posts: "—" },
  { name: "Biofourmis", handle: "@biofourmis", focus: "RPM / AI", followers: "—", engagement: "—", posts: "—" },
  { name: "TytoCare", handle: "@tytocare", focus: "Telehealth", followers: "—", engagement: "—", posts: "—" },
  { name: "Caregility", handle: "@caregility", focus: "Connected Care", followers: "—", engagement: "—", posts: "—" },
];

const petHealthCompetitors = [
  { name: "VetRec", handle: "@vetrec.ai", focus: "Vet Records / AI", followers: "—", engagement: "—", posts: "—" },
  { name: "PetDesk", handle: "@petdesk", focus: "Pet Health Mgmt", followers: "—", engagement: "—", posts: "—" },
  { name: "Digitail", handle: "@digitail", focus: "Vet Practice", followers: "—", engagement: "—", posts: "—" },
];

function CompetitorTable({ competitors }: { competitors: typeof healthTechCompetitors }) {
  return (
    <div className="space-y-0">
      <div className="grid grid-cols-5 text-xs text-muted-foreground pb-2 border-b border-border font-medium">
        <span className="col-span-2">Company</span>
        <span>Focus</span>
        <span className="text-center">Followers</span>
        <span className="text-center">Posts/mo</span>
      </div>
      {competitors.map((c, i) => (
        <div key={i} className="grid grid-cols-5 py-3 border-b border-border last:border-0 items-center">
          <div className="col-span-2">
            <p className="text-sm font-medium">{c.name}</p>
            <p className="text-xs text-muted-foreground">{c.handle}</p>
          </div>
          <Badge variant="outline" className="text-xs w-fit">{c.focus}</Badge>
          <p className="text-sm text-center">{c.followers}</p>
          <p className="text-sm text-center">{c.posts}</p>
        </div>
      ))}
    </div>
  );
}

export default function CompetitorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-orange-400" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Competitor Tracker</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Health Tech (RPM/Connected Care) · Pet Health — competitor intelligence.
          </p>
        </div>
        <Badge className="ml-auto" variant="secondary">Coming Soon</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <span className="text-blue-400">EmmiTec.Health</span>
            <span className="text-muted-foreground font-normal text-sm">— RPM & Digital Health Competitors</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CompetitorTable competitors={healthTechCompetitors} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <span className="text-green-400">PETJourney</span>
            <span className="text-muted-foreground font-normal text-sm">— Pet Health Platform Competitors</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CompetitorTable competitors={petHealthCompetitors} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Follower Growth Comparison</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-40 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Connect accounts to begin tracking.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Recent Competitor Activity</CardTitle>
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
