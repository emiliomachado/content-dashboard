import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, CheckCircle2, Circle } from "lucide-react";

const contentIdeas = [
  {
    title: "RPM impact: patient outcomes after 90 days",
    brand: "EmmiTec.Health",
    platform: "LinkedIn",
    lang: "EN",
    theme: "RPM",
    status: "draft",
  },
  {
    title: "O que é monitoramento remoto de pacientes?",
    brand: "EmmiTec.Health",
    platform: "LinkedIn",
    lang: "PT",
    theme: "RPM",
    status: "draft",
  },
  {
    title: "NCHA partnership milestone announcement",
    brand: "EmmiTec.Health",
    platform: "LinkedIn",
    lang: "EN",
    theme: "Partnership",
    status: "scheduled",
  },
  {
    title: "Interoperabilidade: o próximo passo da saúde digital",
    brand: "EmmiTec.Health",
    platform: "LinkedIn",
    lang: "PT",
    theme: "Interoperability",
    status: "draft",
  },
  {
    title: "Por que o histórico do seu pet importa?",
    brand: "PETJourney",
    platform: "Instagram",
    lang: "PT",
    theme: "Pet Health",
    status: "scheduled",
  },
  {
    title: "Doença do carrapato: diagnóstico precoce salva vidas",
    brand: "PETJourney",
    platform: "Instagram",
    lang: "PT",
    theme: "Pet Health",
    status: "draft",
  },
];

const themes = ["RPM", "Interoperability", "Digital Health", "Partnership", "Pet Health", "Longevity"];

const brandColors: Record<string, string> = {
  "EmmiTec.Health": "text-blue-400",
  "PETJourney": "text-green-400",
};

export default function CalendarPage() {
  const drafts = contentIdeas.filter((p) => p.status === "draft").length;
  const scheduled = contentIdeas.filter((p) => p.status === "scheduled").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CalendarDays className="h-6 w-6 text-green-400" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Content Calendar</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            EmmiTec.Health · PETJourney — EN/PT content pipeline.
          </p>
        </div>
        <Badge className="ml-auto" variant="secondary">Coming Soon</Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
            <Circle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{drafts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{scheduled}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">—</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Content Themes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {themes.map((t) => (
              <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Content Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            <div className="grid grid-cols-5 text-xs text-muted-foreground pb-2 border-b border-border font-medium">
              <span className="col-span-2">Title</span>
              <span>Brand</span>
              <span>Platform · Lang</span>
              <span className="text-right">Status</span>
            </div>
            {contentIdeas.map((post, i) => (
              <div key={i} className="grid grid-cols-5 py-3 border-b border-border last:border-0 items-center gap-2">
                <p className="text-sm col-span-2 leading-snug">{post.title}</p>
                <span className={`text-xs font-medium ${brandColors[post.brand]}`}>{post.brand}</span>
                <span className="text-xs text-muted-foreground">{post.platform} · {post.lang}</span>
                <div className="flex justify-end">
                  <Badge
                    variant={post.status === "scheduled" ? "default" : "outline"}
                    className="text-xs capitalize"
                  >
                    {post.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
