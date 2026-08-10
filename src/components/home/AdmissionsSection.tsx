import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, ArrowRight, GraduationCap, BookOpen, FlaskConical, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useInView } from "framer-motion";

const steps = [
  { icon: BookOpen, title: "Choose Your Program", description: "Browse 100+ programs across faculties and select the one that fits your goals." },
  { icon: GraduationCap, title: "Check Requirements", description: "Review eligibility criteria, required documents, and minimum GPA requirements." },
  { icon: DollarSign, title: "Review Tuition & Scholarships", description: "Explore financial aid options. Merit scholarships up to 100% waiver available." },
  { icon: FlaskConical, title: "Submit Application", description: "Complete the online application form with required documents and payment." },
  { icon: CheckCircle, title: "Receive Admission Letter", description: "Qualified candidates receive an official admission letter within 7 working days." },
];

const deadlines = [
  { label: "Spring 2026 Last Date", date: "July 31, 2026", urgent: true },
  { label: "Fall 2026 Opens", date: "August 15, 2026", urgent: false },
];

export default function AdmissionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-2 block">Join Us</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">Admissions</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your journey to excellence starts here. Follow our simple admission process.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Steps Timeline */}
          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-5"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && <div className="w-0.5 h-8 bg-border mt-2" />}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={16} className="text-secondary" />
                      <h3 className="font-display font-bold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border border-t-4 border-t-accent rounded-2xl p-8 shadow-lg sticky top-24"
          >
            <h3 className="font-display font-bold text-xl text-card-foreground mb-6">Application Deadlines</h3>

            <div className="space-y-3 mb-8">
              {deadlines.map((d, i) => (
                <div key={i} className={`flex items-center justify-between px-4 py-3 rounded-xl border ${d.urgent ? "bg-accent-light border-accent" : "bg-muted border-border"}`}>
                  <div className="flex items-center gap-2">
                    <Calendar size={15} className={d.urgent ? "text-accent-dark" : "text-muted-foreground"} />
                    <span className={`text-sm font-medium ${d.urgent ? "text-accent-dark" : "text-muted-foreground"}`}>{d.label}</span>
                  </div>
                  <span className={`text-sm font-bold ${d.urgent ? "text-accent-dark" : "text-foreground"}`}>{d.date}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-8 text-sm">
              {[
                ["Minimum Eligibility", "SSC + HSC with required GPA"],
                ["Application Fee", "BDT 1,000 (non-refundable)"],
                ["Language", "IELTS 5.5+ for international"],
                ["Scholarships", "Up to 100% tuition waiver"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>

            <Link to="/admissions">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent-dark hover:text-white font-bold rounded-xl gap-2 py-6 text-base shadow-glow">
                Apply Now — It's Free
                <ArrowRight size={18} />
              </Button>
            </Link>

            <p className="text-center text-xs text-muted-foreground mt-3">
              Questions? <a href="tel:+880-2-9138234" className="text-primary font-medium hover:underline">Call +880-2-9138234</a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
