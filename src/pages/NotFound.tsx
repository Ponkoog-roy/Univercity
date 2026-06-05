import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: Route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <div className="text-center px-6">
          <div className="text-9xl font-display font-bold text-primary-light mb-4">404</div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">Page Not Found</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-full px-8 gap-2">
                <Home size={16} /> Back to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 gap-2"
            >
              <ArrowLeft size={16} /> Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
