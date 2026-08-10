import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, MapPin, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { newsItems, events } from "@/lib/data";
import { cn } from "@/lib/utils";

const tabs = ["Featured", "Latest News", "Events"];

const categoryColors: Record<string, string> = {
  Achievement: "bg-accent-light text-accent-dark",
  Research: "bg-secondary-light text-secondary-dark",
  Admissions: "bg-primary-light text-primary",
  Events: "bg-purple-100 text-purple-800",
  International: "bg-cyan-100 text-cyan-800",
  "Campus Life": "bg-orange-100 text-orange-800",
};

function NewsCard({ item, featured = false }: { item: typeof newsItems[0]; featured?: boolean }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group",
        featured && "md:flex"
      )}
    >
      <div className={cn("overflow-hidden", featured ? "md:w-2/5 flex-shrink-0" : "")}>
        <img
          src={item.image}
          alt={item.title}
          className={cn(
            "w-full object-cover group-hover:scale-105 transition-transform duration-500",
            featured ? "h-full min-h-[220px]" : "h-48"
          )}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", categoryColors[item.category] || "bg-muted text-muted-foreground")}>
            {item.category}
          </span>
        </div>
        <h3 className={cn(
          "font-display font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2",
          featured ? "text-xl" : "text-base"
        )}>
          {item.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">{item.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar size={12} />{item.date}</span>
            <span className="flex items-center gap-1"><Clock size={12} />{item.readTime}</span>
          </div>
          <Link to="/news" className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            Read More <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function EventCard({ event }: { event: typeof events[0] }) {
  const typeColors: Record<string, string> = {
    Admissions: "bg-primary-light text-primary",
    Research: "bg-secondary-light text-secondary",
    Alumni: "bg-accent-light text-accent-dark",
    Academic: "bg-purple-100 text-purple-800",
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card border border-border rounded-xl p-5 flex gap-4 hover:shadow-md hover:border-primary/30 transition-all duration-200 group"
    >
      <div className="flex-shrink-0 w-14 h-14 bg-primary rounded-xl flex flex-col items-center justify-center text-primary-foreground">
        <span className="text-lg font-bold leading-none">{event.date.split(" ")[1].replace(",","")}</span>
        <span className="text-xs opacity-75">{event.date.split(" ")[0]}</span>
      </div>
      <div className="flex-1 min-w-0">
        <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full mb-1 inline-block", typeColors[event.type] || "bg-muted text-muted-foreground")}>
          {event.type}
        </span>
        <h4 className="font-semibold text-card-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
          {event.title}
        </h4>
        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock size={11} />{event.time}</span>
          <span className="flex items-center gap-1"><MapPin size={11} />{event.location.split(",")[0]}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState("Featured");

  const featured = newsItems.filter((n) => n.featured);
  const latest = newsItems;

  return (
    <section className="section-padding bg-background">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-2 block">Stay Informed</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
              Latest News & Events
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-muted rounded-full p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "Featured" && (
            <motion.div key="featured" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {featured.map((item) => <NewsCard key={item.id} item={item} featured />)}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {latest.slice(2, 6).map((item) => <NewsCard key={item.id} item={item} />)}
              </div>
            </motion.div>
          )}
          {activeTab === "Latest News" && (
            <motion.div key="latest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {latest.map((item) => <NewsCard key={item.id} item={item} />)}
              </div>
            </motion.div>
          )}
          {activeTab === "Events" && (
            <motion.div key="events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {events.map((event) => <EventCard key={event.id} event={event} />)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mt-10">
          <Link to="/news">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 gap-2 transition-all duration-200">
              View All News & Events
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
