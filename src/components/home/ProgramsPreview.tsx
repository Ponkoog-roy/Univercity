import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  primary: "border-t-primary bg-primary-light/40",
  secondary: "border-t-secondary bg-secondary-light/40",
  accent: "border-t-accent bg-accent-light/40",
};

const iconBgMap: Record<string, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
};

export default function ProgramsPreview() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All" ? programs : programs.filter((p) => p.level === activeFilter);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-2 block">Explore Your Future</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Academic Programs
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose from 100+ programs across science, technology, business, engineering, and humanities.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filterLevels.map((level) => (
            <button
              key={level}
              onClick={() => setActiveFilter(level)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                activeFilter === level
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary hover:bg-primary-light"
              )}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {filtered.map((program, i) => {
              const Icon = iconMap[program.icon] || BookOpen;
              return (
                <motion.div
                  key={program.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.22, delay: i * 0.04, ease: "easeOut" }}
                  className={cn(
                    "bg-card border border-border border-t-4 rounded-2xl p-5 hover:shadow-lg hover:border-t-4 transition-all duration-200 group cursor-pointer",
                    colorMap[program.color]
                  )}
                >
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", iconBgMap[program.color])}>
                    <Icon size={20} />
                  </div>

                  <h3 className="font-display font-bold text-card-foreground text-sm leading-snug mb-1 group-hover:text-primary transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">{program.faculty}</p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock size={11} />{program.duration}</span>
                    <span className="flex items-center gap-1"><Award size={11} />{program.credits} Credits</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-xs font-semibold px-2.5 py-1 rounded-full",
                      program.level === "Undergraduate" ? "bg-primary-light text-primary" :
                      program.level === "Graduate" ? "bg-secondary-light text-secondary-dark" :
                      program.level === "PhD" ? "bg-purple-100 text-purple-800" :
                      "bg-accent-light text-accent-dark"
                    )}>
                      {program.level}
                    </span>
                    <Link
                      to="/academics"
                      className="text-primary text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      View <ArrowRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/academics">
            <Button className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-full px-8 gap-2">
              View All Programs
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
