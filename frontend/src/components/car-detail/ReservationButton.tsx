
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface ReservationButtonProps {
  carId: string;
}

export function ReservationButton({ carId }: ReservationButtonProps) {
  return (
    <Button asChild className="w-full bg-autowise-blue hover:bg-autowise-navy mt-4">
      <Link to={`/booking?carId=${carId}`}>
        <Calendar className="mr-2 h-4 w-4" />
        Réserver maintenant
      </Link>
    </Button>
  );
}
