
import { Button } from "@/components/ui/button";
import { Check, AlertTriangle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PaymentStatusProps {
  status: "pending" | "success" | "error";
  reservationId?: string;
  setPaymentStatus?: (status: "pending" | "success" | "error") => void;
}

export function PaymentStatus({ status, reservationId, setPaymentStatus }: PaymentStatusProps) {
  const navigate = useNavigate();

  if (status === "pending") {
    return (
      <>
        <h1 className="text-2xl font-bold mb-1">Traitement du paiement</h1>
        <p className="text-gray-500 mb-6">Veuillez patienter pendant que nous traitons votre paiement...</p>
        
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-sm">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-autowise-blue mb-4"></div>
          <p className="text-lg font-medium">Traitement en cours</p>
          <p className="text-gray-500">Ne fermez pas cette page</p>
        </div>
      </>
    );
  }

  if (status === "success") {
    // Redirection vers la nouvelle page de confirmation de réservation
    setTimeout(() => {
      navigate(`/booking-success/${reservationId}`);
    }, 1000);
    
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b bg-green-50 flex items-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-green-600">Paiement réussi!</h1>
            <p className="text-gray-600">Vous allez être redirigé vers la page de confirmation...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b bg-red-50 flex items-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-red-600">Erreur de paiement</h1>
            <p className="text-gray-600">Votre paiement n'a pas pu être traité.</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Que faire maintenant ?</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-4">
              <li>Vérifiez les informations de votre carte</li>
              <li>Assurez-vous que votre carte est bien activée pour les achats en ligne</li>
              <li>Essayez avec une autre méthode de paiement</li>
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => setPaymentStatus?.("pending")}
              className="bg-autowise-blue hover:bg-autowise-navy"
            >
              Réessayer
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/booking")}
            >
              Modifier ma réservation
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
