import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronRight, Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { newsItems, events } from "@/lib/data";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  Achievement: "bg-accent-light text-accent-dark",
  Research: "bg-secondary-light text-secondary-dark",
  Admissions: "bg-primary-light text-primary",
  Events: "bg-purple-100 text-purple-800",
  International: "bg-cyan-100 text-cyan-800",
  "Campus Life": "bg-orange-100 text-orange-800",
};

export default function News() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(newsItems.map((n) => n.category)))];

  const filtered = newsItems.filter((n) => {
    const matchCat = activeCategory === "All" || n.category === activeCategory;
    const matchSearch = search === "" || n.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <Layout>
      <div className="bg-primary py-16 md:py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-accent text-sm font-bold uppercase tracking-widest mb-3 block">Stay Informed</span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-primary-foreground mb-4">News & Events</h1>
          </motion.div>
        </div>
      </div>

      <div className="section-padding bg-background">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main */}
            <div className="flex-1 min-w-0">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search news..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-full border border-border bg-card text-sm outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-semibold transition-all border",
                        activeCategory === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary hover:text-primary"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured */}
              {filtered.filter((n) => n.featured).length > 0 && activeCategory === "All" && search === "" && (
                <div className="mb-8">
                  <h2 className="font-semibold text-foreground text-sm uppercase tracking-wide mb-4">Featured</h2>
                  <div className="grid md:grid-cols-2 gap-5">
                    {filtered.filter((n) => n.featured).map((item, i) => (
                      <motion.article
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group"
                      >
                        <div className="overflow-hidden h-52">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-5">
                          <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full mb-2 inline-block", categoryColors[item.category] || "bg-muted text-muted-foreground")}>
                            {item.category}
                          </span>
                          <h3 className="font-display font-bold text-card-foreground group-hover:text-primary transition-colors mb-2">{item.title}</h3>
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{item.excerpt}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar size={11} />{item.date}</span>
                            <span className="flex items-center gap-1 text-primary font-semibold cursor-pointer hover:gap-2 transition-all">
                              Read More <ChevronRight size={13} />
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              )}

              {/* All Articles */}
              <h2 className="font-semibold text-foreground text-sm uppercase tracking-wide mb-4">
                {filtered.length} Article{filtered.length !== 1 ? "s" : ""}
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {filtered.map((item, i) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card border border-border rounded-xl p-4 flex gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group cursor-pointer"
                  >
                    <div className="overflow-hidden rounded-lg flex-shrink-0 w-24 h-24">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5 inline-block", categoryColors[item.category] || "bg-muted text-muted-foreground")}>
                        {item.category}
                      </span>
                      <h3 className="font-semibold text-card-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">{item.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar size={10} />{item.date}</span>
                        <span className="flex items-center gap-1"><Clock size={10} />{item.readTime}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* Sidebar - Events */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="bg-card border border-border rounded-2xl overflow-hidden sticky top-24">
                <div className="px-5 py-4 border-b border-border bg-muted/30">
                  <h3 className="font-semibold text-foreground">Upcoming Events</h3>
                </div>
                <div className="p-4 space-y-3">
                  {events.map((event) => (
                    <div key={event.id} className="flex gap-3 group cursor-pointer">
                      <div className="w-12 h-12 bg-primary rounded-lg flex flex-col items-center justify-center text-primary-foreground flex-shrink-0">
                        <span className="text-sm font-bold leading-none">{event.date.split(" ")[1].replace(",","")}</span>
                        <span className="text-xs opacity-70">{event.date.split(" ")[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-card-foreground group-hover:text-primary transition-colors line-clamp-2">{event.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}
