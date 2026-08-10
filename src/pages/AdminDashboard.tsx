import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, BookOpen, GraduationCap, FileText,
  MessageSquare, HeadphonesIcon, Settings, TrendingUp, TrendingDown,
  Bell, Menu, X, ChevronRight, AlertCircle, CheckCircle, Clock, XCircle
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { adminStats, enrollmentData, applicationFunnelData, recentTickets } from "@/lib/data";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Students", icon: Users },
  { label: "Programs", icon: BookOpen },
  { label: "Admissions", icon: GraduationCap },
  { label: "Content", icon: FileText },
  { label: "Forum", icon: MessageSquare },
  { label: "Help Desk", icon: HeadphonesIcon },
  { label: "Settings", icon: Settings },
];

const statusConfig: Record<string, { color: string; icon: React.ComponentType<{ size?: number }> }> = {
  Open: { color: "bg-accent-light text-accent-dark border-accent/30", icon: AlertCircle },
  "In Progress": { color: "bg-primary-light text-primary border-primary/30", icon: Clock },
  Resolved: { color: "bg-secondary-light text-secondary-dark border-secondary/30", icon: CheckCircle },
  Closed: { color: "bg-muted text-muted-foreground border-border", icon: XCircle },
};

const kpiColors: Record<string, string> = {
  primary: "border-t-primary",
  secondary: "border-t-secondary",
  destructive: "border-t-destructive",
  accent: "border-t-accent",
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("Overview");

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="bg-sidebar text-sidebar-foreground flex-shrink-0 flex flex-col overflow-hidden border-r border-sidebar-border"
      >
        {/* Logo */}
        <div className={cn("flex items-center h-16 px-4 border-b border-sidebar-border gap-3", !sidebarOpen && "justify-center")}>
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <GraduationCap size={16} className="text-sidebar-primary-foreground" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-sidebar-foreground whitespace-nowrap">DIU Admin</div>
              <div className="text-xs text-sidebar-foreground/40">Management Portal</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {sidebarOpen && <p className="text-xs text-sidebar-foreground/30 uppercase font-bold px-3 py-2 tracking-widest">Main Menu</p>}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group",
                  isActive
                    ? "bg-sidebar-primary/15 text-sidebar-primary border-l-2 border-sidebar-primary"
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  !sidebarOpen && "justify-center"
                )}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon size={18} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className={cn("p-3 border-t border-sidebar-border", !sidebarOpen && "flex justify-center")}>
          {sidebarOpen ? (
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center text-xs font-bold text-sidebar-primary-foreground flex-shrink-0">AD</div>
              <div className="overflow-hidden">
                <div className="text-sm font-semibold text-sidebar-foreground whitespace-nowrap">Admin User</div>
                <div className="text-xs text-sidebar-foreground/40 whitespace-nowrap">Super Admin</div>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center text-xs font-bold text-sidebar-primary-foreground">AD</div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div>
              <h1 className="font-display font-bold text-foreground text-lg leading-none">{activeNav}</h1>
              <p className="text-xs text-muted-foreground">DIU Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground">AD</div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              {adminStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={cn("bg-card border border-border border-t-4 rounded-2xl p-5 shadow-sm", kpiColors[stat.color])}
                >
                  <div className="text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-2">{stat.label}</div>
                  <div className="font-display font-bold text-3xl text-foreground mb-2">{stat.value.toLocaleString()}</div>
                  <div className={cn("flex items-center gap-1 text-xs font-semibold", stat.up ? "text-secondary" : "text-destructive")}>
                    {stat.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                    {stat.trend} vs last year
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-5 mb-6">
              {/* Enrollment Trend */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-4">Enrollment Trend 2026</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={enrollmentData}>
                    <defs>
                      <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(220 58% 26%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(220 58% 26%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                    <Area type="monotone" dataKey="students" stroke="hsl(220 58% 26%)" fill="url(#enrollGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Application Funnel */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-4">Application Funnel — Fall 2026</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={applicationFunnelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis type="category" dataKey="stage" width={80} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                    <Bar dataKey="count" fill="hsl(158 100% 21%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Help Desk Tickets */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/20">
                <h3 className="font-semibold text-foreground">Recent Help Desk Tickets</h3>
                <button className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  View All <ChevronRight size={14} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted-foreground bg-muted/10">
                      <th className="px-6 py-3 font-semibold uppercase">Ticket ID</th>
                      <th className="px-6 py-3 font-semibold uppercase">Subject</th>
                      <th className="px-6 py-3 font-semibold uppercase">Category</th>
                      <th className="px-6 py-3 font-semibold uppercase">Status</th>
                      <th className="px-6 py-3 font-semibold uppercase">Date</th>
                      <th className="px-6 py-3 font-semibold uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTickets.map((ticket, i) => {
                      const { color, icon: StatusIcon } = statusConfig[ticket.status];
                      return (
                        <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer">
                          <td className="px-6 py-4 font-mono text-sm font-bold text-primary">{ticket.id}</td>
                          <td className="px-6 py-4 text-sm font-medium text-card-foreground">{ticket.subject}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{ticket.category}</td>
                          <td className="px-6 py-4">
                            <span className={cn("inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border", color)}>
                              <StatusIcon size={10} />
                              {ticket.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{ticket.date}</td>
                          <td className="px-6 py-4">
                            <button className="text-primary text-xs font-semibold hover:underline">Respond</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
