import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Briefcase, BarChart2, CalendarDays, Users, Newspaper } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    title: "LinkedIn Manager",
    description: "Draft and schedule posts, track impressions, and manage your personal brand on LinkedIn.",
    href: "/linkedin",
    icon: Briefcase,
    status: "Active",
  },
  {
    title: "Instagram Manager",
    description: "Manage EmmiTec.Health and PETJourney posts, stories, and engagement across both brand accounts.",
    href: "/instagram",
    icon: Camera,
    status: "Active",
  },
  {
    title: "Analytics",
    description: "Track LinkedIn follower growth, post reach, and engagement across EmmiTec.Health and PETJourney.",
    href: "/analytics",
    icon: BarChart2,
    status: "Active",
  },
  {
    title: "Content Calendar",
    description: "Plan EN/PT content across Digital Health, RPM, Interoperability, and Pet Health themes.",
    href: "/calendar",
    icon: CalendarDays,
    status: "Active",
  },
  {
    title: "Competitor Tracker",
    description: "Monitor health tech and pet health competitors — posting cadence, follower growth, and engagement.",
    href: "/competitors",
    icon: Users,
    status: "Active",
  },
  {
    title: "News Consolidator",
    description: "Aggregate news on Digital Health, RPM, SUS, Interoperability, and Pet Health from key sources.",
    href: "/news",
    icon: Newspaper,
    status: "Active",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, Emilio</h2>
        <p className="text-muted-foreground mt-1">
          EmmiTec.Health · PETJourney — Content Management Hub
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
