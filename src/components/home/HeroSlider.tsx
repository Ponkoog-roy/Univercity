import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/lib/data";
import { cn } from "@/lib/utils";

const SLIDE_INTERVAL = 6000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
    setProgress(0);
  }, []);

  const prev = () => goTo((current - 1 + heroSlides.length) % heroSlides.length, -1);
  const next = useCallback(() => goTo((current + 1) % heroSlides.length, 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const rafId = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / SLIDE_INTERVAL) * 100, 100));
      if (elapsed < SLIDE_INTERVAL) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(rafId);
  }, [current]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 0 }),
  };

  return (
    <section
      className="relative overflow-hidden bg-primary-dark"
      style={{ height: "clamp(480px, 85vh, 720px)" }}
      aria-label="Hero announcements"
      aria-live="polite"
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{
              backgroundImage: `url(${heroSlides[current].image})`,
              animation: "subtle-zoom 6s ease-out forwards",
            }}
          />
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "var(--gradient-hero)" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-2xl"
            >
              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-block bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide"
              >
                {heroSlides[current].badge}
              </motion.span>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-5"
                style={{ letterSpacing: "-0.02em" }}
              >
                {heroSlides[current].title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
              >
                {heroSlides[current].subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/admissions">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent-dark hover:text-white font-bold rounded-full px-8 shadow-glow transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    {heroSlides[current].ctaPrimary}
                  </Button>
                </Link>
                <Link to="/academics">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/70 text-white bg-transparent hover:bg-white/15 font-semibold rounded-full px-8 backdrop-blur-sm transition-all duration-200"
                  >
                    {heroSlides[current].ctaSecondary}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <button
          onClick={prev}
          className="pointer-events-auto w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-150 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => next()}
          className="pointer-events-auto w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-150 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx, idx > current ? 1 : -1)}
            aria-label={`Go to slide ${idx + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300 ease-out",
              idx === current ? "bg-accent w-6" : "bg-white/40 hover:bg-white/60 w-2"
            )}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <div
          className="h-full bg-accent transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-8 z-20 hidden md:flex flex-col items-center gap-1.5">
        <span className="text-white/40 text-xs font-medium tracking-widest uppercase rotate-90 translate-y-3">Scroll</span>
        <div className="w-0.5 h-8 bg-white/20 rounded-full overflow-hidden">
          <div className="w-full h-4 bg-accent rounded-full animate-scroll-bounce" />
        </div>
      </div>

      <style>{`
        @keyframes subtle-zoom {
          from { transform: scale(1.05); }
          to   { transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
