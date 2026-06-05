import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, GraduationCap, BookOpen, FlaskConical } from "lucide-react";
import { stats } from "@/lib/data";

const iconMap = { Users, GraduationCap, BookOpen, FlaskConical };

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 2000;
    const start = Date.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(easeOut(progress) * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [active, target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-primary py-16">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/10">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                className="flex flex-col items-center text-center px-4 py-6 lg:px-8"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-accent" />
                </div>
                <div className="font-display font-bold text-4xl md:text-5xl text-accent mb-2">
                  <CountUp target={stat.value} suffix={stat.suffix} active={isInView} />
                </div>
                <div className="text-primary-foreground/75 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
