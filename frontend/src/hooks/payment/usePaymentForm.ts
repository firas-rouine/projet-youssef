
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paymentService, PaymentMethod } from "@/services/paymentService";
import { toast } from "@/hooks/use-toast";

type PaymentStep = "form" | "processing" | "success" | "error";

interface PaymentFormFields {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  paypalEmail: string;
  accountNumber: string;
  bankName: string;
}

export function usePaymentForm(reservationId: string, amount: number, onSuccess?: () => void) {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("creditCard");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<PaymentStep>("form");
  const [errorMessage, setErrorMessage] = useState("");
  
  // State for form fields
  const [formFields, setFormFields] = useState<PaymentFormFields>({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    paypalEmail: "",
    accountNumber: "",
    bankName: "",
  });

  // Handle payment method change
  const handlePaymentMethodChange = (value: string) => {
    setSelectedMethod(value as PaymentMethod);
  };

  // Generic input field handler
  const handleInputChange = (field: keyof PaymentFormFields, value: string) => {
    setFormFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Submit payment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStep("processing");

    // Validation according to payment method
    if (selectedMethod === "creditCard") {
      const validation = paymentService.validateCreditCard(
        formFields.cardNumber, 
        formFields.expiryDate, 
        formFields.cvv
      );
      
      if (!validation.valid) {
        let errorMsg = "Veuillez vérifier vos informations de carte:";
        if (validation.errors.cardNumber) errorMsg += ` ${validation.errors.cardNumber}.`;
        if (validation.errors.expiryDate) errorMsg += ` ${validation.errors.expiryDate}.`;
        if (validation.errors.cvv) errorMsg += ` ${validation.errors.cvv}.`;
        
        setErrorMessage(errorMsg);
        setLoading(false);
        setStep("error");
        return;
      }
    } else if (selectedMethod === "paypal" && !formFields.paypalEmail) {
      setErrorMessage("Veuillez entrer votre adresse e-mail PayPal.");
      setLoading(false);
      setStep("error");
      return;
    } else if (selectedMethod === "bankTransfer" && (!formFields.accountNumber || !formFields.bankName)) {
      setErrorMessage("Veuillez entrer toutes les informations bancaires.");
      setLoading(false);
      setStep("error");
      return;
    }

    // Prepare payment data
    const paymentData: any = {
      reservationId,
      amount,
      paymentMethod: selectedMethod,
    };

    // Add method-specific details
    if (selectedMethod === "creditCard") {
      Object.assign(paymentData, {
        cardDetails: {
          cardNumber: formFields.cardNumber.replace(/\s/g, ""),
          expiryDate: formFields.expiryDate,
          cvv: formFields.cvv,
          cardholderName: formFields.cardholderName,
        },
      });
    } else if (selectedMethod === "paypal") {
      Object.assign(paymentData, {
        paypalEmail: formFields.paypalEmail,
      });
    } else if (selectedMethod === "bankTransfer") {
      Object.assign(paymentData, {
        bankDetails: {
          accountNumber: formFields.accountNumber,
          bankName: formFields.bankName,
        },
      });
    }

    try {
      // Process payment
      await paymentService.processPayment(paymentData);
      
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStep("success");
      toast({
        title: "Paiement réussi",
        description: `Votre paiement de ${amount} TND a été traité avec succès.`,
      });
      
      // Call success callback or redirect
      if (onSuccess) {
        onSuccess();
      } else {
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch (error) {
      console.error("Erreur de paiement:", error);
      setErrorMessage(error instanceof Error ? error.message : "Une erreur est survenue lors du traitement de votre paiement.");
      setStep("error");
      toast({
        title: "Échec du paiement",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors du traitement de votre paiement.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedMethod,
    step,
    loading,
    errorMessage,
    formFields,
    handlePaymentMethodChange,
    handleSubmit,
    handleInputChange
  };
}
