
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PaymentStatusDisplayProps {
  step: "processing" | "success" | "error";
  amount: number;
  errorMessage: string;
  onRetry: () => void;
}

export function PaymentStatusDisplay({ 
  step, 
  amount, 
  errorMessage, 
  onRetry 
}: PaymentStatusDisplayProps) {
  const navigate = useNavigate();
  
  // Display during payment processing
  if (step === "processing") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-16 w-16 text-autowise-blue animate-spin" />
        <h3 className="text-xl font-semibold text-center">Traitement en cours</h3>
        <p className="text-center text-gray-500">
          Votre paiement est en cours de traitement. Veuillez ne pas fermer cette fenêtre...
        </p>
      </div>
    );
  }

  // Display after successful payment
  if (step === "success") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-center">Paiement réussi !</h3>
        <p className="text-center text-gray-500">
          Votre paiement de {amount} TND a été traité avec succès.
          <br />
          Un reçu vous a été envoyé par email.
        </p>
        <Button className="mt-4" onClick={() => navigate("/profile")}>
          Voir mes réservations
        </Button>
      </div>
    );
  }

  // Display after payment error
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="rounded-full bg-red-100 p-3">
        <AlertCircle className="h-16 w-16 text-red-600" />
      </div>
      <h3 className="text-xl font-semibold text-center">Échec du paiement</h3>
      <p className="text-center text-gray-500">
        {errorMessage || "Une erreur s'est produite lors du traitement de votre paiement."}
      </p>
      <div className="flex space-x-4">
        <Button variant="outline" onClick={onRetry}>
          Réessayer
        </Button>
        <Button onClick={() => navigate("/profile")}>
          Retour au profil
        </Button>
      </div>
    </div>
  );
}
