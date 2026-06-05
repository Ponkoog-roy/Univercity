import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Send, Paperclip, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { faqItems, recentTickets } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = ["Academic", "IT Support", "Financial", "Admissions", "Campus", "Other"];

const statusConfig: Record<string, { color: string; icon: React.ComponentType<{ size?: number }> }> = {
  Open: { color: "bg-accent-light text-accent-dark border-accent/30", icon: AlertCircle },
  "In Progress": { color: "bg-primary-light text-primary border-primary/30", icon: Clock },
  Resolved: { color: "bg-secondary-light text-secondary-dark border-secondary/30", icon: CheckCircle },
  Closed: { color: "bg-muted text-muted-foreground border-border", icon: XCircle },
};

export default function HelpDesk() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchHelp, setSearchHelp] = useState("");
  const [activeTab, setActiveTab] = useState<"faq" | "ticket" | "mytickets">("faq");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const filteredFaq = faqItems.filter((f) =>
    searchHelp === "" || f.question.toLowerCase().includes(searchHelp.toLowerCase())
  );

  return (
    <Layout>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }} className="py-16 md:py-24">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">How can we help?</h1>
            <p className="text-white/75 text-lg mb-8">Search our knowledge base or submit a support ticket.</p>
            <div className="relative max-w-xl mx-auto">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs..."
                value={searchHelp}
                onChange={(e) => setSearchHelp(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-full border-2 border-transparent bg-card text-foreground shadow-xl text-base outline-none focus:border-accent transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-padding bg-background">
        <div className="container">
          {/* Tab Selector */}
          <div className="flex gap-2 mb-8 bg-muted rounded-full p-1 w-fit mx-auto">
            {(["faq", "ticket", "mytickets"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all capitalize",
                  activeTab === tab ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab === "faq" ? "FAQ" : tab === "ticket" ? "New Ticket" : "My Tickets"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* FAQ */}
            {activeTab === "faq" && (
              <motion.div key="faq" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="max-w-3xl mx-auto">
                  <div className="space-y-2">
                    {filteredFaq.map((item) => (
                      <div key={item.id} className="bg-card border border-border rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                        >
                          <div>
                            <span className="text-xs font-semibold text-primary mr-2">[{item.category}]</span>
                            <span className="font-semibold text-card-foreground text-sm">{item.question}</span>
                          </div>
                          <ChevronDown
                            size={16}
                            className={cn("text-muted-foreground flex-shrink-0 ml-3 transition-transform duration-200", openFaq === item.id && "rotate-180")}
                          />
                        </button>
                        <AnimatePresence>
                          {openFaq === item.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-border pt-3">
                                {item.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                    {filteredFaq.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        <Search size={40} className="mx-auto mb-3 opacity-30" />
                        <p>No results for "{searchHelp}"</p>
                        <Button onClick={() => setActiveTab("ticket")} variant="outline" className="mt-4 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                          Submit a Ticket
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* New Ticket */}
            {activeTab === "ticket" && (
              <motion.div key="ticket" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="max-w-2xl mx-auto">
                  {ticketSubmitted ? (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 bg-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} className="text-secondary" />
                      </div>
                      <h3 className="font-display font-bold text-2xl text-foreground mb-2">Ticket Submitted!</h3>
                      <p className="text-muted-foreground mb-2">Your ticket ID is <span className="font-bold text-primary">#TKT-1043</span></p>
                      <p className="text-muted-foreground text-sm mb-6">We'll respond within 24 hours via your registered email.</p>
                      <Button onClick={() => { setTicketSubmitted(false); setActiveTab("mytickets"); }} className="bg-primary text-primary-foreground rounded-full">
                        View My Tickets
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-card border border-border rounded-2xl p-8 shadow-md">
                      <h2 className="font-display font-bold text-2xl text-card-foreground mb-6">Submit a Support Ticket</h2>
                      <div className="space-y-5">
                        <div>
                          <label className="text-sm font-semibold text-foreground mb-1.5 block">Category</label>
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full border border-border rounded-lg px-4 py-2.5 bg-background text-foreground text-sm outline-none focus:border-primary transition-colors"
                          >
                            <option value="">Select a category...</option>
                            {categories.map((c) => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-foreground mb-1.5 block">Subject</label>
                          <input
                            type="text"
                            placeholder="Brief description of your issue"
                            className="w-full border border-border rounded-lg px-4 py-2.5 bg-background text-foreground text-sm outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(27,58,107,0.15)] transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-foreground mb-1.5 block">Description</label>
                          <textarea
                            rows={5}
                            placeholder="Describe your issue in detail..."
                            className="w-full border border-border rounded-lg px-4 py-2.5 bg-background text-foreground text-sm outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(27,58,107,0.15)] transition-all resize-vertical"
                          />
                        </div>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer group">
                          <Paperclip size={20} className="mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                          <p className="text-sm text-muted-foreground">Drag & drop files or <span className="text-primary font-semibold">browse</span></p>
                          <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB</p>
                        </div>
                        <Button
                          onClick={() => setTicketSubmitted(true)}
                          className="w-full bg-primary text-primary-foreground hover:bg-primary-dark font-bold rounded-xl py-6 gap-2 text-base"
                        >
                          <Send size={18} /> Submit Ticket
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* My Tickets */}
            {activeTab === "mytickets" && (
              <motion.div key="mytickets" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-md">
                  <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">My Support Tickets</h3>
                    <span className="text-xs text-muted-foreground">{recentTickets.length} tickets</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border text-left text-xs text-muted-foreground">
                          <th className="px-6 py-3 font-semibold uppercase">Ticket ID</th>
                          <th className="px-6 py-3 font-semibold uppercase">Subject</th>
                          <th className="px-6 py-3 font-semibold uppercase">Category</th>
                          <th className="px-6 py-3 font-semibold uppercase">Status</th>
                          <th className="px-6 py-3 font-semibold uppercase">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTickets.map((ticket, i) => {
                          const { color, icon: StatusIcon } = statusConfig[ticket.status];
                          return (
                            <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer">
                              <td className="px-6 py-4 font-mono text-sm font-medium text-primary">{ticket.id}</td>
                              <td className="px-6 py-4 text-sm text-card-foreground font-medium">{ticket.subject}</td>
                              <td className="px-6 py-4 text-sm text-muted-foreground">{ticket.category}</td>
                              <td className="px-6 py-4">
                                <span className={cn("inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border", color)}>
                                  <StatusIcon size={11} />
                                  {ticket.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-muted-foreground">{ticket.date}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
