
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-autowise-navy mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oups ! Page introuvable</p>
        <p className="text-gray-500 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={() => window.history.back()} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <Button asChild className="bg-autowise-blue hover:bg-autowise-navy">
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
