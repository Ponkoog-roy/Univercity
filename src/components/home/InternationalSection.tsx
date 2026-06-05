import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { partnerUniversities, internationalStats } from "@/lib/data";

export default function InternationalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-2 block">Global Reach</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
              International Partnerships
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Collaborating with world-class universities across 50+ countries to provide global education opportunities.
            </p>
          </div>
          <Link to="/international">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full gap-2">
              View All Partners <ArrowRight size={15} />
            </Button>
          </Link>
        </div>

        {/* Partner Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {partnerUniversities.map((uni, i) => (
            <motion.div
              key={uni.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: i * 0.05, ease: "backOut" }}
              className="bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-primary/30 transition-all duration-200 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary transition-all">
                <img src={uni.logo} alt={uni.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-card-foreground group-hover:text-primary transition-colors leading-tight">{uni.name}</p>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-0.5">
                  <Globe size={10} />
                  {uni.country}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="bg-secondary-light border border-secondary/20 rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-secondary/20">
            {internationalStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center px-4"
              >
                <div className="font-display font-bold text-3xl text-secondary mb-1">{stat.value}</div>
                <div className="text-sm text-secondary-dark/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
