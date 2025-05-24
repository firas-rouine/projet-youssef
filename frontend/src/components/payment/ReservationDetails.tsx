import { Car, Reservation } from "@/lib/types";
import { format, isValid } from "date-fns";
import { fr } from "date-fns/locale";

interface ReservationDetailsProps {
  car: Car;
  reservation: Reservation;
}

export function ReservationDetails({ car, reservation }: ReservationDetailsProps) {
  const formatSafeDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return isValid(date) ? format(date, "dd MMM yyyy", { locale: fr }) : "Date invalide";
    } catch {
      return "Date invalide";
    }
  };

  return (
    <section className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 text-gray-800 font-sans">
      <h2 className="text-3xl font-semibold mb-6 border-b border-gray-200 pb-2">
        Détails de la réservation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Véhicule</h3>
          <p className="text-lg">
            <span className="font-medium">Marque :</span> {car.brand}
          </p>
          <p className="text-lg">
            <span className="font-medium">Modèle :</span> {car.model}
          </p>
          <p className="text-lg">
            <span className="font-medium">Année :</span> {car.year}
          </p>
          <p className="text-lg">
            <span className="font-medium">Transmission :</span> {car.transmission}
          </p>
          <p className="text-lg">
            <span className="font-medium">Carburant :</span> {car.fuelType}
          </p>
          <p className="text-lg">
            <span className="font-medium">Places :</span> {car.seats}
          </p>
          <p className="text-lg">
            <span className="font-medium">Prix par jour :</span>{" "}
            <span className="text-indigo-600 font-bold">{car.dailyPrice} €</span>
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Options</h3>
          <ul className="list-disc list-inside space-y-1 text-lg">
            {car.hasAC && <li>Climatisation</li>}
            {car.hasGPS && <li>GPS</li>}
            {car.childSeatAvailable && <li>Siège enfant</li>}
            {car.driverAvailable && <li>Chauffeur disponible</li>}
            {!car.hasAC && !car.hasGPS && !car.childSeatAvailable && !car.driverAvailable && (
              <li>Aucune option supplémentaire</li>
            )}
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Description</h3>
        <p className="text-gray-700 leading-relaxed">{car.description || "Aucune description."}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Dates de réservation</h3>
        <p className="text-lg">
          <span className="font-medium">{formatSafeDate(reservation.startDate)}</span> -{" "}
          <span className="font-medium">{formatSafeDate(reservation.endDate)}</span>
        </p>
      </div>

      {car.images.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Images du véhicule</h3>
          <div className="flex space-x-4 overflow-x-auto">
            {car.images.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`${car.brand} ${car.model} ${i + 1}`}
                className="w-48 h-32 object-cover rounded-md shadow-sm flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-4">Commentaires des clients</h3>
        {car.reviews && car.reviews.length > 0 ? (
          <ul className="space-y-4 max-h-64 overflow-y-auto">
            {car.reviews.map((review) => (
              <li
                key={review.id}
                className="border border-gray-200 rounded-md p-4 shadow-sm bg-gray-50"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-indigo-600">
                    Note : {review.rating}/5
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(review.date).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p className="text-gray-800">{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 italic">Aucun commentaire pour le moment.</p>
        )}
      </div>
    </section>
  );
}
