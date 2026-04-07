"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Camera, Plus, Clock, CheckCircle2, FileText, Archive, CalendarDays, ImageIcon, Film, LayoutGrid, Layers, Globe } from "lucide-react";

type PostType = "Reel" | "Carousel" | "Single Image" | "Story";
type PostStatus = "scheduled" | "draft" | "published" | "backlog";
type Brand = "EmmiTec.Health" | "PETJourney";
type Lang = "EN" | "PT";

interface Post {
  id: string;
  brand: Brand;
  caption: string;
  type: PostType;
  status: PostStatus;
  scheduledDate: string;
  lang: Lang;
  hashtags: string;
}

const initialPosts: Post[] = [
  { id: "1", brand: "EmmiTec.Health", caption: "Remote patient monitoring is changing the way hospitals stay connected with patients after discharge. At EmmiTec.Health, we make that connection seamless.", type: "Carousel", status: "scheduled", scheduledDate: "2026-04-10", lang: "EN", hashtags: "#RPM #ConnectedCare #HealthTech #EmmiTecHealth" },
  { id: "2", brand: "PETJourney", caption: "O historico de saude do seu pet importa. Com a PETJourney, todas as informacoes clinicas ficam organizadas e acessiveis quando voce mais precisa.", type: "Single Image", status: "scheduled", scheduledDate: "2026-04-12", lang: "PT", hashtags: "#PETJourney #SaudeAnimal #CuidadoPreventivo" },
  { id: "3", brand: "EmmiTec.Health", caption: "Interoperability is the foundation of connected healthcare. Here is what it means for your organization.", type: "Reel", status: "draft", scheduledDate: "", lang: "EN", hashtags: "#Interoperability #DigitalHealth #HealthIT" },
  { id: "4", brand: "PETJourney", caption: "Voce sabia que a doenca do carrapato pode evoluir silenciosamente? Diagnostico precoce faz toda a diferenca. Saiba mais no link da bio.", type: "Carousel", status: "draft", scheduledDate: "", lang: "PT", hashtags: "#SaudeAnimal #MedicinaVeterinaria #PETJourney" },
  { id: "5", brand: "EmmiTec.Health", caption: "Proud to announce our partnership with NCHA Strategic Partners representing 130+ hospitals across North Carolina. Together closing the gap in connected care.", type: "Single Image", status: "published", scheduledDate: "2026-03-28", lang: "EN", hashtags: "#NCHA #NorthCarolina #RemotePatientMonitoring" },
  { id: "6", brand: "PETJourney", caption: "A medicina veterinaria evoluiu. Mas a forma como guardamos os dados de saude dos pets ainda nao acompanhou. Vamos mudar isso juntos.", type: "Reel", status: "published", scheduledDate: "2026-03-25", lang: "PT", hashtags: "#PETJourney #SaudeDigital #VetTech" },
  { id: "7", brand: "EmmiTec.Health", caption: "What does care continuity look like for underserved communities? A deep-dive thread.", type: "Carousel", status: "backlog", scheduledDate: "", lang: "EN", hashtags: "#HealthEquity #ConnectedCare #RPM" },
  { id: "8", brand: "PETJourney", caption: "Telemedicina veterinaria no Brasil: onde estamos e para onde vamos?", type: "Reel", status: "backlog", scheduledDate: "", lang: "PT", hashtags: "#TelemedicinaVeterinaria #PETJourney" },
];

const typeIcons: Record<PostType, React.ElementType> = { Reel: Film, Carousel: Layers, "Single Image": ImageIcon, Story: LayoutGrid };

const statusConfig: Record<PostStatus, { label: string; color: string; icon: React.ElementType }> = {
  scheduled: { label: "Scheduled", color: "text-blue-400 border-blue-400/30 bg-blue-400/10", icon: Clock },
  draft: { label: "Draft", color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10", icon: FileText },
  published: { label: "Published", color: "text-green-400 border-green-400/30 bg-green-400/10", icon: CheckCircle2 },
  backlog: { label: "Backlog", color: "text-muted-foreground border-border bg-muted/30", icon: Archive },
};

const brandColors: Record<Brand, string> = { "EmmiTec.Health": "text-blue-400", "PETJourney": "text-green-400" };
const langColors: Record<Lang, string> = { EN: "text-blue-300", PT: "text-emerald-300" };

function PostCard({ post, onStatusChange }: { post: Post; onStatusChange: (id: string, status: PostStatus) => void }) {
  const TypeIcon = typeIcons[post.type];
  const { label, color, icon: StatusIcon } = statusConfig[post.status];
  return (
    <Card className="flex flex-col gap-0 bg-card border-border hover:border-muted-foreground/30 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold ${brandColors[post.brand]}`}>{post.brand}</span>
            <span className={`text-xs font-medium ${langColors[post.lang]}`}>{post.lang}</span>
          </div>
          <Badge variant="outline" className={`text-xs shrink-0 ${color}`}>
            <StatusIcon className="h-3 w-3 mr-1" />{label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pt-0">
        <p className="text-sm leading-relaxed line-clamp-3">{post.caption}</p>
        <p className="text-xs text-muted-foreground line-clamp-1">{post.hashtags}</p>
        <div className="flex items-center justify-between pt-1 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TypeIcon className="h-3.5 w-3.5" />
            <span>{post.type}</span>
            {post.scheduledDate && (<><span>·</span><CalendarDays className="h-3.5 w-3.5" /><span>{post.scheduledDate}</span></>)}
          </div>
          <Select value={post.status} onValueChange={(val) => onStatusChange(post.id, val as PostStatus)}>
            <SelectTrigger className="h-6 text-xs w-28 border-0 bg-muted/50 px-2"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="backlog">Backlog</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

function NewPostDialog({ onAdd }: { onAdd: (post: Post) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    brand: "EmmiTec.Health" as Brand,
    caption: "",
    type: "Single Image" as PostType,
    status: "draft" as PostStatus,
    scheduledDate: "",
    lang: "EN" as Lang,
    hashtags: "",
  });

  function handleSubmit() {
    if (!form.caption.trim()) return;
    onAdd({ id: Date.now().toString(), ...form });
    setForm({ brand: "EmmiTec.Health", caption: "", type: "Single Image", status: "draft", scheduledDate: "", lang: "EN", hashtags: "" });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2"><Plus className="h-4 w-4" />New Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader><DialogTitle>New Instagram Post</DialogTitle></DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Brand</Label>
              <Select value={form.brand} onValueChange={(v) => setForm({ ...form, brand: v as Brand })}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="EmmiTec.Health">EmmiTec.Health</SelectItem>
                  <SelectItem value="PETJourney">PETJourney</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Language</Label>
              <Select value={form.lang} onValueChange={(v) => setForm({ ...form, lang: v as Lang })}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="EN">English</SelectItem>
                  <SelectItem value="PT">Portuguese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Caption</Label>
            <Textarea placeholder="Write your caption here..." className="resize-none text-sm min-h-[100px]" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Hashtags</Label>
            <Input placeholder="#HealthTech #RPM #EmmiTecHealth" className="text-sm h-9" value={form.hashtags} onChange={(e) => setForm({ ...form, hashtags: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Post Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as PostType })}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single Image">Single Image</SelectItem>
                  <SelectItem value="Carousel">Carousel</SelectItem>
                  <SelectItem value="Reel">Reel</SelectItem>
                  <SelectItem value="Story">Story</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as PostStatus })}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="backlog">Backlog</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {form.status === "scheduled" && (
            <div className="space-y-1.5">
              <Label className="text-xs">Scheduled Date</Label>
              <Input type="date" className="text-sm h-9" value={form.scheduledDate} onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })} />
            </div>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={handleSubmit} disabled={!form.caption.trim()}>Add Post</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PostGrid({ posts, onStatusChange }: { posts: Post[]; onStatusChange: (id: string, status: PostStatus) => void }) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Camera className="h-10 w-10 mb-3 opacity-30" />
        <p className="text-sm">No posts here yet.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => <PostCard key={post.id} post={post} onStatusChange={onStatusChange} />)}
    </div>
  );
}

export default function InstagramPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  function handleAdd(post: Post) { setPosts((prev) => [post, ...prev]); }
  function handleStatusChange(id: string, status: PostStatus) {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, status } : p));
  }

  const counts = {
    all: posts.length,
    scheduled: posts.filter((p) => p.status === "scheduled").length,
    draft: posts.filter((p) => p.status === "draft").length,
    published: posts.filter((p) => p.status === "published").length,
    backlog: posts.filter((p) => p.status === "backlog").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Camera className="h-6 w-6 text-pink-400" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Instagram Manager</h2>
          <p className="text-muted-foreground text-sm mt-0.5">EmmiTec.Health · PETJourney — content pipeline</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Globe className="h-3.5 w-3.5" />
            <span className="text-blue-300 font-medium">EN</span>
            <span>/</span>
            <span className="text-emerald-300 font-medium">PT</span>
          </div>
          <NewPostDialog onAdd={handleAdd} />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="bg-muted/50 mb-4">
          <TabsTrigger value="all" className="text-xs gap-1.5">All <Badge variant="secondary" className="text-xs px-1.5 py-0">{counts.all}</Badge></TabsTrigger>
          <TabsTrigger value="scheduled" className="text-xs gap-1.5"><Clock className="h-3 w-3" /> Scheduled <Badge variant="secondary" className="text-xs px-1.5 py-0">{counts.scheduled}</Badge></TabsTrigger>
          <TabsTrigger value="draft" className="text-xs gap-1.5"><FileText className="h-3 w-3" /> Drafts <Badge variant="secondary" className="text-xs px-1.5 py-0">{counts.draft}</Badge></TabsTrigger>
          <TabsTrigger value="published" className="text-xs gap-1.5"><CheckCircle2 className="h-3 w-3" /> Published <Badge variant="secondary" className="text-xs px-1.5 py-0">{counts.published}</Badge></TabsTrigger>
          <TabsTrigger value="backlog" className="text-xs gap-1.5"><Archive className="h-3 w-3" /> Backlog <Badge variant="secondary" className="text-xs px-1.5 py-0">{counts.backlog}</Badge></TabsTrigger>
        </TabsList>
        <TabsContent value="all"><PostGrid posts={posts} onStatusChange={handleStatusChange} /></TabsContent>
        <TabsContent value="scheduled"><PostGrid posts={posts.filter((p) => p.status === "scheduled")} onStatusChange={handleStatusChange} /></TabsContent>
        <TabsContent value="draft"><PostGrid posts={posts.filter((p) => p.status === "draft")} onStatusChange={handleStatusChange} /></TabsContent>
        <TabsContent value="published"><PostGrid posts={posts.filter((p) => p.status === "published")} onStatusChange={handleStatusChange} /></TabsContent>
        <TabsContent value="backlog"><PostGrid posts={posts.filter((p) => p.status === "backlog")} onStatusChange={handleStatusChange} /></TabsContent>
      </Tabs>
    </div>
  );
}
