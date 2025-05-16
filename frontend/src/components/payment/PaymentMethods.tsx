
import { CreditCard, Banknote, Building } from "lucide-react";
import { RadioGroup } from "@/components/ui/radio-group";
import { PaymentMethodCard } from "./PaymentMethodCard";
import { CreditCardForm } from "./CreditCardForm";
import { PaymentMethod } from "@/services/paymentService";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PaymentFormFields {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  paypalEmail: string;
  accountNumber: string;
  bankName: string;
}

interface PaymentMethodsProps {
  selectedMethod: PaymentMethod;
  formFields: PaymentFormFields;
  handleInputChange: (field: keyof PaymentFormFields, value: string) => void;
  onValueChange: (value: string) => void;
}

export function PaymentMethods({
  selectedMethod,
  formFields,
  handleInputChange,
  onValueChange
}: PaymentMethodsProps) {
  return (
    <RadioGroup defaultValue={selectedMethod} value={selectedMethod} onValueChange={onValueChange}>
      {/* Credit Card Option */}
      <PaymentMethodCard
        id="creditCard"
        value="creditCard"
        label="Carte de crédit"
        icon={<CreditCard className="h-5 w-5" />}
        isSelected={selectedMethod === "creditCard"}
      >
        <CreditCardForm
          cardNumber={formFields.cardNumber}
          cardholderName={formFields.cardholderName}
          expiryDate={formFields.expiryDate}
          cvv={formFields.cvv}
          onCardNumberChange={(value) => handleInputChange("cardNumber", value)}
          onCardholderNameChange={(value) => handleInputChange("cardholderName", value)}
          onExpiryDateChange={(value) => handleInputChange("expiryDate", value)}
          onCvvChange={(value) => handleInputChange("cvv", value)}
        />
      </PaymentMethodCard>
      
      {/* Google Pay Option */}
      <PaymentMethodCard
        id="googlePay"
        value="googlePay"
        label="Google Pay"
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 186 189"><path d="M93 0C41.6 0 0 41.6 0 93c0 51.3 41.6 93 93 93 51.3 0 93-41.6 93-93C186 41.6 144.4 0 93 0zm33.9 134.5c-9.8 0-16.9-7.2-16.9-16.9 0-9.8 7.1-17 16.9-17 9.7 0 16.9 7.2 16.9 17 0 9.7-7.2 16.9-16.9 16.9zm-67.8 0c-9.8 0-16.9-7.2-16.9-16.9 0-9.8 7.1-17 16.9-17 9.7 0 16.9 7.2 16.9 17 0 9.7-7.2 16.9-16.9 16.9z" fill="#4285F4"/><path d="M126.9 100.6c-9.8 0-16.9 7.2-16.9 17 0 9.7 7.1 16.9 16.9 16.9 9.7 0 16.9-7.2 16.9-16.9 0-9.8-7.2-17-16.9-17zm-67.8 0c-9.8 0-16.9 7.2-16.9 17 0 9.7 7.1 16.9 16.9 16.9 9.7 0 16.9-7.2 16.9-16.9 0-9.8-7.2-17-16.9-17z" fill="#34A853"/><path d="M59.1 100.6c-9.8 0-16.9 7.2-16.9 17 0 9.7 7.1 16.9 16.9 16.9 9.7 0 16.9-7.2 16.9-16.9 0-9.8-7.2-17-16.9-17z" fill="#FBBC05"/><path d="M59.1 100.6c-9.8 0-16.9 7.2-16.9 17 0 9.7 7.1 16.9 16.9 16.9 9.7 0 16.9-7.2 16.9-16.9 0-9.8-7.2-17-16.9-17z" fill="#EA4335"/></svg>}
        description="Payez rapidement et en toute sécurité avec Google Pay."
        isSelected={selectedMethod === "googlePay"}
      />
      
      {/* Apple Pay Option */}
      <PaymentMethodCard
        id="applePay"
        value="applePay"
        label="Apple Pay"
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 170 170"><path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-0.119-0.972-0.188-1.995-0.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.31 11.45-8.597 4.62-2.253 8.99-3.498 13.1-3.71 0.12 1.083 0.17 2.17 0.17 3.24z" fill="#333"/></svg>}
        description="Payez rapidement et en toute sécurité avec Apple Pay."
        isSelected={selectedMethod === "applePay"}
      />
      
      {/* PayPal Option */}
      <PaymentMethodCard
        id="paypal"
        value="paypal"
        label="PayPal"
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.12 4.15C18.47 4.85 19 6.32 19 8.37c0 4.41-3.3 8.22-8 8.22h-2l-1 5.66h-2l-1-5.66H4l2-11.95h5.5c2.6 0 4.34.4 5.62 1.5z" fill="#3b7bbf" stroke="#3b7bbf"/><path d="M21.12 8.08C22.47 8.78 23 10.25 23 12.3c0 4.41-3.3 8.22-8 8.22h-2l-1 5.66h-2l-1-5.66H8l2-11.95h5.5c2.6 0 4.34.4 5.62 1.5z" fill="#ffffff" stroke="#253b80"/></svg>}
        description="Vous serez redirigé vers PayPal pour finaliser le paiement en toute sécurité."
        isSelected={selectedMethod === "paypal"}
      >
        <div className="space-y-2">
          <Label htmlFor="paypalEmail">Email PayPal</Label>
          <Input
            id="paypalEmail"
            type="email"
            placeholder="email@example.com"
            value={formFields.paypalEmail}
            onChange={(e) => handleInputChange("paypalEmail", e.target.value)}
            required
          />
        </div>
      </PaymentMethodCard>
      
      {/* Bank Transfer Option */}
      <PaymentMethodCard
        id="bankTransfer"
        value="bankTransfer"
        label="Virement"
        icon={<Building className="h-5 w-5" />}
        isSelected={selectedMethod === "bankTransfer"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Numéro de compte</Label>
            <Input
              id="accountNumber"
              placeholder="FR76 1234 5678 9012 3456 7890 123"
              value={formFields.accountNumber}
              onChange={(e) => handleInputChange("accountNumber", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bankName">Nom de la banque</Label>
            <Input
              id="bankName"
              placeholder="Banque Nationale de Tunisie"
              value={formFields.bankName}
              onChange={(e) => handleInputChange("bankName", e.target.value)}
              required
            />
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-700">
            <p className="font-medium">Information importante</p>
            <p>Le véhicule ne sera réservé qu'après confirmation de la réception du paiement (1-3 jours ouvrables).</p>
          </div>
        </div>
      </PaymentMethodCard>
      
      {/* Cash Option */}
      <PaymentMethodCard
        id="cash"
        value="cash"
        label="Espèces"
        icon={<Banknote className="h-5 w-5" />}
        isSelected={selectedMethod === "cash"}
      >
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Paiement en espèces</h3>
          <p className="text-sm text-gray-600 mb-3">
            Vous pourrez payer en espèces lors de la prise du véhicule à notre agence.
          </p>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Adresse : 17 Rue de Carthage, Tunis</li>
            <li>Horaires : 8h30 - 18h00, du lundi au samedi</li>
            <li>Un acompte de 20% peut être demandé pour confirmer la réservation</li>
          </ul>
        </div>
      </PaymentMethodCard>
    </RadioGroup>
  );
}
