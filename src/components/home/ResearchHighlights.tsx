import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, User, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { researchProjects, researchAreas, publications } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ResearchHighlights() {
  const [activeArea, setActiveArea] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const filtered = activeArea === "All" ? researchProjects : researchProjects.filter((p) => p.area === activeArea);

  return (
    <section className="section-padding" style={{ background: "var(--gradient-research)" }} ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-accent text-sm font-bold uppercase tracking-widest mb-2 block">Discovery & Innovation</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
              Research Highlights
            </h2>
          </div>
          <Link to="/research">
            <Button variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10 rounded-full gap-2">
              All Research <ArrowRight size={15} />
            </Button>
          </Link>
        </div>

        {/* Area Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {researchAreas.map((area) => (
            <button
              key={area}
              onClick={() => setActiveArea(area)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
                activeArea === area
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-white/10 text-white border-white/20 hover:bg-accent hover:text-accent-foreground hover:border-accent"
              )}
            >
              {area}
            </button>
          ))}
        </div>

        {/* Research Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card rounded-2xl overflow-hidden shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-200 group"
            >
              <div className="overflow-hidden h-44">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary-light text-secondary-dark">
                    {project.area}
                  </span>
                  <span className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    project.status === "Active" ? "text-secondary" : "text-muted-foreground"
                  )}>
                    <CircleDot size={10} />
                    {project.status}
                  </span>
                </div>
                <h3 className="font-display font-bold text-card-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <User size={11} />
                  <span>{project.pi}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-accent font-bold">{project.funding}</span>
                  <span className="text-muted-foreground">Since {project.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Publications Marquee */}
        <div className="bg-white/6 border border-white/10 rounded-2xl p-5 overflow-hidden">
          <div className="text-xs text-white/50 uppercase tracking-widest mb-3 font-semibold">Recent Publications</div>
          <div className="flex gap-0 overflow-hidden">
            <div className="flex gap-8 shrink-0 animate-marquee">
              {[...publications, ...publications].map((pub, i) => (
                <span key={i} className="text-sm text-white/70 whitespace-nowrap flex-shrink-0">
                  {pub}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
