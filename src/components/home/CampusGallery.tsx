import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { galleryItems } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = ["All", "Campus", "Sports", "Labs", "Events", "Students"];

export default function CampusGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const filtered = activeCategory === "All" ? galleryItems : galleryItems.filter((g) => g.category === activeCategory);

  const navigate = (dir: number) => {
    if (lightbox === null) return;
    const idx = filtered.findIndex((g) => g.id === lightbox);
    const next = (idx + dir + filtered.length) % filtered.length;
    setLightbox(filtered[next].id);
  };

  const current = lightbox !== null ? filtered.find((g) => g.id === lightbox) : null;

  return (
    <section className="section-padding bg-muted/20" ref={ref}>
      <div className="container">
        <div className="text-center mb-10">
          <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-2 block">Life at DIU</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">Campus Gallery</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Experience the vibrant life of our campus through photos.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                onClick={() => setLightbox(item.id)}
                className={cn(
                  "relative overflow-hidden rounded-xl cursor-pointer group",
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                )}
                style={{ height: i === 0 ? "clamp(180px,26vw,320px)" : "clamp(140px,16vw,200px)" }}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                    <div>
                      <span className="text-white/70 text-xs">{item.category}</span>
                      <p className="text-white font-semibold text-sm">{item.caption}</p>
                    </div>
                    <ZoomIn size={18} className="text-white flex-shrink-0" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <img
                src={current.image}
                alt={current.caption}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              <div className="absolute bottom-4 left-0 right-0 text-center text-white font-medium text-sm">
                {current.caption}
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30"
              >
                <X size={18} />
              </button>
              <button
                onClick={() => navigate(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30"
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
