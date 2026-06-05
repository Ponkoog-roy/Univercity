import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { alumni, alumniStats } from "@/lib/data";

export default function Alumni() {
  return (
    <Layout>
      <div className="bg-primary py-16 md:py-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-accent text-sm font-bold uppercase tracking-widest mb-3 block">Our Community</span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-primary-foreground mb-4">Alumni Network</h1>
            <p className="text-primary-foreground/75 text-xl max-w-2xl">
              45,000+ alumni shaping industries and communities across 70+ countries worldwide.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <section className="bg-primary-dark py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {alumniStats.map((stat, i) => (
              <div key={i} className="text-center px-6 py-4">
                <div className="font-display font-bold text-3xl text-accent mb-1">{stat.value}</div>
                <div className="text-primary-foreground/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding bg-background">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-foreground mb-8">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {alumni.map((person, i) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all group"
              >
                <Quote size={24} className="text-accent/40 mb-4" />
                <p className="text-muted-foreground italic leading-relaxed mb-6">"{person.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={person.photo} alt={person.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-accent" />
                  <div>
                    <div className="font-bold text-card-foreground text-lg">{person.name}</div>
                    <div className="text-primary font-semibold text-sm">{person.role}, {person.company}</div>
                    <div className="text-muted-foreground text-xs mt-0.5">{person.program} | Class of {person.graduationYear}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="bg-primary-dark py-16">
        <div className="container text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-4">Join the Alumni Network</h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">Connect with 45,000+ graduates, attend exclusive events, and give back to your alma mater.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-accent text-accent-foreground hover:bg-accent-dark hover:text-white font-bold rounded-full px-8 gap-2">
              Register as Alumni <ArrowRight size={16} />
            </Button>
            <Button variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10 rounded-full px-8">
              Alumni Directory
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
