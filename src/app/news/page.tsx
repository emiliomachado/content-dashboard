import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Rss, Tag, Clock } from "lucide-react";

const placeholderArticles = [
  { title: "Industry update placeholder", source: "Source A", category: "Industry", time: "—" },
  { title: "Trend report placeholder", source: "Source B", category: "Trends", time: "—" },
  { title: "Platform news placeholder", source: "Source C", category: "Platform", time: "—" },
  { title: "Marketing insight placeholder", source: "Source D", category: "Marketing", time: "—" },
];

const categories = ["All", "Industry", "Trends", "Platform", "Marketing"];

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Newspaper className="h-6 w-6 text-purple-400" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">News Consolidator</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Aggregated industry news and trending topics.
          </p>
        </div>
        <Badge className="ml-auto" variant="secondary">Coming Soon</Badge>
      </div>
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
