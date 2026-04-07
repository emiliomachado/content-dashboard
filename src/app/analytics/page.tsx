"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { TrendingUp, Eye, Users, MousePointerClick, BarChart2, ThumbsUp, Repeat2, MessageSquare, ExternalLink } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const data30 = [
  { date: "Mar 7",  impressions: 1820, engagement: 3.2, emmitec: 13100, petjourney: 118 },
  { date: "Mar 10", impressions: 2340, engagement: 4.1, emmitec: 13140, petjourney: 120 },
  { date: "Mar 13", impressions: 1950, engagement: 3.8, emmitec: 13175, petjourney: 121 },
  { date: "Mar 16", impressions: 3100, engagement: 5.2, emmitec: 13210, petjourney: 123 },
  { date: "Mar 19", impressions: 2650, engagement: 4.6, emmitec: 13240, petjourney: 124 },
  { date: "Mar 22", impressions: 2100, engagement: 3.5, emmitec: 13270, petjourney: 125 },
  { date: "Mar 25", impressions: 2890, engagement: 4.9, emmitec: 13310, petjourney: 127 },
  { date: "Mar 28", impressions: 4200, engagement: 6.8, emmitec: 13360, petjourney: 129 },
  { date: "Mar 31", impressions: 3450, engagement: 5.4, emmitec: 13390, petjourney: 130 },
  { date: "Apr 3",  impressions: 2700, engagement: 4.3, emmitec: 13420, petjourney: 131 },
  { date: "Apr 6",  impressions: 3100, engagement: 4.8, emmitec: 13453, petjourney: 132 },
];

const data7 = data30.slice(-4);
const data90 = [
  { date: "Jan 6",  impressions: 1200, engagement: 2.8, emmitec: 12800, petjourney: 98 },
  { date: "Jan 20", impressions: 1650, engagement: 3.1, emmitec: 12870, petjourney: 102 },
  { date: "Feb 3",  impressions: 1900, engagement: 3.4, emmitec: 12940, petjourney: 107 },
  { date: "Feb 17", impressions: 2200, engagement: 3.7, emmitec: 13020, petjourney: 112 },
  { date: "Mar 3",  impressions: 2500, engagement: 4.0, emmitec: 13080, petjourney: 116 },
  ...data30,
];

const impressionsByPlatform30 = [
  { platform: "LinkedIn", emmitec: 18400, petjourney: 0 },
  { platform: "Instagram", emmitec: 5200, petjourney: 8600 },
];

const topPosts = [
  { title: "NCHA Strategic Partners — EmmiTec selected", brand: "EmmiTec.Health", platform: "LinkedIn", type: "Post", impressions: 4200, likes: 18, comments: 6, reposts: 3, lang: "EN", date: "Mar 28" },
  { title: "Debate: Desenvolvendo o Mercado da Longevidade", brand: "EmmiTec.Health", platform: "LinkedIn", type: "Video", impressions: 3800, likes: 15, comments: 2, reposts: 1, lang: "PT", date: "Mar 31" },
  { title: "Dados de saude dos pets — PETJourney", brand: "PETJourney", platform: "LinkedIn", type: "Post", impressions: 3200, likes: 18, comments: 1, reposts: 1, lang: "PT", date: "Apr 3" },
  { title: "O que e monitoramento remoto de pacientes?", brand: "EmmiTec.Health", platform: "Instagram", type: "Carousel", impressions: 2900, likes: 84, comments: 12, reposts: 0, lang: "PT", date: "Mar 25" },
  { title: "Connected care reduces 30-day readmissions", brand: "EmmiTec.Health", platform: "LinkedIn", type: "Post", impressions: 2650, likes: 16, comments: 3, reposts: 2, lang: "EN", date: "Mar 19" },
  { title: "Doenca do carrapato em caes — risco silencioso", brand: "PETJourney", platform: "Instagram", type: "Carousel", impressions: 2400, likes: 71, comments: 9, reposts: 3, lang: "PT", date: "Apr 1" },
];

const dataByRange: Record<string, typeof data30> = { "7": data7, "30": data30, "90": data90 };

const brandColors = { "EmmiTec.Health": "#60a5fa", PETJourney: "#34d399" };
const langColors: Record<string, string> = { EN: "text-blue-300", PT: "text-emerald-300" };

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { color: string; name: string; value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-md px-3 py-2 text-xs shadow-lg">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: <span className="font-semibold">{typeof p.value === "number" && p.value > 100 ? p.value.toLocaleString() : p.value}{p.name === "Eng. Rate" ? "%" : ""}</span></p>
      ))}
    </div>
  );
};

export default function AnalyticsPage() {
  const [range, setRange] = useState("30");
  const chartData = dataByRange[range];
  const latest = chartData[chartData.length - 1];
  const first = chartData[0];

  const totalImpressions = chartData.reduce((s, d) => s + d.impressions, 0);
  const avgEngagement = (chartData.reduce((s, d) => s + d.engagement, 0) / chartData.length).toFixed(1);
  const followerGrowth = latest.emmitec - first.emmitec;
  const petGrowth = latest.petjourney - first.petjourney;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BarChart2 className="h-6 w-6 text-blue-400" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            LinkedIn · Instagram — powered by Metricool
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Badge variant="outline" className="text-xs gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
            Metricool
          </Badge>
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="h-8 w-36 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Impressions</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalImpressions.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">All platforms · {range}d</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Engagement Rate</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{avgEngagement}%</p>
            <p className="text-xs text-green-400 mt-1">Above industry avg (2.8%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">LinkedIn Growth</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">+{followerGrowth.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Now {latest.emmitec.toLocaleString()} followers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">PETJourney Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">+{petGrowth}</p>
            <p className="text-xs text-muted-foreground mt-1">Now {latest.petjourney} followers</p>
          </CardContent>
        </Card>
      </div>

      {/* Impressions + Engagement Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Impressions Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#888" }} />
                <YAxis tick={{ fontSize: 10, fill: "#888" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="impressions" name="Impressions" fill="#60a5fa" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Engagement Rate (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#888" }} />
                <YAxis tick={{ fontSize: 10, fill: "#888" }} domain={[0, 8]} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="engagement" name="Eng. Rate" stroke="#f472b6" strokeWidth={2} dot={{ r: 3, fill: "#f472b6" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Follower Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Follower Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#888" }} />
              <YAxis tick={{ fontSize: 10, fill: "#888" }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
              <Line type="monotone" dataKey="emmitec" name="EmmiTec (LinkedIn)" stroke={brandColors["EmmiTec.Health"]} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="petjourney" name="PETJourney (Instagram)" stroke={brandColors["PETJourney"]} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Impressions by Platform */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Impressions by Platform (Last 30 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={impressionsByPlatform30} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="platform" tick={{ fontSize: 11, fill: "#888" }} />
              <YAxis tick={{ fontSize: 10, fill: "#888" }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
              <Bar dataKey="emmitec" name="EmmiTec.Health" fill={brandColors["EmmiTec.Health"]} radius={[3, 3, 0, 0]} />
              <Bar dataKey="petjourney" name="PETJourney" fill={brandColors["PETJourney"]} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Top Performing Posts</CardTitle>
          <Badge variant="outline" className="text-xs">Last 30 days</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            <div className="grid grid-cols-6 text-xs text-muted-foreground pb-2 border-b border-border font-medium">
              <span className="col-span-2">Post</span>
              <span className="text-center">Impressions</span>
              <span className="text-center">Likes</span>
              <span className="text-center">Comments</span>
              <span className="text-center">Reposts</span>
            </div>
            {topPosts.map((post, i) => (
              <div key={i} className="grid grid-cols-6 py-3 border-b border-border last:border-0 items-center gap-2">
                <div className="col-span-2 space-y-1">
                  <p className="text-sm leading-snug line-clamp-1">{post.title}</p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-xs font-semibold ${post.brand === "EmmiTec.Health" ? "text-blue-400" : "text-green-400"}`}>{post.brand}</span>
                    <Badge variant="outline" className="text-xs px-1.5 py-0">{post.platform}</Badge>
                    <Badge variant="outline" className="text-xs px-1.5 py-0">{post.type}</Badge>
                    <span className={`text-xs font-medium ${langColors[post.lang]}`}>{post.lang}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1 text-sm font-medium">
                  <Eye className="h-3 w-3 text-muted-foreground" />
                  {post.impressions.toLocaleString()}
                </div>
                <div className="flex items-center justify-center gap-1 text-sm">
                  <ThumbsUp className="h-3 w-3 text-muted-foreground" />
                  {post.likes}
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

      {/* Metricool note */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <ExternalLink className="h-3.5 w-3.5" />
        <span>Data sourced from Metricool. Connect your Metricool account to replace sample data with live metrics.</span>
      </div>
    </div>
  );
}
