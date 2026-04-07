import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Instagram, BarChart2, CalendarDays, Users, Newspaper } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    title: "Instagram Manager",
    description: "Manage posts, stories, and engagement across your Instagram accounts.",
    href: "/instagram",
    icon: Instagram,
    status: "Active",
  },
  {
    title: "Analytics",
    description: "Track performance metrics, reach, and audience growth over time.",
    href: "/analytics",
    icon: BarChart2,
    status: "Active",
  },
  {
    title: "Content Calendar",
    description: "Plan and schedule content across all channels in one place.",
    href: "/calendar",
    icon: CalendarDays,
    status: "Active",
  },
  {
    title: "Competitor Tracker",
    description: "Monitor competitor activity, posting frequency, and engagement.",
    href: "/competitors",
    icon: Users,
    status: "Active",
  },
  {
    title: "News Consolidator",
    description: "Aggregate industry news and trending topics relevant to your niche.",
    href: "/news",
    icon: Newspaper,
    status: "Active",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-1">
          Welcome to your content management hub.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.href} href={section.href}>
              <Card className="h-full transition-colors hover:bg-accent/50 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {section.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {section.status}
                    </Badge>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
