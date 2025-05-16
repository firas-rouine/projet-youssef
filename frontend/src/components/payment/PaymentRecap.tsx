
import { Reservation } from "@/lib/types";

interface PaymentRecapProps {
  reservation: Reservation;
}

export function PaymentRecap({ reservation }: PaymentRecapProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="font-bold mb-4">Récapitulatif</h2>
      
      <div className="space-y-3 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Prix de base</span>
          <span>{reservation.totalPrice} TND</span>
        </div>
        
        {reservation.withDriver && (
          <div className="flex justify-between">
            <span className="text-gray-600">Option chauffeur</span>
            <span>Incluse</span>
          </div>
        )}
        
        {reservation.withChildSeat && (
          <div className="flex justify-between">
            <span className="text-gray-600">Siège enfant</span>
            <span>Inclus</span>
          </div>
        )}
        
        {reservation.withGPS && (
          <div className="flex justify-between">
            <span className="text-gray-600">GPS</span>
            <span>Inclus</span>
          </div>
        )}
        
        <div className="pt-3 border-t border-gray-200">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{reservation.totalPrice} TND</span>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-4">* Le paiement est effectué lors de la prise en charge du véhicule.</p>
    </div>
  );
}
