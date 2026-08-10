import { motion } from "framer-motion";
import { CheckCircle, Calendar, Download, Phone, ArrowRight, BookOpen, GraduationCap, FlaskConical, DollarSign, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const requirements = [
  { level: "Undergraduate", degree: "SSC & HSC / O-Level & A-Level", gpa: "Min. 2.50 in both SSC & HSC", extra: "No 3rd Division" },
  { level: "Graduate", degree: "Bachelor's Degree", gpa: "Min. CGPA 2.50 / 2nd Class", extra: "From recognized university" },
  { level: "PhD", degree: "Master's Degree", gpa: "Min. CGPA 3.00", extra: "Research proposal required" },
];

const scholarships = [
  { title: "Merit Scholarship", discount: "100%", criteria: "SSC+HSC GPA 10.00 (A+ in both)" },
  { title: "Merit Scholarship", discount: "75%", criteria: "SSC+HSC GPA 9.50+" },
  { title: "Merit Scholarship", discount: "50%", criteria: "SSC+HSC GPA 9.00+" },
  { title: "Merit Scholarship", discount: "25%", criteria: "SSC+HSC GPA 8.50+" },
  { title: "Need-Based Aid", discount: "Varies", criteria: "Financial need demonstration" },
  { title: "Sports Scholarship", discount: "50%", criteria: "National/International sports achievement" },
];

const tuition = [
  { program: "Computer Science & Engineering", perCredit: "3,200", total: "512,000" },
  { program: "Business Administration (BBA)", perCredit: "2,800", total: "364,000" },
  { program: "EEE / Civil / Textile Engineering", perCredit: "3,000", total: "480,000" },
  { program: "Law & Justice", perCredit: "2,500", total: "350,000" },
  { program: "MBA", perCredit: "3,500", total: "210,000" },
];

const timeline = [
  { date: "Jun 1 – Jul 31", event: "Spring 2026 Application Window", active: true },
  { date: "Aug 1 – Aug 15", event: "Document Verification" },
  { date: "Aug 20", event: "Merit List Publication" },
  { date: "Sep 1 – Sep 15", event: "Admission Confirmation & Fee Payment" },
  { date: "Sep 22", event: "Orientation Day" },
  { date: "Sep 29", event: "Classes Begin" },
];

export default function Admissions() {
  return (
    <Layout>
      {/* Hero */}
      <div className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-accent text-sm font-bold uppercase tracking-widest mb-3 block">Join DIU</span>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-primary-foreground mb-4">
                Admissions 2026
              </h1>
              <p className="text-primary-foreground/75 text-xl mb-8">
                Begin your journey at Bangladesh's leading private university. Applications are now open for Spring 2026.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-accent text-accent-foreground hover:bg-accent-dark hover:text-white font-bold rounded-full px-8 gap-2 shadow-glow">
                  Apply Online Now <ArrowRight size={16} />
                </Button>
                <Button variant="outline" className="border-white/40 text-white bg-transparent hover:bg-white/10 rounded-full px-8 gap-2">
                  <Download size={16} /> Download Prospectus
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <section id="requirements" className="section-padding bg-background">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-foreground mb-8">Admission Requirements</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {requirements.map((req, i) => {
              const Icon = i === 0 ? BookOpen : i === 1 ? GraduationCap : FlaskConical;
              return (
                <motion.div
                  key={req.level}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-card-foreground mb-3">{req.level}</h3>
                  <ul className="space-y-2">
                    {[req.degree, req.gpa, req.extra].map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle size={15} className="text-secondary mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section id="scholarships" className="section-padding bg-muted/20">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-2 block">Financial Aid</span>
              <h2 className="font-display font-bold text-3xl text-foreground">Scholarships & Waivers</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scholarships.map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all group hover:border-accent">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-card-foreground">{s.title}</span>
                  <span className="bg-accent-light text-accent-dark text-lg font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={14} /> {s.discount}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{s.criteria}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tuition */}
      <section id="tuition" className="section-padding bg-background">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-foreground mb-8">Tuition Fees (BDT)</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md">
            <table className="w-full">
              <thead>
                <tr className="bg-muted text-muted-foreground text-sm border-b border-border">
                  <th className="text-left px-6 py-4 font-semibold">Program</th>
                  <th className="text-right px-6 py-4 font-semibold">Per Credit (BDT)</th>
                  <th className="text-right px-6 py-4 font-semibold">Total (Approx.)</th>
                </tr>
              </thead>
              <tbody>
                {tuition.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-card-foreground font-medium text-sm">{row.program}</td>
                    <td className="px-6 py-4 text-right text-muted-foreground text-sm">{row.perCredit}</td>
                    <td className="px-6 py-4 text-right font-bold text-foreground text-sm">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">* Fees are subject to change. Contact the Finance Office for exact figures.</p>
        </div>
      </section>

      {/* Timeline */}
      <section id="calendar" className="section-padding bg-muted/20">
        <div className="container">
          <h2 className="font-display font-bold text-3xl text-foreground mb-8">Admission Calendar — Spring 2026</h2>
          <div className="max-w-2xl">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-5 mb-6">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.active ? "bg-accent text-accent-foreground animate-pulse-glow" : "bg-muted border border-border"}`}>
                    <Calendar size={16} className={item.active ? "text-accent-foreground" : "text-muted-foreground"} />
                  </div>
                  {i < timeline.length - 1 && <div className="w-0.5 h-8 bg-border mt-2" />}
                </div>
                <div className="pb-2">
                  <div className={`text-sm font-bold mb-0.5 ${item.active ? "text-accent" : "text-muted-foreground"}`}>{item.date}</div>
                  <div className={`font-semibold ${item.active ? "text-foreground" : "text-muted-foreground"}`}>{item.event}</div>
                  {item.active && <span className="text-xs bg-accent/15 text-accent-dark px-2 py-0.5 rounded-full font-medium mt-1 inline-block">Now Open</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary-foreground mb-4">Ready to Apply?</h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
            Join 50,000+ students building the future at Daffodil International University.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-accent text-accent-foreground hover:bg-accent-dark hover:text-white font-bold rounded-full px-10 gap-2 shadow-glow text-base py-6">
              Start Application <ArrowRight size={18} />
            </Button>
            <a href="tel:+880-2-9138234">
              <Button variant="outline" className="border-white/40 text-white bg-transparent hover:bg-white/10 rounded-full px-8 gap-2 text-base py-6">
                <Phone size={16} /> Call Admissions Office
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
