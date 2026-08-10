import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import Research from "./pages/Research";
import International from "./pages/International";
import Campus from "./pages/Campus";
import Alumni from "./pages/Alumni";
import News from "./pages/News";
import Forum from "./pages/Forum";
import HelpDesk from "./pages/HelpDesk";
import StudentPortal from "./pages/StudentPortal";
import AdminDashboard from "./pages/AdminDashboard";

export const routers = [
  { path: "/", name: "home", element: <Index /> },
  { path: "/academics", name: "academics", element: <Academics /> },
  { path: "/admissions", name: "admissions", element: <Admissions /> },
  { path: "/research", name: "research", element: <Research /> },
  { path: "/international", name: "international", element: <International /> },
  { path: "/campus", name: "campus", element: <Campus /> },
  { path: "/alumni", name: "alumni", element: <Alumni /> },
  { path: "/news", name: "news", element: <News /> },
  { path: "/forum", name: "forum", element: <Forum /> },
  { path: "/help-desk", name: "helpdesk", element: <HelpDesk /> },
  { path: "/student-portal", name: "studentportal", element: <StudentPortal /> },
  { path: "/admin", name: "admin", element: <AdminDashboard /> },
  /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
  { path: "*", name: "404", element: <NotFound /> },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
