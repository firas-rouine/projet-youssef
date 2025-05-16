
import { Calendar, Gift, CreditCard } from "lucide-react";

interface BookingStepsProps {
  step: number;
}

export function BookingSteps({ step }: BookingStepsProps) {
  return (
    <div className="mt-6 mb-8">
      <div className="relative">
        <div className="absolute left-0 top-[15px] w-full h-1 bg-gray-200">
          <div 
            className="h-full bg-autowise-blue transition-all" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        
        <div className="flex justify-between relative">
          <div className="text-center">
            <div className={`relative z-10 w-10 h-10 flex items-center justify-center mx-auto rounded-full mb-2 ${
              step >= 1 ? "bg-autowise-blue text-white" : "bg-gray-200"
            }`}>
              <Calendar className="h-5 w-5" />
            </div>
            <div className="text-sm">Dates</div>
          </div>
          
          <div className="text-center">
            <div className={`relative z-10 w-10 h-10 flex items-center justify-center mx-auto rounded-full mb-2 ${
              step >= 2 ? "bg-autowise-blue text-white" : "bg-gray-200"
            }`}>
              <Gift className="h-5 w-5" />
            </div>
            <div className="text-sm">Options</div>
          </div>
          
          <div className="text-center">
            <div className={`relative z-10 w-10 h-10 flex items-center justify-center mx-auto rounded-full mb-2 ${
              step >= 3 ? "bg-autowise-blue text-white" : "bg-gray-200"
            }`}>
              <CreditCard className="h-5 w-5" />
            </div>
            <div className="text-sm">Paiement</div>
          </div>
        </div>
      </div>
    </div>
  );
}
