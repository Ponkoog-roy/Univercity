import { motion } from "framer-motion";
import { LayoutDashboard, GraduationCap, Calendar, FileText, Bell, Briefcase, Library, User, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "My Dashboard", icon: LayoutDashboard, color: "bg-primary", href: "#" },
  { label: "Class Routine", icon: Calendar, color: "bg-secondary", href: "#" },
  { label: "Exam Results", icon: FileText, color: "bg-accent", href: "#" },
  { label: "Library", icon: Library, color: "bg-purple-600", href: "#" },
  { label: "Notices", icon: Bell, color: "bg-orange-500", href: "#" },
  { label: "Internships", icon: Briefcase, color: "bg-pink-600", href: "#" },
];

const recentResults = [
  { course: "Data Structures & Algorithms", code: "CSE-301", grade: "A+", credits: 3 },
  { course: "Database Management Systems", code: "CSE-302", grade: "A", credits: 3 },
  { course: "Computer Networks", code: "CSE-303", grade: "A-", credits: 3 },
  { course: "Operating Systems", code: "CSE-304", grade: "B+", credits: 3 },
];

const gradeColors: Record<string, string> = {
  "A+": "text-secondary font-bold",
  "A": "text-secondary",
  "A-": "text-primary",
  "B+": "text-accent-dark",
};

export default function StudentPortal() {
  return (
    <Layout>
      {/* Banner */}
      <div className="bg-primary py-10">
        <div className="container flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center">
              <User size={26} className="text-accent-foreground" />
            </div>
            <div>
              <div className="text-accent text-xs font-semibold uppercase tracking-wide">Welcome back</div>
              <h1 className="font-display font-bold text-2xl text-primary-foreground">Md. Rahim Uddin</h1>
              <div className="text-primary-foreground/60 text-sm">ID: 221-15-5678 · CSE (7th Semester)</div>
            </div>
          </div>
          <Button variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10 gap-2 rounded-full">
            <LogOut size={15} /> Logout
          </Button>
        </div>
      </div>

      <div className="section-padding bg-background">
        <div className="container">
          {/* Quick Links */}
          <h2 className="font-display font-bold text-2xl text-foreground mb-6">Quick Access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {quickLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={i}
                  href={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all group text-center"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${link.color} group-hover:scale-110 transition-transform`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <span className="text-xs font-semibold text-card-foreground group-hover:text-primary transition-colors">{link.label}</span>
                </motion.a>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Results */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/20">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={18} className="text-primary" />
                    <h3 className="font-semibold text-foreground">Recent Results — Semester 7</h3>
                  </div>
                  <span className="text-xs text-muted-foreground">CGPA: <span className="font-bold text-secondary text-sm">3.82</span></span>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-muted-foreground border-b border-border">
                      <th className="text-left px-6 py-3 font-semibold">Course</th>
                      <th className="text-center px-4 py-3 font-semibold">Credits</th>
                      <th className="text-center px-4 py-3 font-semibold">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentResults.map((r, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-3">
                          <div className="font-medium text-sm text-card-foreground">{r.course}</div>
                          <div className="text-xs text-muted-foreground">{r.code}</div>
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-muted-foreground">{r.credits}</td>
                        <td className={`px-4 py-3 text-center text-base ${gradeColors[r.grade] || "text-foreground"}`}>{r.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notices & Upcoming */}
            <div className="space-y-5">
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border bg-muted/20 flex items-center gap-2">
                  <Bell size={16} className="text-primary" />
                  <h3 className="font-semibold text-foreground text-sm">Latest Notices</h3>
                </div>
                <div className="p-4 space-y-2">
                  {[
                    "Mid-term exam schedule published",
                    "Library fine waiver until June 30",
                    "Career fair registration open",
                    "Convocation 2026 registration",
                  ].map((notice, i) => (
                    <div key={i} className="flex items-start gap-2 py-2 border-b border-border last:border-0 cursor-pointer group">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-card-foreground group-hover:text-primary transition-colors line-clamp-2">{notice}</span>
                      <ChevronRight size={14} className="text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-primary" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-accent-light border border-accent/30 rounded-2xl p-5">
                <h3 className="font-semibold text-accent-dark mb-2 flex items-center gap-2">
                  <Bell size={16} />
                  Upcoming Deadline
                </h3>
                <p className="text-accent-dark/80 text-sm mb-3">Semester 8 course registration closes on July 15, 2026.</p>
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent-dark hover:text-white font-semibold rounded-full w-full">
                  Register Courses
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
