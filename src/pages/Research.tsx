import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, ArrowRight, CircleDot, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { researchProjects, researchAreas, publications } from "@/lib/data";
import { cn } from "@/lib/utils";

const centers = [
  { name: "Center for AI & Machine Learning", head: "Prof. Dr. M. Lutfar Rahman", active: 12 },
  { name: "Smart Technology Research Lab", head: "Dr. Shafiqul Islam", active: 8 },
  { name: "Blockchain & Fintech Lab", head: "Dr. Kamruzzaman", active: 6 },
  { name: "Environmental Science Center", head: "Prof. Dr. Fatima Khanam", active: 9 },
  { name: "Biomedical Engineering Lab", head: "Dr. Rashid Ahmed", active: 7 },
  { name: "Cybersecurity Research Unit", head: "Dr. Tasnuva Hossain", active: 5 },
];

export default function Research() {
  const [activeArea, setActiveArea] = useState("All");

  const filtered = activeArea === "All" ? researchProjects : researchProjects.filter((p) => p.area === activeArea);

  return (
    <Layout>
      <div className="bg-primary py-16 md:py-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-accent text-sm font-bold uppercase tracking-widest mb-3 block">Discovery & Innovation</span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-primary-foreground mb-4">Research at DIU</h1>
            <p className="text-primary-foreground/75 text-xl max-w-2xl">
              Advancing knowledge through 25+ research centers, cutting-edge labs, and global collaborations.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Research Projects */}
      <section className="section-padding bg-background">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-foreground mb-6">Active Research Projects</h2>

          <div className="flex flex-wrap gap-2 mb-8">
            {researchAreas.map((area) => (
              <button
                key={area}
                onClick={() => setActiveArea(area)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
                  activeArea === area ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary hover:text-primary"
                )}
              >
                {area}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence>
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: i * 0.06 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group"
                >
                  <div className="overflow-hidden h-44">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-secondary-light text-secondary-dark">{project.area}</span>
                      <span className={cn("flex items-center gap-1 text-xs font-medium", project.status === "Active" ? "text-secondary" : "text-muted-foreground")}>
                        <CircleDot size={10} />{project.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-card-foreground text-sm leading-snug mb-2">{project.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                      <User size={11} />{project.pi}
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-accent font-bold">{project.funding}</span>
                      <span className="text-muted-foreground">Since {project.year}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Research Centers */}
      <section className="section-padding bg-muted/20">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-foreground mb-8">Research Centers & Labs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {centers.map((center, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <BookOpen size={18} className="text-accent" />
                </div>
                <h3 className="font-bold text-card-foreground mb-1 group-hover:text-primary transition-colors">{center.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">Director: {center.head}</p>
                <div className="flex items-center gap-2 text-xs">
                  <CircleDot size={10} className="text-secondary" />
                  <span className="text-secondary font-semibold">{center.active} Active Projects</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="section-padding bg-primary">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-primary-foreground mb-8">Recent Publications</h2>
          <div className="space-y-3">
            {publications.map((pub, i) => (
              <div key={i} className="bg-white/10 border border-white/15 rounded-xl px-5 py-4 flex items-start gap-3 hover:bg-white/15 transition-colors">
                <Award size={16} className="text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">{pub}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10 rounded-full gap-2">
              View All Publications <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
