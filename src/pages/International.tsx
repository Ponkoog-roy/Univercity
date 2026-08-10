import { motion } from "framer-motion";
import { Globe, ArrowRight, MapPin, Users, Plane, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { partnerUniversities, internationalStats } from "@/lib/data";

const programs = [
  { title: "Student Exchange Program", duration: "1 Semester", spots: 50, icon: Users },
  { title: "Study Abroad Programs", duration: "1-2 Semesters", spots: 30, icon: Plane },
  { title: "Joint Degree Programs", duration: "Full Program", spots: 20, icon: FileText },
  { title: "Research Collaboration", duration: "Flexible", spots: 15, icon: Globe },
];

export default function International() {
  return (
    <Layout>
      <div className="bg-primary py-16 md:py-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-accent text-sm font-bold uppercase tracking-widest mb-3 block">Global Opportunities</span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-primary-foreground mb-4">International at DIU</h1>
            <p className="text-primary-foreground/75 text-xl max-w-2xl">
              Explore the world through our 100+ international partnerships and exchange programs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <section className="bg-secondary py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/20">
            {internationalStats.map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="font-display font-bold text-4xl text-white mb-1">{stat.value}</div>
                <div className="text-secondary-foreground/75 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exchange Programs */}
      <section className="section-padding bg-background">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-foreground mb-8">Exchange & Study Abroad Programs</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((prog, i) => {
              const Icon = prog.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <h3 className="font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">{prog.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">Duration: {prog.duration}</p>
                  <p className="text-sm text-secondary font-semibold">{prog.spots} spots available</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Universities */}
      <section className="section-padding bg-muted/20">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-foreground mb-8">Partner Universities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {partnerUniversities.map((uni, i) => (
              <motion.div
                key={uni.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border border-border rounded-xl p-5 flex flex-col items-center gap-3 hover:shadow-md hover:border-primary/30 transition-all group text-center"
              >
                <img src={uni.logo} alt={uni.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-border group-hover:ring-primary transition-all grayscale group-hover:grayscale-0" />
                <div>
                  <p className="font-semibold text-sm text-card-foreground group-hover:text-primary transition-colors">{uni.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                    <MapPin size={10} />{uni.country}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa & Info CTA */}
      <section className="bg-primary py-14">
        <div className="container text-center">
          <h2 className="font-display font-bold text-3xl text-primary-foreground mb-4">International Students Welcome</h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">Dedicated support for visa, accommodation, and academic integration for all international students.</p>
          <Button className="bg-accent text-accent-foreground hover:bg-accent-dark hover:text-white font-bold rounded-full px-8 gap-2 shadow-glow">
            Apply as International Student <ArrowRight size={16} />
          </Button>
        </div>
      </section>
    </Layout>
  );
}
