"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarDays, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

type Platform = "LinkedIn" | "Instagram" | "YouTube" | "TikTok";
type PostStatus = "published" | "scheduled" | "draft";
type Brand = "EmmiTec.Health" | "PETJourney" | "Personal";

interface CalendarPost {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  platform: Platform;
  brand: Brand;
  type: string;
  status: PostStatus;
  lang: "EN" | "PT";
}

// ── Platform config ───────────────────────────────────────────────────────────

const platformConfig: Record<Platform, { bg: string; text: string; dot: string; border: string }> = {
  LinkedIn:  { bg: "bg-blue-100",   text: "text-blue-800",   dot: "bg-blue-500",   border: "border-blue-200" },
  Instagram: { bg: "bg-pink-100",   text: "text-pink-800",   dot: "bg-pink-500",   border: "border-pink-200" },
  YouTube:   { bg: "bg-red-100",    text: "text-red-800",    dot: "bg-red-500",    border: "border-red-200" },
  TikTok:    { bg: "bg-slate-100",  text: "text-slate-800",  dot: "bg-slate-600",  border: "border-slate-200" },
};

const statusConfig: Record<PostStatus, { label: string; ring: string }> = {
  published: { label: "Published", ring: "ring-green-400" },
  scheduled: { label: "Scheduled", ring: "ring-blue-400" },
  draft:     { label: "Draft",     ring: "ring-amber-400" },
};

// ── Seed data ─────────────────────────────────────────────────────────────────

const allPosts: CalendarPost[] = [
  // March — published
  { id: "m1",  date: "2026-03-04", title: "Inovar tambem e educar — telemedicina", platform: "LinkedIn", brand: "EmmiTec.Health", type: "Video", status: "published", lang: "PT" },
  { id: "m2",  date: "2026-03-07", title: "Digital health transformation cycles", platform: "LinkedIn", brand: "EmmiTec.Health", type: "Post", status: "published", lang: "EN" },
  { id: "m3",  date: "2026-03-10", title: "Dados salvam vidas — saude dos pets", platform: "LinkedIn", brand: "PETJourney", type: "Post", status: "published", lang: "PT" },
  { id: "m4",  date: "2026-03-10", title: "Pet health data continuity reel", platform: "Instagram", brand: "PETJourney", type: "Reel", status: "published", lang: "PT" },
  { id: "m5",  date: "2026-03-14", title: "Interoperabilidade no SUS thread", platform: "LinkedIn", brand: "EmmiTec.Health", type: "Post", status: "published", lang: "PT" },
  { id: "m6",  date: "2026-03-17", title: "Connected care for rural NC hospitals", platform: "LinkedIn", brand: "EmmiTec.Health", type: "Post", status: "published", lang: "EN" },
  { id: "m7",  date: "2026-03-19", title: "Doenca do carrapato carousel", platform: "Instagram", brand: "PETJourney", type: "Carousel", status: "published", lang: "PT" },
  { id: "m8",  date: "2026-03-21", title: "Longevidade market panel recap", platform: "LinkedIn", brand: "Personal", type: "Video", status: "published", lang: "PT" },
  { id: "m9",  date: "2026-03-25", title: "Medicina veterinaria evoluiu reel", platform: "Instagram", brand: "PETJourney", type: "Reel", status: "published", lang: "PT" },
  { id: "m10", date: "2026-03-26", title: "RPM intro — what is remote monitoring", platform: "YouTube", brand: "EmmiTec.Health", type: "Video", status: "published", lang: "EN" },
  { id: "m11", date: "2026-03-28", title: "NCHA Strategic Partners announcement", platform: "LinkedIn", brand: "EmmiTec.Health", type: "Post", status: "published", lang: "EN" },
  { id: "m12", date: "2026-03-28", title: "NCHA partnership Instagram post", platform: "Instagram", brand: "EmmiTec.Health", type: "Single Image", status: "published", lang: "EN" },
  { id: "m13", date: "2026-03-31", title: "Debate Longevidade HIHUB.TECH", platform: "LinkedIn", brand: "Personal", type: "Video", status: "published", lang: "PT" },
  // April — mix of published, scheduled, draft
  { id: "a1",  date: "2026-04-01", title: "Care continuity for patients post-discharge", platform: "LinkedIn", brand: "EmmiTec.Health", type: "Post", status: "published", lang: "EN" },
  { id: "a2",  date: "2026-04-01", title: "Tutor education — tick disease awareness", platform: "Instagram", brand: "PETJourney", type: "Carousel", status: "published", lang: "PT" },
  { id: "a3",  date: "2026-04-03", title: "O que e monitoramento remoto de pacientes", platform: "LinkedIn", brand: "EmmiTec.Health", type: "Post", status: "published", lang: "PT" },
  { id: "a4",  date: "2026-04-05", title: "PETJourney — historico clinico matters", platform: "LinkedIn", brand: "PETJourney", type: "Post", status: "published", lang: "PT" },
  { id: "a5",  date: "2026-04-05", title: "Pet health data TikTok clip", platform: "TikTok", brand: "PETJourney", type: "Video", status: "published", lang: "PT" },
  { id: "a6",  date: "2026-04-07", title: "EmmiTec RPM demo short", platform: "YouTube", brand: "EmmiTec.Health", type: "Video", status: "published", lang: "EN" },
  { id: "a8",  date: "2026-04-10", title: "RPM impact on hospital readmissions", platform: "LinkedIn", brand: "EmmiTec.Health", type: "Carousel", status: "scheduled", lang: "EN" },
  { id: "a9",  date: "2026-04-10", title: "Saude do pet carousel reel", platform: "Instagram", brand: "PETJourney", type: "Carousel", status: "scheduled", lang: "PT" },
  { id: "a11", date: "2026-04-12", title: "Historico do seu pet importa post", platform: "Instagram", brand: "PETJourney", type: "Single Image", status: "scheduled", lang: "PT" },
  { id: "a12", date: "2026-04-14", title: "Digital health investment trends Q1", platform: "LinkedIn", brand: "Personal", type: "Post", status: "scheduled", lang: "EN" },
  { id: "a13", date: "2026-04-14", title: "Connected care explainer short", platform: "YouTube", brand: "EmmiTec.Health", type: "Video", status: "scheduled", lang: "EN" },
  { id: "a15", date: "2026-04-17", title: "Interoperabilidade para gestores", platform: "LinkedIn", brand: "EmmiTec.Health", type: "Post", status: "scheduled", lang: "PT" },
  { id: "a16", date: "2026-04-19", title: "PETJourney TikTok — tutores series", platform: "TikTok", brand: "PETJourney", type: "Video", status: "scheduled", lang: "PT" },
  { id: "a17", date: "2026-04-21", title: "Health equity and RPM thread", platform: "LinkedIn", brand: "EmmiTec.Health", type: "Post", status: "draft", lang: "EN" },
  { id: "a18", date: "2026-04-21", title: "Veterinary innovation Instagram reel", platform: "Instagram", brand: "PETJourney", type: "Reel", status: "draft", lang: "PT" },
  { id: "a19", date: "2026-04-24", title: "SUS interoperability deep dive", platform: "YouTube", brand: "EmmiTec.Health", type: "Video", status: "draft", lang: "PT" },
  { id: "a20", date: "2026-04-28", title: "Patient engagement post-discharge", platform: "LinkedIn", brand: "EmmiTec.Health", type: "Post", status: "draft", lang: "EN" },
];

const ALL_PLATFORMS: Platform[] = ["LinkedIn", "Instagram", "YouTube", "TikTok"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ── Helpers ───────────────────────────────────────────────────────────────────

function toKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function PostChip({ post, onClick }: { post: CalendarPost; onClick: () => void }) {
  const cfg = platformConfig[post.platform];
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-1.5 py-0.5 rounded text-[10px] font-medium leading-snug truncate border",
        cfg.bg, cfg.text, cfg.border,
        "hover:brightness-95 transition-all"
      )}
    >
      <span className={cn("inline-block h-1.5 w-1.5 rounded-full mr-1 align-middle", cfg.dot)} />
      {post.title}
    </button>
  );
}

function PostDetailPanel({ post, onClose }: { post: CalendarPost; onClose: () => void }) {
  const pCfg = platformConfig[post.platform];
  const sCfg = statusConfig[post.status];
  return (
    <Card className="border shadow-lg">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <p className="text-sm font-semibold leading-snug">{post.title}</p>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge className={cn("text-xs border", pCfg.bg, pCfg.text, pCfg.border, "hover:brightness-95")}>{post.platform}</Badge>
          <Badge variant="outline" className={cn("text-xs ring-1", sCfg.ring)}>{sCfg.label}</Badge>
          <Badge variant="outline" className="text-xs">{post.brand}</Badge>
          <Badge variant="outline" className="text-xs">{post.type}</Badge>
          <Badge variant="outline" className={cn("text-xs", post.lang === "EN" ? "text-blue-600" : "text-emerald-600")}>{post.lang}</Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{post.date}</p>
      </CardContent>
    </Card>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CalendarPage() {
  const today = new Date();
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(3); // April = 3 (0-indexed)
  const [filters, setFilters] = useState<Set<Platform>>(new Set(ALL_PLATFORMS));
  const [selected, setSelected] = useState<CalendarPost | null>(null);

  function prevMonth() { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); }
  function nextMonth() { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); }
  function toggleFilter(p: Platform) {
    setFilters(prev => {
      const next = new Set(prev);
      if (next.has(p)) { if (next.size > 1) next.delete(p); } else next.add(p);
      return next;
    });
  }

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const postsByDay = new Map<string, CalendarPost[]>();
  allPosts.forEach(p => {
    if (!filters.has(p.platform)) return;
    const list = postsByDay.get(p.date) ?? [];
    list.push(p);
    postsByDay.set(p.date, list);
  });

  const totalScheduled = allPosts.filter(p => filters.has(p.platform) && p.status === "scheduled").length;
  const totalPublished = allPosts.filter(p => filters.has(p.platform) && p.status === "published").length;
  const totalDraft = allPosts.filter(p => filters.has(p.platform) && p.status === "draft").length;

  // Build calendar cells
  const cells: { day: number; currentMonth: boolean; key: string }[] = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: daysInPrev - firstDay + 1 + i, currentMonth: false, key: "" });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, currentMonth: true, key: toKey(year, month, d) });
  const remaining = (7 - (cells.length % 7)) % 7;
  for (let i = 1; i <= remaining; i++) cells.push({ day: i, currentMonth: false, key: "" });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <CalendarDays className="h-6 w-6 text-indigo-500" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Content Calendar</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            EmmiTec.Health · PETJourney · Personal — monthly overview
          </p>
        </div>
      </div>

      {/* Controls row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Month nav */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-base font-semibold w-40 text-center">{MONTHS[month]} {year}</span>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Platform filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {ALL_PLATFORMS.map(p => {
            const cfg = platformConfig[p];
            const active = filters.has(p);
            return (
              <button
                key={p}
                onClick={() => toggleFilter(p)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all",
                  active ? cn(cfg.bg, cfg.text, cfg.border) : "bg-gray-100 text-gray-400 border-gray-200"
                )}
              >
                <span className={cn("h-2 w-2 rounded-full", active ? cfg.dot : "bg-gray-300")} />
                {p}
              </button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-500" />{totalPublished} published</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500" />{totalScheduled} scheduled</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" />{totalDraft} draft</span>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DAYS.map(d => (
            <div key={d} className="py-2 text-center text-xs font-semibold text-gray-500 bg-gray-50">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 divide-x divide-y divide-gray-100">
          {cells.map((cell, i) => {
            const posts = cell.key ? (postsByDay.get(cell.key) ?? []) : [];
            const isToday = cell.currentMonth && cell.day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            return (
              <div
                key={i}
                className={cn(
                  "min-h-[110px] p-1.5 flex flex-col gap-1",
                  !cell.currentMonth && "bg-gray-50/60",
                )}
              >
                <span className={cn(
                  "text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full",
                  isToday ? "bg-indigo-500 text-white" : cell.currentMonth ? "text-gray-700" : "text-gray-300"
                )}>
                  {cell.day}
                </span>
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  {posts.slice(0, 3).map(post => (
                    <PostChip
                      key={post.id}
                      post={post}
                      onClick={() => setSelected(selected?.id === post.id ? null : post)}
                    />
                  ))}
                  {posts.length > 3 && (
                    <span className="text-[10px] text-muted-foreground pl-1">+{posts.length - 3} more</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Post detail panel */}
      {selected && (
        <PostDetailPanel post={selected} onClose={() => setSelected(null)} />
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
        {ALL_PLATFORMS.map(p => (
          <span key={p} className="flex items-center gap-1.5">
            <span className={cn("h-2.5 w-2.5 rounded-sm", platformConfig[p].bg, "border", platformConfig[p].border)} />
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
