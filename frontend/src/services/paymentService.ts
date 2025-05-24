import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { reservationService } from "./reservationService";
import { ReservationStatus } from "@/lib/types";

// Strapi API base URL for payments
const PAYMENT_API_URL = "http://localhost:1337/api/payments";

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

export const paymentService = {
  // Traiter un paiement
  processPayment: async (options: PaymentOptions) => {
    try {
      // Verify reservation exists
      const reservation = await reservationService.getReservationById(options.reservationId);
      if (!reservation) {
        throw new Error("Réservation non trouvée. Impossible de traiter le paiement.");
      }

      // Simulate payment gateway (e.g., Stripe, PayPal)
      // In a real app, call an external payment API here
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const isSuccessful = Math.random() > 0.1; // 90% success rate for simulation

      const transactionId = `trx-${Date.now()}`;
      const paymentData = {
        reservation: options.reservationId,
        transactionId,
        amount: options.amount,
        paymentMethod: options.paymentMethod,
        status: isSuccessful ? "success" : "failed",
        date: new Date().toISOString(),
        cardDetails: options.cardDetails,
        paypalEmail: options.paypalEmail,
        bankDetails: options.bankDetails,
      };

      if (isSuccessful) {
        // Create payment record in Strapi
        await axios.post(`${PAYMENT_API_URL}`, {
          data: paymentData,
        });

        // Update reservation status
        await reservationService.updateReservationStatus(options.reservationId, "confirmed");

        toast({
          title: "Paiement réussi",
          description: `Transaction ${transactionId} traitée avec succès.`,
        });

        return {
          success: true,
          transactionId,
          message: "Paiement traité avec succès",
          date: paymentData.date,
          paymentMethod: options.paymentMethod,
          amount: options.amount,
        };
      } else {
        // Create failed payment record
        await axios.post(`${PAYMENT_API_URL}`, {
          data: paymentData,
        });

        throw new Error("Le paiement a échoué. Veuillez vérifier vos informations et réessayer.");
      }
    } catch (error: any) {
      toast({
        title: "Erreur de paiement",
        description: error.message || "Une erreur est survenue lors du traitement du paiement.",
        variant: "destructive",
      });
      throw error;
    }
  },

  // Vérifier la validité d'une carte de crédit
  validateCreditCard: (cardNumber: string, expiryDate: string, cvv: string) => {
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
  getAvailablePaymentMethods: async () => {
    // Optionally fetch from Strapi if payment methods are stored there
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