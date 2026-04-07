import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Rss, Tag, Clock } from "lucide-react";

const feedSources = [
  { name: "MedCity News", focus: "Digital Health / RPM", lang: "EN" },
  { name: "HIMSS", focus: "Health IT & Interoperability", lang: "EN" },
  { name: "Rock Health", focus: "Health Tech / Investment", lang: "EN" },
  { name: "Futuro da Saúde", focus: "Saúde Digital Brasil", lang: "PT" },
  { name: "HIHUB.TECH", focus: "Inovação em Saúde", lang: "PT" },
  { name: "Pet Business", focus: "Pet Industry", lang: "EN" },
  { name: "VIN News", focus: "Veterinary Medicine", lang: "EN" },
];

const placeholderArticles = [
  { title: "Remote patient monitoring adoption accelerates in rural NC hospitals", source: "MedCity News", category: "RPM", time: "—", lang: "EN" },
  { title: "Interoperabilidade no SUS: desafios e oportunidades em 2026", source: "Futuro da Saúde", category: "SUS", time: "—", lang: "PT" },
  { title: "Connected care reduces 30-day readmissions by 18% in new study", source: "HIMSS", category: "Connected Care", time: "—", lang: "EN" },
  { title: "Mercado pet brasileiro atinge R$ 68 bilhões em 2025", source: "HIHUB.TECH", category: "Pet Health", time: "—", lang: "PT" },
  { title: "Digital health funding trends Q1 2026", source: "Rock Health", category: "Health Tech", time: "—", lang: "EN" },
  { title: "Telemedicina veterinária: regulação e adoção no Brasil", source: "VIN News", category: "Veterinary", time: "—", lang: "PT" },
];

const categories = ["All", "RPM", "Connected Care", "SUS", "Interoperability", "Health Tech", "Pet Health", "Veterinary"];

const langColor: Record<string, string> = {
  EN: "text-blue-400",
  PT: "text-green-400",
};

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Newspaper className="h-6 w-6 text-purple-400" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">News Consolidator</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Digital Health · RPM · SUS · Pet Health — EN/PT sources.
          </p>
        </div>
        <Badge className="ml-auto" variant="secondary">Coming Soon</Badge>
      </div>

      <Card>
        <CardContent className="py-4">
          <p className="text-xs text-muted-foreground font-medium mb-3 uppercase tracking-wide">Monitored Sources</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {feedSources.map((s) => (
              <div key={s.name} className="flex items-center justify-between border border-border rounded-md px-3 py-2">
                <div>
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.focus}</p>
                </div>
                <span className={`text-xs font-semibold ${langColor[s.lang]}`}>{s.lang}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 flex-wrap">
        <Tag className="h-4 w-4 text-muted-foreground" />
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant={cat === "All" ? "default" : "outline"}
            className="cursor-pointer text-xs"
          >
            {cat}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {placeholderArticles.map((article, i) => (
          <Card key={i} className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-snug">{article.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Rss className="h-3 w-3" />
                    <span>{article.source}</span>
                    <span>·</span>
                    <Clock className="h-3 w-3" />
                    <span>{article.time}</span>
                    <span>·</span>
                    <span className={`font-semibold ${langColor[article.lang]}`}>{article.lang}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs shrink-0">{article.category}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
