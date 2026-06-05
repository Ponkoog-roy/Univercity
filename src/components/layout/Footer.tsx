import { Link } from "react-router-dom";
import { GraduationCap, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  academics: [
    { label: "Undergraduate Programs", href: "/academics#undergraduate" },
    { label: "Graduate Programs", href: "/academics#graduate" },
    { label: "PhD Programs", href: "/academics#phd" },
    { label: "Short Courses", href: "/academics#short" },
    { label: "Online Learning", href: "/academics#online" },
    { label: "Academic Calendar", href: "/academics#calendar" },
  ],
  students: [
    { label: "Student Portal", href: "/student-portal" },
    { label: "Library", href: "/library" },
    { label: "Exam Results", href: "/results" },
    { label: "Class Routine", href: "/class-routine" },
    { label: "Notice Board", href: "/notices" },
    { label: "Career Center", href: "/careers" },
  ],
  about: [
    { label: "About DIU", href: "/about" },
    { label: "Vice Chancellor's Message", href: "/about#vc" },
    { label: "Mission & Vision", href: "/about#mission" },
    { label: "Accreditation", href: "/about#accreditation" },
    { label: "Rankings", href: "/about#rankings" },
    { label: "Contact Us", href: "/contact" },
  ],
  research: [
    { label: "Research Centers", href: "/research#centers" },
    { label: "Publications", href: "/research#publications" },
    { label: "Funded Projects", href: "/research#projects" },
    { label: "Innovation Hub", href: "/research#innovation" },
    { label: "Journal of DIU", href: "/research#journal" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-xl text-primary-foreground mb-1">
                Stay Updated with DIU
              </h3>
              <p className="text-primary-foreground/60 text-sm">
                Get the latest news, events, and announcements delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 md:w-72 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 outline-none focus:border-accent transition-colors"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent-dark hover:text-primary-foreground font-semibold rounded-full px-6 gap-2 flex-shrink-0">
                Subscribe
                <ArrowRight size={15} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
                <GraduationCap size={22} className="text-accent-foreground" />
              </div>
              <div>
                <div className="text-primary-foreground font-display font-bold text-base leading-tight">
                  Daffodil International
                </div>
                <div className="text-accent text-xs font-bold tracking-widest uppercase">
                  University
                </div>
              </div>
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
              Established in 2002, Daffodil International University is a leading private university in Bangladesh, committed to excellence in education, research, and innovation.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-primary-foreground/60">
                <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span>4/2, Sobhanbag, Mirpur Road, Dhanmondi, Dhaka-1207, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <a href="tel:+880-2-9138234" className="text-primary-foreground/60 hover:text-accent transition-colors">
                  +880-2-9138234
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <a href="mailto:info@diu.edu.bd" className="text-primary-foreground/60 hover:text-accent transition-colors">
                  info@diu.edu.bd
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Youtube, href: "#", label: "YouTube" },
                { Icon: Instagram, href: "#", label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-primary-foreground font-semibold text-sm uppercase tracking-widest mb-4">
              Academics
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.academics.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/55 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-primary-foreground font-semibold text-sm uppercase tracking-widest mb-4">
              Students
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.students.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/55 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-primary-foreground font-semibold text-sm uppercase tracking-widest mb-4">
              About
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/55 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-primary-foreground font-semibold text-sm uppercase tracking-widest mb-4">
              Research
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.research.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/55 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-primary-foreground/40 text-sm">
            © 2026 Daffodil International University. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Sitemap", "Accessibility"].map((item) => (
              <a key={item} href="#" className="text-xs text-primary-foreground/40 hover:text-accent transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
