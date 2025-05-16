
import { Car } from "@/lib/types";

interface CarDetailFeaturesProps {
  car: Car;
}

export function CarDetailFeatures({ car }: CarDetailFeaturesProps) {
  // Features list - fixed category comparison logic
  const features = [
    { name: "Climatisation", available: car.hasAC },
    { name: "Service chauffeur", available: car.driverAvailable },
    { name: "Bluetooth", available: true },
    { name: "GPS intégré", available: car.category !== "économique" },
    { name: "Sièges cuir", available: car.category === "luxe" || car.category === "premium" },
    { name: "Toit ouvrant", available: car.category === "luxe" },
  ];

  return features;
}
