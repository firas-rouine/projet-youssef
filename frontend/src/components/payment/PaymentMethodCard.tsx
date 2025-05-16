
import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentMethodCardProps {
  id: string;
  value: string;
  label: string;
  description?: string;
  icon: ReactNode;
  children?: ReactNode;
  isSelected?: boolean;
}

export function PaymentMethodCard({
  id,
  value,
  label,
  description,
  icon,
  children,
  isSelected
}: PaymentMethodCardProps) {
  return (
    <div className={`border rounded-lg p-4 mb-3 cursor-pointer hover:bg-gray-50 ${isSelected ? 'border-autowise-blue bg-gray-50' : ''}`}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={value} id={id} />
        <Label htmlFor={id} className="font-medium flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 text-autowise-blue">
            {icon}
          </span>
          {label}
        </Label>
      </div>
      
      {description && (
        <p className="text-gray-600 text-sm ml-6 mt-2">
          {description}
        </p>
      )}
      
      {children && (
        <div className="mt-3 ml-6">
          {children}
        </div>
      )}
    </div>
  );
}
