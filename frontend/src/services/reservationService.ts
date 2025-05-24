import axios from "axios";
import { format, differenceInDays } from "date-fns";
import { Reservation, ReservationStatus, statusFrToEn, User, Car } from "@/lib/types";

const API_URL = "http://localhost:1337/api/reservations";

interface StrapiReservationResponse {
  id: number;
  attributes: {
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: ReservationStatus;
    withDriver: boolean;
    withChildSeat: boolean;
    withGPS: boolean;
    paymentMethod?: string;
    paymentStatus?: "pending" | "paid" | "refunded";
    createdAt: string;
    user?: { data: { id: number; attributes: Omit<User, "id"> } };
    car?: { data: { id: number; attributes: Omit<Car, "id" | "images"> & { images?: { data: Array<{ attributes: { url: string } }> } } } };
  };
}

export const reservationService = {
  getAllReservations: async (): Promise<(Reservation & { userName?: string; carName?: string })[]> => {
    try {
      const response = await axios.get<{ data: StrapiReservationResponse[] }>(
        `${API_URL}?populate=user,car.images`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
      );
      const reservations = response.data.data;
      if (!reservations.length) {
        console.warn("No reservations found");
        return [];
      }
      return reservations.map((item) => {
        const user = item.attributes.user?.data?.attributes;
        const car = item.attributes.car?.data?.attributes;
        return {
          id: item.id.toString(),
          userId: item.attributes.user?.data?.id.toString() || "",
          carId: item.attributes.car?.data?.id.toString() || "",
          startDate: item.attributes.startDate,
          endDate: item.attributes.endDate,
          totalPrice: item.attributes.totalPrice,
          status: item.attributes.status,
          withDriver: item.attributes.withDriver,
          withChildSeat: item.attributes.withChildSeat,
          withGPS: item.attributes.withGPS,
          paymentMethod: item.attributes.paymentMethod,
          paymentStatus: item.attributes.paymentStatus,
          createdAt: item.attributes.createdAt,
          userName: user ? `${user.firstName} ${user.lastName}` : "Client inconnu",
          carName: car ? `${car.brand} ${car.model}` : "Voiture inconnue",
        };
      });
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn("Reservations endpoint not found");
        return [];
      }
      if (error.response?.status === 403) {
        console.warn("Access denied: Insufficient permissions for reservations");
        return [];
      }
      console.error("Error fetching reservations:", error.response?.data || error.message);
      throw error;
    }
  },

  getReservationById: async (id: string): Promise<(Reservation & { userName?: string; carName?: string }) | null> => {
    try {
      const response = await axios.get<{ data: StrapiReservationResponse }>(
        `${API_URL}/${id}?populate=user,car.images`, // Line ~70
        { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
      );
      const item = response.data.data;
      if (!item) return null;
      const user = item.attributes.user?.data?.attributes;
      const car = item.attributes.car?.data?.attributes;
      return {
        id: item.id.toString(),
        userId: item.attributes.user?.data?.id.toString() || "",
        carId: item.attributes.car?.data?.id.toString() || "",
        startDate: item.attributes.startDate,
        endDate: item.attributes.endDate,
        totalPrice: item.attributes.totalPrice,
        status: item.attributes.status,
        withDriver: item.attributes.withDriver,
        withChildSeat: item.attributes.withChildSeat,
        withGPS: item.attributes.withGPS,
        paymentMethod: item.attributes.paymentMethod,
        paymentStatus: item.attributes.paymentStatus,
        createdAt: item.attributes.createdAt,
        userName: user ? `${user.firstName} ${user.lastName}` : "Client inconnu",
        carName: car ? `${car.brand} ${car.model}` : "Voiture inconnue",
      };
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn(`Reservation ${id} not found`); // Line ~97
        return null;
      }
      if (error.response?.status === 403) {
        console.warn(`Access denied for reservation ${id}: Insufficient permissions`);
        return null;
      }
      console.error(`Error fetching reservation ${id}:`, error.response?.data || error.message); // Line ~100
      return null; // Changed from throw to return null
    }
  },

getUserReservations: async (userId: string): Promise<Reservation[]> => {
  try {
    const url = `${API_URL}?filters[user][id][$eq]=${userId}&populate=user,car.images`;
    console.log("Fetching reservations with URL:", url);
    const response = await axios.get<{ data: StrapiReservationResponse[] }>(
      url,
      { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
    );
    console.log("API Response for user", userId, ":", response.data);
    const items = response.data.data;
    if (!items || items.length === 0) {
      console.warn(`No reservations found for user ${userId}`, response.data);
      return [];
    }
    return items.map((item) => ({
      id: item.id.toString(),
      userId: item.attributes.user?.data?.[0]?.id.toString() || "", // Adjust for oneToMany
      carId: item.attributes.car?.data?.id.toString() || "",
      startDate: item.attributes.startDate,
      endDate: item.attributes.endDate,
      totalPrice: item.attributes.totalPrice,
      status: item.attributes.status,
      withDriver: item.attributes.withDriver,
      withChildSeat: item.attributes.withChildSeat,
      withGPS: item.attributes.withGPS,
      paymentMethod: item.attributes.paymentMethod,
      paymentStatus: item.attributes.paymentStatus,
      createdAt: item.attributes.createdAt,
      userName: item.attributes.user?.data?.[0]?.attributes
        ? `${item.attributes.user.data[0].attributes.firstName} ${item.attributes.user.data[0].attributes.lastName}`
        : "Client inconnu",
      carName: item.attributes.car?.data?.attributes
        ? `${item.attributes.car.data.attributes.brand} ${item.attributes.car.data.attributes.model}`
        : "Voiture inconnue",
    }));
  } catch (error: any) {
    console.error(`Error fetching reservations for user ${userId}:`, {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      headers: error.response?.headers
    });
    return [];
  }
},

createReservation: async (
    reservationData: Omit<Reservation, "id" | "status" | "paymentStatus" | "createdAt">
  ): Promise<Reservation> => {
    try {
      const response = await axios.post<{ data: StrapiReservationResponse }>(
        API_URL,
        {
          data: {
            user: reservationData.userId, // singular 'user'
            car: reservationData.carId,
            startDate: reservationData.startDate,
            endDate: reservationData.endDate,
            totalPrice: reservationData.totalPrice,
            status: "en attente",
            withDriver: reservationData.withDriver,
            withChildSeat: reservationData.withChildSeat,
            withGPS: reservationData.withGPS,
            paymentMethod: reservationData.paymentMethod,
            paymentStatus: "pending",
            // Do NOT send createdAt - Strapi auto manages timestamps
          },
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
      );

      const item = response.data.data;
      return {
        id: item.id.toString(),
        userId: item.attributes.user?.data?.id.toString() || "",
        carId: item.attributes.car?.data?.id.toString() || "",
        startDate: item.attributes.startDate,
        endDate: item.attributes.endDate,
        totalPrice: item.attributes.totalPrice,
        status: item.attributes.status,
        withDriver: item.attributes.withDriver,
        withChildSeat: item.attributes.withChildSeat,
        withGPS: item.attributes.withGPS,
        paymentMethod: item.attributes.paymentMethod,
        paymentStatus: item.attributes.paymentStatus,
        createdAt: item.attributes.createdAt,
      };
    } catch (error: any) {
      console.error("Error creating reservation:", error.response?.data || error.message);
      throw error;
    }
  },

  updateReservationStatus: async (
    id: string,
    status: ReservationStatus | "confirmed" | "cancelled" | "completed"
  ): Promise<{ success: boolean; message: string }> => {
    try {
      let mappedStatus: ReservationStatus;
      if (status === "confirmed") mappedStatus = "confirmée";
      else if (status === "cancelled") mappedStatus = "annulée";
      else if (status === "completed") mappedStatus = "terminée";
      else mappedStatus = status;

      await axios.put(
        `${API_URL}/${id}`,
        { data: { status: mappedStatus } },
        { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
      );
      return { success: true, message: `Réservation ${id} mise à jour avec le statut: ${mappedStatus}` };
    } catch (error: any) {
      console.error(`Error updating reservation ${id} status:`, error.response?.data || error.message);
      throw error;
    }
  },


  checkAvailability: async (carId: string, startDate: string, endDate: string): Promise<{ available: boolean; conflictingReservations: Reservation[] }> => {
    try {
      const response = await axios.get<{ data: StrapiReservationResponse[] }>(
        `${API_URL}?filters[car][id][$eq]=${carId}&filters[status][$ne]=annulée`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
      );
      const reservations = response.data.data.map((item) => ({
        id: item.id.toString(),
        userId: item.attributes.user?.data?.id.toString() || "",
        carId: item.attributes.car?.data?.id.toString() || "",
        startDate: item.attributes.startDate,
        endDate: item.attributes.endDate,
        totalPrice: item.attributes.totalPrice,
        status: item.attributes.status,
        withDriver: item.attributes.withDriver,
        withChildSeat: item.attributes.withChildSeat,
        withGPS: item.attributes.withGPS,
        paymentMethod: item.attributes.paymentMethod,
        paymentStatus: item.attributes.paymentStatus,
        createdAt: item.attributes.createdAt,
      }));

      const overlappingReservations = reservations.filter(
        (res) =>
          !(new Date(res.endDate) < new Date(startDate) || new Date(res.startDate) > new Date(endDate))
      );

      return {
        available: overlappingReservations.length === 0,
        conflictingReservations: overlappingReservations,
      };
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn(`No reservations found for car ${carId}`);
        return { available: true, conflictingReservations: [] };
      }
      if (error.response?.status === 403) {
        console.warn(`Access denied: Insufficient permissions for car ${carId} availability`);
        return { available: true, conflictingReservations: [] };
      }
      console.error(`Error checking availability for car ${carId}:`, error.response?.data || error.message);
      throw error;
    }
  },

  calculatePrice: async (
    carId: string,
    startDate: string,
    endDate: string,
    withDriver: boolean = false,
    withChildSeat: boolean = false,
    withGPS: boolean = false
  ): Promise<number> => {
    try {
      const carResponse = await axios.get<{ data: { id: number; attributes: Omit<Car, "id" | "images"> & { images?: { data: Array<{ attributes: { url: string } }> } } } }>(
        `http://localhost:1337/api/cars/${carId}?populate=images`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
      );
      const car = carResponse.data.data.attributes;

      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffDays = differenceInDays(end, start) + 1;

      let totalPrice = (car.dailyPrice || 100) * diffDays;
      if (withDriver) totalPrice += 100 * diffDays;
      if (withChildSeat) totalPrice += 10 * diffDays;
      if (withGPS) totalPrice += 15 * diffDays;

      return totalPrice;
    } catch (error: any) {
      console.error(`Error calculating price for car ${carId}:`, error.response?.data || error.message);
      throw error;
    }
  },

  confirmPayment: async (reservationId: string, paymentMethod: string, cardDetails?: any): Promise<{
    success: boolean;
    paymentId: string;
    reservationId: string;
    status: ReservationStatus;
    paymentMethod: string;
    date: string;
  }> => {
    try {
      await axios.put(
        `${API_URL}/${reservationId}`,
        {
          data: {
            paymentStatus: "paid",
            paymentMethod,
            status: "confirmée",
          },
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
      );
      return {
        success: true,
        paymentId: `pay-${Date.now()}`,
        reservationId,
        status: "confirmée",
        paymentMethod,
        date: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error(`Error confirming payment for reservation ${reservationId}:`, error.response?.data || error.message);
      throw error;
    }
  },
}; 

