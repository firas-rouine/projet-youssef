
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Fuel } from "lucide-react";

interface FuelGaugeProps {
  fuelLevel: number;
}

export function FuelGauge({ fuelLevel }: FuelGaugeProps) {
  // Fuel level is between 0-100
  const fuelPercentage = Math.max(0, Math.min(100, fuelLevel));
  
  // Determine color based on fuel level
  let progressColor = "bg-green-500";
  let textStatus = "Niveau normal";
  
  if (fuelLevel < 10) {
    progressColor = "bg-red-500";
    textStatus = "Réserve critique";
  } else if (fuelLevel < 20) {
    progressColor = "bg-orange-500";
    textStatus = "Réserve basse";
  } else if (fuelLevel < 30) {
    progressColor = "bg-yellow-500";
    textStatus = "À faire le plein";
  }
  
  return (
    <Card className="p-6">
      <div className="flex flex-col">
        <h3 className="font-medium mb-2">Niveau de carburant</h3>
        
        <div className="flex items-center mb-4">
          <Fuel className="h-10 w-10 text-autowise-blue mr-4" />
          <div className="flex-grow">
            <Progress
              value={fuelPercentage}
              className={`h-4 ${progressColor}`}
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>Vide</span>
              <span>1/4</span>
              <span>1/2</span>
              <span>3/4</span>
              <span>Plein</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-3xl font-bold">
              {Math.round(fuelPercentage)}%
            </p>
            <p className={`text-sm ${fuelLevel < 20 ? "text-red-500 font-medium" : "text-gray-500"}`}>
              {textStatus}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Autonomie estimée</p>
            <p className="font-medium">
              ~{Math.round(fuelPercentage * 5)} km
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
