"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Plus, TrendingUp, TrendingDown, Minus,
  ChevronUp, ChevronDown, ChevronsUpDown,
  Users, Search, ExternalLink, ChevronRight,
  ChevronDown as ChevronDownIcon, AlertCircle, Building2, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

type Platform = "LinkedIn" | "Instagram" | "YouTube" | "TikTok";
type Category = "Health Tech" | "Pet Health" | "Digital Health" | "Other";
type SortField = "name" | "platform" | "followers" | "growth" | "engagement" | "postsPerWeek" | "lastPost";
type SortDir = "asc" | "desc";

interface RecentPost { title: string; date: string; likes: number; comments: number; type: string; }
interface SocialAccount { platform: Platform; handle: string; followers: number; growthPct: number; engagementRate: number; postsPerWeek: number; lastPost: string; recentPosts: RecentPost[]; }
interface Competitor { id: string; name: string; category: Category; website: string; accounts: SocialAccount[]; }
interface MyCompany { id: string; name: string; color: string; competitors: Competitor[]; }

// ── Platform / category config ────────────────────────────────────────────────

const platformConfig: Record<Platform, { color: string; bg: string }> = {
  LinkedIn:  { color: "text-blue-400",  bg: "bg-blue-400/10 border-blue-400/20" },
  Instagram: { color: "text-pink-400",  bg: "bg-pink-400/10 border-pink-400/20" },
  YouTube:   { color: "text-red-400",   bg: "bg-red-400/10 border-red-400/20" },
  TikTok:    { color: "text-slate-300", bg: "bg-slate-400/10 border-slate-400/20" },
};
const categoryConfig: Record<Category, string> = {
  "Health Tech":    "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "Pet Health":     "text-green-400 bg-green-400/10 border-green-400/20",
  "Digital Health": "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "Other":          "text-slate-400 bg-slate-400/10 border-slate-400/20",
};
const ALL_PLATFORMS: Platform[] = ["LinkedIn", "Instagram", "YouTube", "TikTok"];
const ALL_CATEGORIES: Category[] = ["Health Tech", "Pet Health", "Digital Health", "Other"];

const COMPANY_COLORS = ["#3b82f6","#10b981","#f59e0b","#8b5cf6","#ef4444","#06b6d4","#f97316"];

// ── Seed data ─────────────────────────────────────────────────────────────────

const emmitecCompetitors: Competitor[] = [
  { id: "e1", name: "Biofourmis", category: "Health Tech", website: "biofourmis.com", accounts: [
    { platform: "LinkedIn", handle: "@biofourmis", followers: 28400, growthPct: 2.1, engagementRate: 3.8, postsPerWeek: 4, lastPost: "2026-04-05", recentPosts: [
      { title: "AI-driven RPM reduces hospital readmissions by 22%", date: "Apr 5", likes: 94, comments: 18, type: "Post" },
      { title: "Biofourmis raises $140M Series D funding", date: "Apr 2", likes: 210, comments: 44, type: "Post" },
      { title: "Webinar: The Future of Remote Care Management", date: "Mar 29", likes: 67, comments: 12, type: "Event" },
    ]},
    { platform: "Instagram", handle: "@biofourmis", followers: 4200, growthPct: 1.4, engagementRate: 2.1, postsPerWeek: 2, lastPost: "2026-04-03", recentPosts: [
      { title: "Team spotlight: data science at Biofourmis", date: "Apr 3", likes: 88, comments: 6, type: "Single Image" },
    ]},
  ]},
  { id: "e2", name: "Vivify Health", category: "Health Tech", website: "vivifyhealth.com", accounts: [
    { platform: "LinkedIn", handle: "@vivifyhealth", followers: 14600, growthPct: 1.3, engagementRate: 2.9, postsPerWeek: 3, lastPost: "2026-04-04", recentPosts: [
      { title: "Vivify RPM now available for Medicare Advantage plans", date: "Apr 4", likes: 58, comments: 11, type: "Post" },
      { title: "Case study: 30% reduction in readmissions with RPM", date: "Apr 1", likes: 74, comments: 9, type: "Post" },
    ]},
    { platform: "YouTube", handle: "@vivifyhealthtv", followers: 1800, growthPct: 0.8, engagementRate: 1.6, postsPerWeek: 1, lastPost: "2026-03-25", recentPosts: [
      { title: "How RPM works: patient onboarding demo", date: "Mar 25", likes: 34, comments: 7, type: "Video" },
    ]},
  ]},
  { id: "e3", name: "TytoCare", category: "Health Tech", website: "tytocare.com", accounts: [
    { platform: "LinkedIn", handle: "@tytocare", followers: 21300, growthPct: 3.2, engagementRate: 4.5, postsPerWeek: 5, lastPost: "2026-04-06", recentPosts: [
      { title: "TytoCare named Top 10 Digital Health Company 2026", date: "Apr 6", likes: 183, comments: 34, type: "Post" },
      { title: "How AI diagnostics improve rural care access", date: "Apr 3", likes: 127, comments: 21, type: "Post" },
    ]},
    { platform: "Instagram", handle: "@tytocare", followers: 8900, growthPct: 2.8, engagementRate: 3.7, postsPerWeek: 4, lastPost: "2026-04-05", recentPosts: [
      { title: "Behind the scenes: building TytoHome device", date: "Apr 5", likes: 312, comments: 28, type: "Reel" },
    ]},
    { platform: "YouTube", handle: "@tytocaretv", followers: 5400, growthPct: 2.1, engagementRate: 3.2, postsPerWeek: 2, lastPost: "2026-04-02", recentPosts: [
      { title: "Full telehealth exam walkthrough with TytoHome", date: "Apr 2", likes: 89, comments: 22, type: "Video" },
    ]},
  ]},
  { id: "e4", name: "Caregility", category: "Health Tech", website: "caregility.com", accounts: [
    { platform: "LinkedIn", handle: "@caregility", followers: 9800, growthPct: 1.9, engagementRate: 3.1, postsPerWeek: 3, lastPost: "2026-04-04", recentPosts: [
      { title: "Caregility virtual care platform expands to 50 hospitals", date: "Apr 4", likes: 72, comments: 14, type: "Post" },
      { title: "How ambient monitoring reduces ICU nurse workload", date: "Apr 1", likes: 91, comments: 18, type: "Post" },
    ]},
  ]},
];

const petjourneyCompetitors: Competitor[] = [
  { id: "p1", name: "VetRec", category: "Pet Health", website: "vetrec.ai", accounts: [
    { platform: "LinkedIn", handle: "@vetrec", followers: 3800, growthPct: 5.4, engagementRate: 6.2, postsPerWeek: 4, lastPost: "2026-04-05", recentPosts: [
      { title: "VetRec AI reduces documentation time by 70%", date: "Apr 5", likes: 118, comments: 24, type: "Post" },
      { title: "New integration: VetRec + Cornerstone PIMS", date: "Apr 2", likes: 94, comments: 17, type: "Post" },
      { title: "Why veterinarians are burning out — and how AI helps", date: "Mar 30", likes: 201, comments: 52, type: "Post" },
    ]},
    { platform: "Instagram", handle: "@vetrec.ai", followers: 2100, growthPct: 7.1, engagementRate: 5.8, postsPerWeek: 3, lastPost: "2026-04-04", recentPosts: [
      { title: "Vet clinic transformation with AI notes", date: "Apr 4", likes: 187, comments: 22, type: "Reel" },
    ]},
  ]},
  { id: "p2", name: "PetDesk", category: "Pet Health", website: "petdesk.com", accounts: [
    { platform: "LinkedIn", handle: "@petdesk", followers: 6200, growthPct: 1.8, engagementRate: 2.7, postsPerWeek: 3, lastPost: "2026-04-03", recentPosts: [
      { title: "PetDesk raises $30M to expand vet practice tools", date: "Apr 3", likes: 76, comments: 13, type: "Post" },
      { title: "How reminders reduce missed appointments by 40%", date: "Mar 31", likes: 54, comments: 8, type: "Post" },
    ]},
    { platform: "Instagram", handle: "@petdesk", followers: 11400, growthPct: 2.4, engagementRate: 4.1, postsPerWeek: 5, lastPost: "2026-04-06", recentPosts: [
      { title: "Cute patient of the week — Max the golden", date: "Apr 6", likes: 892, comments: 67, type: "Single Image" },
      { title: "5 signs your pet needs a vet visit now", date: "Apr 4", likes: 634, comments: 43, type: "Carousel" },
    ]},
    { platform: "TikTok", handle: "@petdesk", followers: 8300, growthPct: 9.2, engagementRate: 7.4, postsPerWeek: 6, lastPost: "2026-04-06", recentPosts: [
      { title: "POV: you are a vet tech on a Monday", date: "Apr 6", likes: 4200, comments: 183, type: "Video" },
      { title: "How we remind 10k pet owners every day", date: "Apr 3", likes: 2800, comments: 97, type: "Video" },
    ]},
  ]},
  { id: "p3", name: "Digitail", category: "Pet Health", website: "digitail.io", accounts: [
    { platform: "LinkedIn", handle: "@digitail", followers: 4100, growthPct: 4.2, engagementRate: 5.1, postsPerWeek: 4, lastPost: "2026-04-05", recentPosts: [
      { title: "Digitail PIMS now available in Brazil and Portugal", date: "Apr 5", likes: 134, comments: 29, type: "Post" },
      { title: "Why cloud-native PIMS is the future of vet practice", date: "Apr 2", likes: 98, comments: 18, type: "Post" },
    ]},
    { platform: "Instagram", handle: "@digitail.io", followers: 3200, growthPct: 6.3, engagementRate: 5.9, postsPerWeek: 4, lastPost: "2026-04-04", recentPosts: [
      { title: "Team in Lisbon celebrating 500 clinics milestone", date: "Apr 4", likes: 421, comments: 38, type: "Single Image" },
    ]},
  ]},
  { id: "p4", name: "Anipanion", category: "Pet Health", website: "anipanion.com", accounts: [
    { platform: "LinkedIn", handle: "@anipanion", followers: 2400, growthPct: 3.8, engagementRate: 4.7, postsPerWeek: 3, lastPost: "2026-04-03", recentPosts: [
      { title: "Telehealth for pets: what vets are saying in 2026", date: "Apr 3", likes: 88, comments: 19, type: "Post" },
      { title: "Anipanion partners with VCA Animal Hospitals", date: "Mar 31", likes: 112, comments: 27, type: "Post" },
    ]},
    { platform: "Instagram", handle: "@anipanion", followers: 5600, growthPct: 4.9, engagementRate: 6.1, postsPerWeek: 5, lastPost: "2026-04-05", recentPosts: [
      { title: "Virtual vet visit from your couch — how it works", date: "Apr 5", likes: 341, comments: 42, type: "Reel" },
    ]},
  ]},
];

const initialCompanies: MyCompany[] = [
  { id: "emmitec", name: "EmmiTec.Health", color: COMPANY_COLORS[0], competitors: emmitecCompetitors },
  { id: "petjourney", name: "PETJourney", color: COMPANY_COLORS[1], competitors: petjourneyCompetitors },
];

// ── Helper components ─────────────────────────────────────────────────────────

function GrowthBadge({ pct }: { pct: number }) {
  if (pct > 2) return <span className="flex items-center gap-0.5 text-green-400 text-xs font-semibold"><TrendingUp className="h-3 w-3" />+{pct}%</span>;
  if (pct < 0) return <span className="flex items-center gap-0.5 text-red-400 text-xs font-semibold"><TrendingDown className="h-3 w-3" />{pct}%</span>;
  return <span className="flex items-center gap-0.5 text-slate-400 text-xs font-semibold"><Minus className="h-3 w-3" />{pct}%</span>;
}

function SortIcon({ field, sortField, sortDir }: { field: SortField; sortField: SortField; sortDir: SortDir }) {
  if (field !== sortField) return <ChevronsUpDown className="h-3 w-3 text-slate-500" />;
  return sortDir === "asc" ? <ChevronUp className="h-3 w-3 text-blue-400" /> : <ChevronDown className="h-3 w-3 text-blue-400" />;
}

function CompetitorDetail({ competitor }: { competitor: Competitor }) {
  return (
    <div className="bg-gray-900/60 border-t border-gray-700/50 px-4 py-4 space-y-4">
      {competitor.accounts.map(acc => {
        const pcfg = platformConfig[acc.platform];
        return (
          <div key={acc.platform + acc.handle} className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={cn("text-xs border", pcfg.bg, pcfg.color)}>{acc.platform}</Badge>
              <span className="text-xs text-gray-400">{acc.handle}</span>
              <span className="text-xs text-gray-500">· {acc.followers.toLocaleString()} followers</span>
              <GrowthBadge pct={acc.growthPct} />
            </div>
            {acc.recentPosts.length > 0 ? (
              <div className="rounded-lg border border-gray-700/50 overflow-hidden">
                <div className="grid grid-cols-5 text-[10px] text-gray-500 px-3 py-1.5 bg-gray-800/60 font-medium border-b border-gray-700/50">
                  <span className="col-span-2">Post</span>
                  <span className="text-center">Date</span>
                  <span className="text-center">Likes</span>
                  <span className="text-center">Comments</span>
                </div>
                {acc.recentPosts.map((p, i) => (
                  <div key={i} className="grid grid-cols-5 text-xs px-3 py-2 border-b border-gray-700/30 last:border-0 items-center">
                    <span className="col-span-2 text-gray-300 leading-snug line-clamp-1">{p.title}</span>
                    <span className="text-center text-gray-500">{p.date}</span>
                    <span className="text-center text-gray-300">{p.likes}</span>
                    <span className="text-center text-gray-300">{p.comments}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 py-1">
                <AlertCircle className="h-3.5 w-3.5" />Connect Metricool to pull live post data.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Add Company Dialog ────────────────────────────────────────────────────────

function AddCompanyDialog({ onAdd, usedColors }: { onAdd: (c: MyCompany) => void; usedColors: string[] }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const nextColor = COMPANY_COLORS.find(c => !usedColors.includes(c)) ?? COMPANY_COLORS[0];

  function handleSubmit() {
    if (!name.trim()) return;
    onAdd({ id: Date.now().toString(), name: name.trim(), color: nextColor, competitors: [] });
    setName("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-gray-600 text-gray-500 hover:text-gray-300 hover:border-gray-500 text-xs transition-colors">
        <Plus className="h-3.5 w-3.5" />Add company
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm bg-gray-900 border-gray-700 text-gray-100">
        <DialogHeader><DialogTitle className="text-gray-100">Add Company</DialogTitle></DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-gray-400">Company Name</Label>
            <Input placeholder="e.g. My New Brand" className="bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 h-9 text-sm" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-0" onClick={handleSubmit} disabled={!name.trim()}>Add</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Add Competitor Dialog ─────────────────────────────────────────────────────

function AddCompetitorDialog({ onAdd }: { onAdd: (c: Competitor) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("Health Tech");
  const [website, setWebsite] = useState("");
  const [platform, setPlatform] = useState<Platform>("LinkedIn");
  const [handle, setHandle] = useState("");

  function handleSubmit() {
    if (!name.trim() || !handle.trim()) return;
    onAdd({
      id: Date.now().toString(), name: name.trim(), category, website: website.trim(),
      accounts: [{ platform, handle: handle.startsWith("@") ? handle.trim() : `@${handle.trim()}`, followers: 0, growthPct: 0, engagementRate: 0, postsPerWeek: 0, lastPost: "—", recentPosts: [] }],
    });
    setName(""); setCategory("Health Tech"); setWebsite(""); setPlatform("LinkedIn"); setHandle("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors">
        <Plus className="h-4 w-4" />Add Competitor
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 text-gray-100">
        <DialogHeader><DialogTitle className="text-gray-100">Add Competitor</DialogTitle></DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-gray-400">Company Name</Label>
            <Input placeholder="e.g. Caregility" className="bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 h-9 text-sm" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-400">Category</Label>
              <Select value={category} onValueChange={v => setCategory(v as Category)}>
                <SelectTrigger className="h-9 text-sm bg-gray-800 border-gray-700 text-gray-100"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                  {ALL_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-400">Website</Label>
              <Input placeholder="company.com" className="bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 h-9 text-sm" value={website} onChange={e => setWebsite(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-400">Platform</Label>
              <Select value={platform} onValueChange={v => setPlatform(v as Platform)}>
                <SelectTrigger className="h-9 text-sm bg-gray-800 border-gray-700 text-gray-100"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                  {ALL_PLATFORMS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-400">Handle</Label>
              <Input placeholder="@handle" className="bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 h-9 text-sm" value={handle} onChange={e => setHandle(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-0" onClick={handleSubmit} disabled={!name.trim() || !handle.trim()}>Add</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CompetitorsPage() {
  const [companies, setCompanies] = useState<MyCompany[]>(initialCompanies);
  const [activeCompanyId, setActiveCompanyId] = useState("emmitec");
  const [search, setSearch] = useState("");
  const [filterPlatform, setFilterPlatform] = useState<Platform | "All">("All");
  const [sortField, setSortField] = useState<SortField>("followers");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const activeCompany = companies.find(c => c.id === activeCompanyId) ?? companies[0];

  function toggleExpand(id: string) {
    setExpanded(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }
  function handleSort(field: SortField) {
    if (field === sortField) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  }
  function handleAddCompany(c: MyCompany) { setCompanies(prev => [...prev, c]); setActiveCompanyId(c.id); }
  function handleRemoveCompany(id: string) {
    if (companies.length === 1) return;
    setCompanies(prev => prev.filter(c => c.id !== id));
    if (activeCompanyId === id) setActiveCompanyId(companies.find(c => c.id !== id)!.id);
  }
  function handleAddCompetitor(competitor: Competitor) {
    setCompanies(prev => prev.map(c => c.id === activeCompanyId ? { ...c, competitors: [competitor, ...c.competitors] } : c));
  }

  const flatRows = useMemo(() => {
    return activeCompany.competitors
      .flatMap(c => c.accounts.filter(a => filterPlatform === "All" || a.platform === filterPlatform).map(a => ({ competitor: c, account: a })))
      .filter(r => {
        const q = search.toLowerCase();
        return r.competitor.name.toLowerCase().includes(q) || r.account.handle.toLowerCase().includes(q);
      })
      .sort((a, b) => {
        let va: string | number = 0, vb: string | number = 0;
        switch (sortField) {
          case "name": va = a.competitor.name; vb = b.competitor.name; break;
          case "platform": va = a.account.platform; vb = b.account.platform; break;
          case "followers": va = a.account.followers; vb = b.account.followers; break;
          case "growth": va = a.account.growthPct; vb = b.account.growthPct; break;
          case "engagement": va = a.account.engagementRate; vb = b.account.engagementRate; break;
          case "postsPerWeek": va = a.account.postsPerWeek; vb = b.account.postsPerWeek; break;
          case "lastPost": va = a.account.lastPost; vb = b.account.lastPost; break;
        }
        if (va < vb) return sortDir === "asc" ? -1 : 1;
        if (va > vb) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [activeCompany, search, filterPlatform, sortField, sortDir]);

  const Th = ({ field, label, className }: { field: SortField; label: string; className?: string }) => (
    <th className={cn("px-4 py-3 text-left text-xs font-medium text-gray-400 cursor-pointer select-none whitespace-nowrap", className)} onClick={() => handleSort(field)}>
      <span className="flex items-center gap-1 hover:text-gray-200 transition-colors">
        {label}<SortIcon field={field} sortField={sortField} sortDir={sortDir} />
      </span>
    </th>
  );

  return (
    <div className="min-h-full bg-gray-950 -m-6 p-6 space-y-5">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-blue-400" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-100">Competitor Tracker</h2>
          <p className="text-gray-400 text-sm mt-0.5">Cross-platform competitor intelligence by company</p>
        </div>
      </div>

      {/* Company tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {companies.map(company => (
          <div key={company.id} className="relative group">
            <button
              onClick={() => setActiveCompanyId(company.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all",
                activeCompanyId === company.id
                  ? "text-white border-transparent shadow-lg"
                  : "bg-gray-800/50 border-gray-700 text-gray-400 hover:text-gray-200 hover:border-gray-600"
              )}
              style={activeCompanyId === company.id ? { backgroundColor: company.color, borderColor: company.color } : {}}
            >
              <Building2 className="h-3.5 w-3.5" />
              {company.name}
              <span className={cn(
                "text-xs rounded-full px-1.5 py-0 font-semibold",
                activeCompanyId === company.id ? "bg-white/20 text-white" : "bg-gray-700 text-gray-400"
              )}>
                {company.competitors.length}
              </span>
            </button>
            {companies.length > 1 && (
              <button
                onClick={() => handleRemoveCompany(company.id)}
                className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-gray-700 text-gray-400 hover:bg-red-500 hover:text-white hidden group-hover:flex items-center justify-center transition-colors"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            )}
          </div>
        ))}
        <AddCompanyDialog onAdd={handleAddCompany} usedColors={companies.map(c => c.color)} />
      </div>

      {/* Active company header + actions */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: activeCompany.color }} />
        <span className="text-gray-200 text-sm font-medium">{activeCompany.name}</span>
        <span className="text-gray-500 text-sm">— {activeCompany.competitors.length} competitors tracked</span>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            <Input placeholder="Search..." className="pl-8 h-8 w-48 text-xs bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={filterPlatform} onValueChange={v => setFilterPlatform(v as Platform | "All")}>
            <SelectTrigger className="h-8 w-36 text-xs bg-gray-800 border-gray-700 text-gray-300"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
              <SelectItem value="All">All Platforms</SelectItem>
              {ALL_PLATFORMS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
          <AddCompetitorDialog onAdd={handleAddCompetitor} />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-700/60 overflow-hidden shadow-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-800/80 border-b border-gray-700">
            <tr>
              <th className="px-4 py-3 w-8" />
              <Th field="name" label="Competitor" />
              <Th field="platform" label="Platform" />
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Handle</th>
              <Th field="followers" label="Followers" className="text-right" />
              <Th field="growth" label="Growth/mo" className="text-right" />
              <Th field="engagement" label="Eng. Rate" className="text-right" />
              <Th field="postsPerWeek" label="Posts/wk" className="text-right" />
              <Th field="lastPost" label="Last Post" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/40 bg-gray-900">
            {flatRows.map(({ competitor: c, account: a }, i) => {
              const pcfg = platformConfig[a.platform];
              const isExpanded = expanded.has(c.id);
              const isLastOfCompetitor = i === flatRows.length - 1 || flatRows[i + 1].competitor.id !== c.id;
              return (
                <>
                  <tr key={`${c.id}-${a.platform}`} className="hover:bg-gray-800/50 transition-colors cursor-pointer" onClick={() => toggleExpand(c.id)}>
                    <td className="px-4 py-3">
                      {isLastOfCompetitor && (isExpanded ? <ChevronDownIcon className="h-3.5 w-3.5 text-gray-400" /> : <ChevronRight className="h-3.5 w-3.5 text-gray-400" />)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-0.5">
                        <p className="text-gray-100 font-medium text-sm">{c.name}</p>
                        <div className="flex items-center gap-1.5">
                          <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 border", categoryConfig[c.category])}>{c.category}</Badge>
                          {c.website && (
                            <a href={`https://${c.website}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-gray-500 hover:text-blue-400">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={cn("text-xs border", pcfg.bg, pcfg.color)}>{a.platform}</Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{a.handle}</td>
                    <td className="px-4 py-3 text-right text-gray-200 font-medium tabular-nums">
                      {a.followers > 0 ? a.followers.toLocaleString() : <span className="text-gray-600">—</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {a.growthPct > 0 ? <GrowthBadge pct={a.growthPct} /> : <span className="text-gray-600 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {a.engagementRate > 0 ? (
                        <span className={cn("text-xs font-medium", a.engagementRate >= 4 ? "text-green-400" : a.engagementRate >= 2.5 ? "text-yellow-400" : "text-red-400")}>
                          {a.engagementRate}%
                        </span>
                      ) : <span className="text-gray-600 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-300 text-xs tabular-nums">
                      {a.postsPerWeek > 0 ? `${a.postsPerWeek}×` : <span className="text-gray-600">—</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{a.lastPost}</td>
                  </tr>
                  {isExpanded && isLastOfCompetitor && (
                    <tr key={`${c.id}-detail`}>
                      <td colSpan={9} className="p-0"><CompetitorDetail competitor={c} /></td>
                    </tr>
                  )}
                </>
              );
            })}
            {flatRows.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-gray-500 text-sm">
                  No competitors yet. Click <span className="text-blue-400">Add Competitor</span> to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-600 flex items-center gap-1.5">
        <AlertCircle className="h-3.5 w-3.5" />
        Sample data shown. Connect Metricool or a social API to pull live competitor metrics.
      </p>
    </div>
  );
}
