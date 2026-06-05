import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, LayoutDashboard, Library, Calendar, FileText, Bell, Briefcase, Building2 } from "lucide-react";
import { studentServices } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  LayoutDashboard, Library, Calendar, FileText, Bell, Briefcase, Building2,
  HeadphonesIcon: Bell,
};

export default function StudentServices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="section-padding bg-muted/30" ref={ref}>
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-2 block">Student Support</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Student Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to succeed academically and personally—all in one place.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {studentServices.map((service, i) => {
            const Icon = iconMap[service.icon] || LayoutDashboard;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  to={service.link}
                  className="block bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:bg-primary-light hover:border-primary/30 transition-all duration-200 group h-full"
                >
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-5 group-hover:bg-secondary transition-colors duration-200">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-card-foreground text-base mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                    Access <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
