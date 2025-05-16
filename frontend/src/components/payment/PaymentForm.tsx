
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { paymentService, PaymentMethod } from "@/services/paymentService";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

// Import components
import { PaymentMethods } from "./PaymentMethods";
import { PaymentStatusDisplay } from "./PaymentStatusDisplay";
import { PaymentIcon } from "./PaymentUtils";
import { usePaymentForm } from "@/hooks/payment/usePaymentForm";

interface PaymentFormProps {
  reservationId: string;
  amount: number;
  onSuccess?: () => void;
}

export function PaymentForm({ reservationId, amount, onSuccess }: PaymentFormProps) {
  const navigate = useNavigate();
  const { 
    selectedMethod, 
    step,
    loading,
    errorMessage,
    formFields,
    handlePaymentMethodChange,
    handleSubmit,
    handleInputChange
  } = usePaymentForm(reservationId, amount, onSuccess);

  // Display appropriate component based on the step
  if (step !== "form") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6 pb-8">
          <PaymentStatusDisplay
            step={step}
            amount={amount}
            errorMessage={errorMessage}
            onRetry={() => navigate(0)}
          />
        </CardContent>
      </Card>
    );
  }

  // Payment form display
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Paiement</CardTitle>
        <CardDescription>Choisissez votre mode de paiement</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="creditCard" value={selectedMethod}>
            <TabsContent value={selectedMethod}>
              <PaymentMethods
                selectedMethod={selectedMethod}
                formFields={formFields}
                handleInputChange={handleInputChange}
                onValueChange={handlePaymentMethodChange}
              />
            </TabsContent>
          </Tabs>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Montant total:</span>
              <span className="font-bold">{amount} TND</span>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => navigate(-1)}>Annuler</Button>
        <Button 
          onClick={handleSubmit} 
          disabled={loading || step !== "form"}
          className="min-w-[120px]"
        >
          {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <PaymentIcon method={selectedMethod} />}
          <span className="ml-2">Payer</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
