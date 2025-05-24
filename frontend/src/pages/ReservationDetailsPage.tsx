import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReservationDetails } from "@/components/payment/ReservationDetails";
import { reservationService } from "@/services/reservationService";
import { carService } from "@/services/carService"; // use your car service to fetch car by id
import { Car, Reservation } from "@/lib/types";

export default function ReservationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        setLoading(true);
        const res = await reservationService.getReservationById(id!);
        const carRes = await carService.getCarById(res.carId);
        setReservation(res);
        setCar(carRes);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger la réservation.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchReservation();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error || !reservation || !car) return <p>{error || "Réservation introuvable."}</p>;

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold mb-4">Détails de la réservation</h1> */}
      <ReservationDetails car={car} reservation={reservation} />
    </div>
  );
}
