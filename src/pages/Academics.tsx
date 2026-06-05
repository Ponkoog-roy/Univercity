import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Award, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { programs } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Cpu, Briefcase, Zap, Scale, Pill, Building, TrendingUp,
  Code, Heart, FlaskConical, Globe, BookOpen
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Cpu, Briefcase, Zap, Scale, Pill, Building, TrendingUp,
  Code, Heart, FlaskConical, Globe, Megaphone: BookOpen, Award,
};

const filterLevels = ["All", "Undergraduate", "Graduate", "PhD", "Short Course"];

const colorMap: Record<string, string> = {
  primary: "border-t-primary",
  secondary: "border-t-secondary",
  accent: "border-t-accent",
};

const iconBgMap: Record<string, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
};

export default function Academics() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = programs.filter((p) => {
    const matchLevel = activeFilter === "All" || p.level === activeFilter;
    const matchSearch = search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.faculty.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchSearch;
  });

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-primary py-16 md:py-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-accent text-sm font-bold uppercase tracking-widest mb-3 block">Explore Programs</span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-primary-foreground mb-4">
              Academic Programs
            </h1>
            <p className="text-primary-foreground/75 text-xl max-w-2xl">
              Discover 100+ programs across science, technology, business, engineering, and humanities.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="section-padding bg-background">
        <div className="container">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search programs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-full border border-border bg-card text-foreground text-sm outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filterLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveFilter(level)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                    activeFilter === level
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
                  )}
                >
                  {level}
                  <span className="ml-1.5 text-xs opacity-60">
                    ({programs.filter((p) => level === "All" || p.level === level).length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-muted-foreground text-sm mb-6">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> programs
          </p>

          {/* Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filtered.map((program, i) => {
                const Icon = iconMap[program.icon] || BookOpen;
                return (
                  <motion.div
                    key={program.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className={cn(
                      "bg-card border border-border border-t-4 rounded-2xl p-6 hover:shadow-lg transition-all duration-200 group",
                      colorMap[program.color]
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconBgMap[program.color])}>
                        <Icon size={20} />
                      </div>
                      <span className={cn(
                        "text-xs font-semibold px-2.5 py-1 rounded-full",
                        program.level === "Undergraduate" ? "bg-primary-light text-primary" :
                        program.level === "Graduate" ? "bg-secondary-light text-secondary-dark" :
                        program.level === "PhD" ? "bg-purple-100 text-purple-800" :
                        "bg-accent-light text-accent-dark"
                      )}>
                        {program.level}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-card-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                      {program.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{program.faculty}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                      <span className="flex items-center gap-1.5"><Clock size={13} />{program.duration}</span>
                      <span className="flex items-center gap-1.5"><Award size={13} />{program.credits} Credits</span>
                    </div>

                    <Button size="sm" variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      View Program Details <ArrowRight size={14} />
                    </Button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No programs found</p>
              <p className="text-sm">Try a different search term or filter.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
