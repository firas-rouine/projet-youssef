
import { Check, X } from "lucide-react";

interface CarFeaturesListProps {
  features: Array<{
    name: string;
    available: boolean;
  }>;
}

export function CarFeaturesList({ features }: CarFeaturesListProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {features.map((feature) => (
        <div key={feature.name} className="flex items-center">
          {feature.available ? (
            <Check className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <X className="h-5 w-5 text-red-500 mr-2" />
          )}
          <span className={feature.available ? "" : "text-gray-400"}>
            {feature.name}
          </span>
        </div>
      ))}
    </div>
  );
}
