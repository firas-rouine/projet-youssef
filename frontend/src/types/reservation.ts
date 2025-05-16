
import { Car, Reservation, ReservationStatus } from "@/lib/types";

export interface ReservationWithCar extends Omit<Reservation, 'status'> {
  car: Car;
  status: ReservationStatus;
}
