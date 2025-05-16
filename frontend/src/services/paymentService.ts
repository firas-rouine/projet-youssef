
import { toast } from "@/hooks/use-toast";
import { reservationService } from "./reservationService";
import { ReservationStatus } from "@/lib/types";

// Types de paiement disponibles
export type PaymentMethod = "creditCard" | "paypal" | "googlePay" | "applePay" | "bankTransfer" | "cash";

// Interface pour les options de paiement
export interface PaymentOptions {
  reservationId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  cardDetails?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
  };
  paypalEmail?: string;
  bankDetails?: {
    accountNumber: string;
    bankName: string;
  };
}

// Service de paiement simulé
export const paymentService = {
  // Traiter un paiement
  processPayment: async (options: PaymentOptions) => {
    // Simuler une latence réseau
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simuler une réponse de paiement (succès dans 90% des cas)
    const isSuccessful = Math.random() > 0.1;

    if (isSuccessful) {
      // Mettre à jour le statut de la réservation
      await reservationService.updateReservationStatus(options.reservationId, "confirmed");
      
      return {
        success: true,
        transactionId: `trx-${Date.now()}`,
        message: "Paiement traité avec succès",
        date: new Date().toISOString(),
        paymentMethod: options.paymentMethod,
        amount: options.amount,
      };
    } else {
      // Simuler un échec de paiement
      throw new Error("Le paiement a échoué. Veuillez vérifier vos informations et réessayer.");
    }
  },

  // Vérifier la validité d'une carte de crédit (simulation)
  validateCreditCard: (cardNumber: string, expiryDate: string, cvv: string) => {
    // Vérification simplifiée
    const isNumberValid = cardNumber.replace(/\s/g, "").length === 16;
    const isExpiryValid = /^\d{2}\/\d{2}$/.test(expiryDate);
    const isCvvValid = /^\d{3}$/.test(cvv);

    return {
      valid: isNumberValid && isExpiryValid && isCvvValid,
      errors: {
        cardNumber: !isNumberValid ? "Le numéro de carte doit contenir 16 chiffres" : "",
        expiryDate: !isExpiryValid ? "Format de date d'expiration invalide (MM/YY)" : "",
        cvv: !isCvvValid ? "Le CVV doit contenir 3 chiffres" : "",
      },
    };
  },

  // Obtenir les méthodes de paiement disponibles
  getAvailablePaymentMethods: () => {
    return [
      {
        id: "creditCard",
        name: "Carte de crédit",
        description: "Paiement sécurisé par carte bancaire",
        icon: "credit-card",
      },
      {
        id: "paypal",
        name: "PayPal",
        description: "Paiement via votre compte PayPal",
        icon: "paypal",
      },
      {
        id: "googlePay",
        name: "Google Pay",
        description: "Paiement via votre compte Google Pay",
        icon: "google",
      },
      {
        id: "applePay",
        name: "Apple Pay",
        description: "Paiement via votre compte Apple Pay",
        icon: "apple",
      },
      {
        id: "bankTransfer",
        name: "Virement bancaire",
        description: "Paiement par virement bancaire (délai: 1-3 jours)",
        icon: "bank",
      },
      {
        id: "cash",
        name: "Espèces",
        description: "Paiement en espèces lors de la prise du véhicule",
        icon: "banknote",
      },
    ];
  },
};
