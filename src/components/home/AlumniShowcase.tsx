import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { alumni, alumniStats } from "@/lib/data";

export default function AlumniShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="section-padding bg-primary-dark" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-accent text-sm font-bold uppercase tracking-widest mb-2 block">Our Pride</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
              Alumni Success Stories
            </h2>
          </div>
          <Link to="/alumni">
            <Button variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10 rounded-full gap-2">
              Join Alumni Network <ArrowRight size={15} />
            </Button>
          </Link>
        </div>

        {/* Alumni Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {alumni.map((person, i) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-white/6 border border-white/12 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 hover:border-accent transition-all duration-200 group"
            >
              {/* Quote icon */}
              <Quote size={20} className="text-accent/50 mb-4" />

              {/* Quote */}
              <p className="text-white/70 text-sm italic leading-relaxed mb-5 line-clamp-3">
                "{person.quote}"
              </p>

              {/* Person */}
              <div className="flex items-center gap-3">
                <img
                  src={person.photo}
                  alt={person.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-accent"
                />
                <div>
                  <div className="text-white font-semibold text-sm">{person.name}</div>
                  <div className="text-accent text-xs font-medium">{person.role}</div>
                  <div className="text-white/50 text-xs">{person.company}</div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs bg-accent/15 text-accent px-2 py-0.5 rounded-full font-medium">
                  {person.program} '{person.graduationYear.toString().slice(2)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alumni Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {alumniStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="text-center bg-white/5 border border-white/10 rounded-xl p-5"
            >
              <div className="font-display font-bold text-3xl text-accent mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
