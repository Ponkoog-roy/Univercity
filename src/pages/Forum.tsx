import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Eye, Clock, Pin, Search, Plus, ChevronRight, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { forumCategories, forumThreads } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Forum() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = forumThreads.filter((t) => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchSearch = search === "" || t.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <Layout>
      {/* Header */}
      <div className="bg-primary py-12 md:py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-accent text-sm font-bold uppercase tracking-widest mb-2 block">Community</span>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-primary-foreground">DIU Forum</h1>
              <p className="text-primary-foreground/70 mt-2">Connect, discuss, and collaborate with the DIU community.</p>
            </div>
            <Button className="bg-accent text-accent-foreground hover:bg-accent-dark hover:text-white font-bold rounded-full gap-2 self-start md:self-auto">
              <Plus size={16} /> New Thread
            </Button>
          </div>
        </div>
      </div>

      <div className="section-padding bg-background">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search threads..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-full border border-border bg-card text-sm outline-none focus:border-primary"
                />
              </div>

              {/* Categories */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-muted/30">
                  <h3 className="font-semibold text-sm text-foreground">Categories</h3>
                </div>
                <div className="p-2 space-y-0.5">
                  <button
                    onClick={() => setActiveCategory("All")}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                      activeCategory === "All" ? "bg-primary-light text-primary font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span>All Categories</span>
                    <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">{forumThreads.length}</span>
                  </button>
                  {forumCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.name)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                        activeCategory === cat.name ? "bg-primary-light text-primary font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Online Users */}
              <div className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                  <span className="font-semibold text-sm text-foreground">Online Now</span>
                </div>
                <div className="text-2xl font-bold text-primary">247</div>
                <p className="text-xs text-muted-foreground">members online</p>
              </div>

              {/* Trending */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center gap-2">
                  <TrendingUp size={14} className="text-primary" />
                  <h3 className="font-semibold text-sm text-foreground">Trending</h3>
                </div>
                <div className="p-2 space-y-0.5">
                  {forumThreads.slice(0, 3).map((t) => (
                    <div key={t.id} className="px-3 py-2 text-xs text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors cursor-pointer line-clamp-1">
                      {t.title}
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Thread List */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-sm">
                  <span className="font-semibold text-foreground">{filtered.length}</span> threads
                  {activeCategory !== "All" && <span> in <span className="text-primary font-medium">{activeCategory}</span></span>}
                </p>
                <select className="text-sm border border-border rounded-lg px-3 py-1.5 bg-card text-foreground outline-none">
                  <option>Latest Activity</option>
                  <option>Most Replies</option>
                  <option>Most Views</option>
                </select>
              </div>

              <div className="space-y-2">
                {filtered.map((thread, i) => (
                  <motion.div
                    key={thread.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all duration-150 group cursor-pointer",
                      thread.pinned ? "border-l-4 border-l-accent bg-accent-light/30" : "hover:border-l-4 hover:border-l-primary"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <img src={thread.avatar} alt={thread.author} className="w-9 h-9 rounded-full object-cover flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {thread.pinned && <Pin size={12} className="text-accent-dark flex-shrink-0" />}
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary-light text-primary">{thread.category}</span>
                          {thread.tags.map((tag) => (
                            <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">#{tag}</span>
                          ))}
                        </div>
                        <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors text-sm leading-snug mb-1">
                          {thread.title}
                        </h3>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Users size={11} />{thread.author}</span>
                          <span className="flex items-center gap-1"><MessageSquare size={11} />{thread.replies} replies</span>
                          <span className="flex items-center gap-1"><Eye size={11} />{thread.views.toLocaleString()}</span>
                          <span className="flex items-center gap-1"><Clock size={11} />{thread.lastActivity}</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground flex-shrink-0 mt-1 group-hover:text-primary transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  <MessageSquare size={48} className="mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No threads found</p>
                  <p className="text-sm">Try a different search or category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
