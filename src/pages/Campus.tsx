import Layout from "@/components/layout/Layout";
import CampusGallery from "@/components/home/CampusGallery";
import { motion } from "framer-motion";
import { Users, Music, Trophy, Cpu, Coffee, BookOpen } from "lucide-react";

const clubs = [
  { name: "DIU Debate Club", members: 320, icon: Users, category: "Academic" },
  { name: "Cultural Club", members: 450, icon: Music, category: "Cultural" },
  { name: "Sports Club", members: 600, icon: Trophy, category: "Sports" },
  { name: "Robotics Club", members: 280, icon: Cpu, category: "Technical" },
  { name: "Film & Photography Club", members: 190, icon: Coffee, category: "Creative" },
  { name: "Book Club", members: 140, icon: BookOpen, category: "Literary" },
];

const facilities = [
  { name: "Central Library", desc: "100,000+ books, e-journals & digital resources", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Innovation Hub", desc: "State-of-the-art maker space and incubation center", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80" },
  { name: "Student Lounge", desc: "Modern collaborative spaces for student interaction", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80" },
  { name: "Sports Complex", desc: "Football, cricket, badminton, gym, and swimming pool", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80" },
];

export default function Campus() {
  return (
    <Layout>
      <div className="bg-primary py-16 md:py-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-accent text-sm font-bold uppercase tracking-widest mb-3 block">Life at DIU</span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-primary-foreground mb-4">Campus Life</h1>
            <p className="text-primary-foreground/75 text-xl max-w-2xl">
              Vibrant, inclusive, and inspiring—life at DIU is much more than academics.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Facilities */}
      <section className="section-padding bg-background">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-foreground mb-8">Campus Facilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {facilities.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="overflow-hidden h-40">
                  <img src={f.img} alt={f.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-card-foreground mb-1 group-hover:text-primary transition-colors">{f.name}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs */}
      <section className="section-padding bg-muted/20">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-foreground mb-8">Clubs & Organizations</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clubs.map((club, i) => {
              const Icon = club.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center group-hover:bg-secondary transition-colors">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">{club.name}</h3>
                    <p className="text-sm text-muted-foreground">{club.members} members · {club.category}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <CampusGallery />
    </Layout>
  );
}
