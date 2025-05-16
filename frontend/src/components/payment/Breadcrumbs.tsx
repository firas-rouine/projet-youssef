
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Breadcrumbs() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center text-sm text-gray-500 mb-6">
      <span className="hover:text-autowise-blue cursor-pointer" onClick={() => navigate("/")}>
        Accueil
      </span>
      <ChevronRight className="h-4 w-4 mx-2" />
      <span className="hover:text-autowise-blue cursor-pointer" onClick={() => navigate("/profile")}>
        Profil
      </span>
      <ChevronRight className="h-4 w-4 mx-2" />
      <span className="text-gray-700 font-medium">
        Paiement
      </span>
    </div>
  );
}
