
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface VehicleSpeedometerProps {
  speed: number;
  engineRunning: boolean;
}

export function VehicleSpeedometer({ speed, engineRunning }: VehicleSpeedometerProps) {
  const speedPercentage = Math.min(100, (speed / 180) * 100);
  
  // Determine color based on speed
  let progressColor = "bg-green-500";
  if (speed > 90) {
    progressColor = "bg-red-500";
  } else if (speed > 60) {
    progressColor = "bg-yellow-500";
  }
  
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center">
        <h3 className="font-medium mb-2">Vitesse actuelle</h3>
        
        <div className="relative w-40 h-40 flex items-center justify-center mb-4">
          {/* Speedometer background circle */}
          <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
          
          {/* Dynamic speed value */}
          <div className="text-center">
            <span className="text-4xl font-bold">
              {engineRunning ? Math.round(speed) : 0}
            </span>
            <span className="text-sm text-gray-500 block">km/h</span>
          </div>
        </div>
        
        <div className="w-full">
          <Progress
            value={engineRunning ? speedPercentage : 0}
            className={`h-2 ${engineRunning ? progressColor : "bg-gray-300"}`}
          />
          
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>0</span>
            <span>60</span>
            <span>120</span>
            <span>180</span>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-center">
          {speed > 90 && engineRunning ? (
            <p className="text-red-500 font-medium animate-pulse">
              Attention : Vitesse excessive
            </p>
          ) : (
            <p className="text-gray-500">
              {engineRunning 
                ? "Vitesse de croisière normale" 
                : "Véhicule à l'arrêt"}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
