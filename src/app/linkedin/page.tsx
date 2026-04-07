import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, Eye, TrendingUp, Repeat2, ThumbsUp, MessageSquare, FileText } from "lucide-react";

const stats = [
  { label: "Followers", value: "13,453", icon: Users },
  { label: "Post Impressions", value: "—", icon: Eye },
  { label: "Engagement Rate", value: "—", icon: TrendingUp },
  { label: "Reposts", value: "—", icon: Repeat2 },
];

const recentPosts = [
  {
    title: "NCHA Strategic Partners — EmmiTec.Health selected as approved partner",
    reactions: "18",
    comments: "6",
    reposts: "3",
    lang: "EN",
    brand: "EmmiTec.Health",
  },
  {
    title: "Debate: Desenvolvendo o Mercado da Longevidade — HIHUB.TECH",
    reactions: "15",
    comments: "—",
    reposts: "1",
    lang: "PT",
    brand: "EmmiTec.Health",
  },
  {
    title: "O Tribunal de Contas da União — auditoria CONITEC / SUS",
    reactions: "15",
    comments: "—",
    reposts: "1",
    lang: "PT",
    brand: "EmmiTec.Health",
  },
  {
    title: "Inovar também é educar — telemedicina e saúde digital",
    reactions: "16",
    comments: "—",
    reposts: "1",
    lang: "PT",
    brand: "EmmiTec.Health",
  },
];

const contentIdeas = [
  { title: "How NCHA partnership expands RPM reach across NC", lang: "EN", theme: "Partnership", status: "draft" },
  { title: "Connected care: o que significa para o paciente brasileiro", lang: "PT", theme: "Connected Care", status: "draft" },
  { title: "Why health data continuity is the future of preventive care", lang: "EN", theme: "Digital Health", status: "draft" },
  { title: "PETJourney: como nasceu a ideia de digitalizar a saúde animal", lang: "PT", theme: "PETJourney", status: "draft" },
];

const brandColors: Record<string, string> = {
  EN: "text-blue-400",
  PT: "text-green-400",
};

export default function LinkedInPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Briefcase className="h-6 w-6 text-blue-500" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">LinkedIn Manager</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Emilio Machado — personal brand, EmmiTec.Health & PETJourney.
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
          <div className="space-y-0">
            <div className="grid grid-cols-5 text-xs text-muted-foreground pb-2 border-b border-border font-medium">
              <span className="col-span-2">Post</span>
              <span className="text-center">Reactions</span>
              <span className="text-center">Comments</span>
              <span className="text-center">Reposts</span>
            </div>
            {recentPosts.map((post, i) => (
              <div key={i} className="grid grid-cols-5 py-3 border-b border-border last:border-0 items-center gap-2">
                <div className="col-span-2 space-y-1">
                  <p className="text-sm leading-snug">{post.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{post.brand}</Badge>
                    <span className={`text-xs font-semibold ${brandColors[post.lang]}`}>{post.lang}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1 text-sm">
                  <ThumbsUp className="h-3 w-3 text-muted-foreground" />
                  {post.reactions}
                </div>
                <div className="flex items-center justify-center gap-1 text-sm">
                  <MessageSquare className="h-3 w-3 text-muted-foreground" />
                  {post.comments}
                </div>
                <div className="flex items-center justify-center gap-1 text-sm">
                  <Repeat2 className="h-3 w-3 text-muted-foreground" />
                  {post.reposts}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Content Ideas</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            <div className="grid grid-cols-4 text-xs text-muted-foreground pb-2 border-b border-border font-medium">
              <span className="col-span-2">Title</span>
              <span>Theme</span>
              <span className="text-right">Lang · Status</span>
            </div>
            {contentIdeas.map((idea, i) => (
              <div key={i} className="grid grid-cols-4 py-3 border-b border-border last:border-0 items-center gap-2">
                <p className="text-sm col-span-2 leading-snug">{idea.title}</p>
                <Badge variant="outline" className="text-xs w-fit">{idea.theme}</Badge>
                <div className="flex items-center justify-end gap-2">
                  <span className={`text-xs font-semibold ${brandColors[idea.lang]}`}>{idea.lang}</span>
                  <Badge variant="outline" className="text-xs capitalize">{idea.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
