
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function NotFoundMessage() {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto max-w-3xl px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Réservation introuvable</h1>
      <p className="mb-6">La réservation que vous recherchez n'existe pas ou a été supprimée.</p>
      <Button 
        onClick={() => navigate("/profile")}
        className="bg-autowise-blue text-white px-4 py-2 rounded-md hover:bg-autowise-navy"
      >
        Retour au profil
      </Button>
    </div>
  );
}
