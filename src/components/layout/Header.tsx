import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Search, Menu, X, Sun, Moon, ChevronDown, Phone, Mail,
  GraduationCap, BookOpen, FlaskConical, Globe, Users, Building2,
  Cpu, Briefcase, LogIn, UserPlus, Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Admissions",
    href: "/admissions",
    mega: true,
    columns: [
      {
        title: "Apply",
        links: [
          { label: "Undergraduate Admission", href: "/admissions#undergraduate", icon: GraduationCap },
          { label: "Graduate Admission", href: "/admissions#graduate", icon: BookOpen },
          { label: "PhD Programs", href: "/admissions#phd", icon: FlaskConical },
          { label: "International Students", href: "/international", icon: Globe },
        ],
      },
      {
        title: "Information",
        links: [
          { label: "Admission Requirements", href: "/admissions#requirements", icon: BookOpen },
          { label: "Tuition & Fees", href: "/admissions#tuition", icon: Briefcase },
          { label: "Scholarships", href: "/admissions#scholarships", icon: GraduationCap },
          { label: "Admission Calendar", href: "/admissions#calendar", icon: Building2 },
        ],
      },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    mega: true,
    columns: [
      {
        title: "Programs",
        links: [
          { label: "Undergraduate Programs", href: "/academics#undergraduate", icon: GraduationCap },
          { label: "Graduate Programs", href: "/academics#graduate", icon: BookOpen },
          { label: "Short Courses", href: "/academics#short", icon: Cpu },
          { label: "Online Courses", href: "/academics#online", icon: Globe },
        ],
      },
      {
        title: "Faculties",
        links: [
          { label: "Science & Information Technology", href: "/academics#sit", icon: Cpu },
          { label: "Business School", href: "/academics#business", icon: Briefcase },
          { label: "Engineering", href: "/academics#engineering", icon: Building2 },
          { label: "Allied Health Sciences", href: "/academics#health", icon: Users },
        ],
      },
    ],
  },
  { label: "Research", href: "/research" },
  { label: "Campus", href: "/campus" },
  { label: "International", href: "/international" },
  { label: "Alumni", href: "/alumni" },
  { label: "News", href: "/news" },
  {
    label: "Community",
    href: "/forum",
    mega: false,
    dropdown: [
      { label: "Forum", href: "/forum", icon: Users },
      { label: "Help Desk", href: "/help-desk", icon: Phone },
    ],
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMega(null);
  }, [location]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-dark text-primary-foreground text-xs py-2 hidden md:block">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+880-2-9138234" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Phone size={12} />
              <span>+880-2-9138234</span>
            </a>
            <a href="mailto:info@diu.edu.bd" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Mail size={12} />
              <span>info@diu.edu.bd</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary-foreground/60">Spring Semester 2026 Admission Open</span>
            <Link to="/admissions" className="text-accent font-semibold hover:underline">Apply Now →</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 bg-primary transition-all duration-300",
          scrolled ? "shadow-xl py-0" : "py-0"
        )}
        onMouseLeave={() => setActiveMega(null)}
      >
        <div className="container">
          <div className={cn(
            "flex items-center justify-between transition-all duration-300",
            scrolled ? "h-14" : "h-16 md:h-[4.5rem]"
          )}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-glow">
                <GraduationCap size={22} className="text-accent-foreground" />
              </div>
              <div className="hidden sm:block">
                <div className="text-primary-foreground font-display font-bold text-lg leading-tight">
                  Daffodil International
                </div>
                <div className="text-accent text-xs font-semibold tracking-wider uppercase">
                  University
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.mega || item.dropdown ? (
                    <button
                      className={cn(
                        "university-nav-link flex items-center gap-1 px-3 py-2 text-sm font-medium text-primary-foreground/90 hover:text-accent rounded-md transition-colors",
                        activeMega === item.label && "text-accent"
                      )}
                      onMouseEnter={() => setActiveMega(item.label)}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={cn("transition-transform duration-200", activeMega === item.label && "rotate-180")}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "university-nav-link px-3 py-2 text-sm font-medium text-primary-foreground/90 hover:text-accent rounded-md transition-colors block",
                        location.pathname === item.href && "text-accent active"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.dropdown && activeMega === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 bg-card border border-border rounded-xl shadow-xl p-2 min-w-[200px] z-50"
                      >
                        {item.dropdown.map((link) => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.label}
                              to={link.href}
                              className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-primary-light hover:text-primary rounded-lg transition-colors"
                            >
                              <Icon size={15} className="text-primary" />
                              {link.label}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Utility Nav */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <AnimatePresence mode="wait">
                {searchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search programs, news..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={() => { setSearchOpen(false); setSearchQuery(""); }}
                      className="w-full bg-primary-light/20 text-primary-foreground placeholder:text-primary-foreground/50 border border-primary-foreground/20 rounded-full px-4 py-1.5 text-sm outline-none focus:border-accent"
                    />
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-primary-foreground/80 hover:text-accent transition-colors"
                    aria-label="Search"
                  >
                    <Search size={18} />
                  </button>
                )}
              </AnimatePresence>

              {/* Dark mode */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-primary-foreground/80 hover:text-accent transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Notifications */}
              <button className="hidden sm:flex relative p-2 text-primary-foreground/80 hover:text-accent transition-colors">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
              </button>

              {/* Login */}
              <Link to="/student-portal" className="hidden lg:block">
                <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10 gap-1.5">
                  <LogIn size={15} />
                  Login
                </Button>
              </Link>

              {/* Apply CTA */}
              <Link to="/admissions">
                <Button
                  size="sm"
                  className="hidden sm:flex bg-accent text-accent-foreground hover:bg-accent-dark hover:text-primary-foreground font-semibold rounded-full gap-1.5 transition-all duration-200 shadow-glow"
                >
                  <UserPlus size={15} />
                  <span className="hidden md:block">Apply Now</span>
                </Button>
              </Link>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(true)}
                className="xl:hidden p-2 text-primary-foreground hover:text-accent transition-colors"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {navItems.map((item) =>
            item.mega && activeMega === item.label ? (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 right-0 bg-card border-t-4 border-accent shadow-xl z-40"
                onMouseEnter={() => setActiveMega(item.label)}
              >
                <div className="container py-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {item.columns?.map((col) => (
                      <div key={col.title}>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                          {col.title}
                        </h3>
                        <ul className="space-y-1">
                          {col.links.map((link) => {
                            const Icon = link.icon;
                            return (
                              <li key={link.label}>
                                <Link
                                  to={link.href}
                                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-primary-light hover:text-primary rounded-lg transition-all group"
                                >
                                  <Icon size={15} className="text-primary group-hover:text-secondary transition-colors flex-shrink-0" />
                                  <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                    {/* Featured Card */}
                    <div className="col-span-2 bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 text-primary-foreground">
                      <div className="text-accent text-xs font-bold uppercase tracking-widest mb-2">Quick Apply</div>
                      <h3 className="font-display font-bold text-xl mb-2">Start Your Journey Today</h3>
                      <p className="text-primary-foreground/75 text-sm mb-4">Spring 2026 admission is now open. Limited seats available for all programs.</p>
                      <Link to="/admissions">
                        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent-dark hover:text-primary-foreground font-semibold rounded-full">
                          Apply Now →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-primary-dark z-50 overflow-y-auto xl:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-primary-foreground/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                    <GraduationCap size={18} className="text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-primary-foreground font-bold text-sm leading-tight">Daffodil International</div>
                    <div className="text-accent text-xs font-semibold">University</div>
                  </div>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-2 text-primary-foreground/60 hover:text-primary-foreground">
                  <X size={20} />
                </button>
              </div>

              <nav className="p-4 space-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        location.pathname === item.href
                          ? "bg-accent/20 text-accent"
                          : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 mt-1 space-y-0.5">
                        {item.dropdown.map((link) => (
                          <Link
                            key={link.label}
                            to={link.href}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="p-4 border-t border-primary-foreground/10 space-y-3">
                <Link to="/student-portal" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2">
                    <LogIn size={15} />
                    Student Login
                  </Button>
                </Link>
                <Link to="/admissions" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent-dark hover:text-primary-foreground font-semibold gap-2">
                    <UserPlus size={15} />
                    Apply Now
                  </Button>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
