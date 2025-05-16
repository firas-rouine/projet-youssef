
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCardNumber } from "./PaymentUtils";

interface CreditCardFormProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  onCardNumberChange: (value: string) => void;
  onCardholderNameChange: (value: string) => void;
  onExpiryDateChange: (value: string) => void;
  onCvvChange: (value: string) => void;
}

export function CreditCardForm({
  cardNumber,
  cardholderName,
  expiryDate,
  cvv,
  onCardNumberChange,
  onCardholderNameChange,
  onExpiryDateChange,
  onCvvChange
}: CreditCardFormProps) {
  // Handle card number input
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    onCardNumberChange(formattedValue);
  };

  // Handle CVV input
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      onCvvChange(value);
    }
  };

  // Handle expiry date input
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    
    if (value.length <= 5) {
      onExpiryDateChange(value);
    }
  };

  return (
    <>
      <div className="mb-4">
        <Label htmlFor="cardholderName">Nom sur la carte</Label>
        <Input
          id="cardholderName"
          placeholder="John Doe"
          value={cardholderName}
          onChange={(e) => onCardholderNameChange(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="cardNumber">Numéro de carte</Label>
        <Input
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={handleCardNumberChange}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiryDate">Date d'expiration</Label>
          <Input
            id="expiryDate"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            placeholder="123"
            value={cvv}
            onChange={handleCvvChange}
            required
            maxLength={3}
          />
        </div>
      </div>
    </>
  );
}
