
import { users } from "@/lib/mockData";
import { addDays, subDays, format } from "date-fns";
import { ReservationStatus, statusFrToEn } from "@/lib/types";

// Mock data pour les réservations
const mockReservations = Array.from({ length: 25 }, (_, i) => {
  const userId = users[Math.floor(Math.random() * users.length)].id;
  const user = users.find(u => u.id === userId);
  const username = user ? `${user.firstName} ${user.lastName}` : "Client inconnu";
  
  const carId = `car-${Math.floor(Math.random() * 10) + 1}`;
  const carModels = ["BMW Série 3", "Mercedes C200", "Audi A4", "VW Golf", "Renault Clio", "Peugeot 208", "Toyota Corolla", "Hyundai i30"];
  const carName = carModels[Math.floor(Math.random() * carModels.length)];
  
  const createdAt = subDays(new Date(), Math.floor(Math.random() * 30)).toISOString();
  const startDate = subDays(new Date(), Math.floor(Math.random() * 10)).toISOString();
  const endDate = addDays(new Date(startDate), Math.floor(Math.random() * 10) + 1).toISOString();
  
  const totalPrice = Math.floor(Math.random() * 500) + 100;
  
  const statusOptions = ["en attente", "confirmée", "annulée", "terminée"];
  const status = statusOptions[Math.floor(Math.random() * statusOptions.length)] as ReservationStatus;
  
  const paymentStatusOptions = ["pending", "paid", "refunded"];
  const paymentStatus = paymentStatusOptions[Math.floor(Math.random() * paymentStatusOptions.length)] as "pending" | "paid" | "refunded";
  
  return {
    id: `res-${i + 1000}`,
    userId,
    carId,
    startDate,
    endDate,
    totalPrice,
    status,
    paymentStatus,
    createdAt,
    userName: username,
    carName,
    withDriver: Math.random() > 0.7,
    withChildSeat: Math.random() > 0.8,
    withGPS: Math.random() > 0.7
  };
});

// Service pour les réservations
export const reservationService = {
  // Obtenir toutes les réservations
  getAllReservations: async () => {
    // Simuler une requête à l'API
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockReservations;
  },

  // Obtenir une réservation par son ID
  getReservationById: async (id: string) => {
    // Simuler une requête à l'API
    await new Promise(resolve => setTimeout(resolve, 500));
    const reservation = mockReservations.find(r => r.id === id);
    return reservation;
  },

  // Obtenir les réservations d'un utilisateur
  getUserReservations: async (userId: string) => {
    // Simuler une requête à l'API
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockReservations.filter(r => r.userId === userId);
  },

  // Créer une réservation
  createReservation: async (reservationData: any) => {
    // Simuler une requête à l'API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Générer un ID pour la nouvelle réservation
    const newId = `res-${Date.now()}`;
    
    // Créer la nouvelle réservation
    const newReservation = {
      id: newId,
      ...reservationData,
      status: "en attente" as ReservationStatus,
      paymentStatus: "pending" as const,
      createdAt: new Date().toISOString()
    };
    
    return newReservation;
  },

  // Mettre à jour une réservation
  updateReservationStatus: async (id: string, status: ReservationStatus | "confirmed" | "cancelled" | "completed") => {
    // Simuler une requête à l'API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Gestion des status en français ou anglais
    let mappedStatus;
    if (status === "confirmed" || status === "cancelled" || status === "completed") {
      if (status === "confirmed") mappedStatus = "confirmée";
      else if (status === "cancelled") mappedStatus = "annulée";
      else mappedStatus = "terminée";
    } else {
      mappedStatus = status;
    }
    
    // Dans une vraie application, on mettrait à jour la réservation dans la base de données
    return { success: true, message: `Réservation ${id} mise à jour avec le statut: ${mappedStatus}` };
  },

  // Vérifier la disponibilité d'une voiture pour une période donnée
  checkAvailability: async (carId: string, startDate: string, endDate: string) => {
    // Simuler une requête à l'API
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Vérifier s'il y a des réservations qui se chevauchent
    const overlappingReservations = mockReservations.filter(res => 
      res.carId === carId && 
      (res.status !== "annulée" && res.status !== "cancelled") &&
      !(new Date(res.endDate) < new Date(startDate) || new Date(res.startDate) > new Date(endDate))
    );
    
    return {
      available: overlappingReservations.length === 0,
      conflictingReservations: overlappingReservations
    };
  },
  
  // Calculer le prix d'une réservation
  calculatePrice: async (
    carId: string,
    startDate: string,
    endDate: string,
    withDriver: boolean = false,
    withChildSeat: boolean = false,
    withGPS: boolean = false
  ) => {
    // Simuler une requête à l'API
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Dans une vraie application, on récupérerait les infos de la voiture et calculerait le prix
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Prix de base (simulé - normalement récupéré de la base de données)
    let basePrice = 100; // prix par défaut
    
    // Chercher la voiture dans les données simulées pour obtenir son prix réel
    const carIdNumber = parseInt(carId.replace('car-', ''));
    if (carIdNumber >= 1 && carIdNumber <= 10) {
      basePrice = [250, 220, 240, 120, 110, 90, 95, 280, 85, 150][carIdNumber - 1];
    }
    
    let totalPrice = basePrice * diffDays;
    
    // Ajouts optionnels
    if (withDriver) totalPrice += 100 * diffDays;
    if (withChildSeat) totalPrice += 10 * diffDays;
    if (withGPS) totalPrice += 15 * diffDays;
    
    return totalPrice;
  },
  
  // Méthode pour confirmer le paiement d'une réservation
  confirmPayment: async (reservationId: string, paymentMethod: string, cardDetails?: any) => {
    // Simuler une requête à l'API
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Dans une vraie application, on traiterait le paiement via un service comme Stripe
    return {
      success: true,
      paymentId: `pay-${Date.now()}`,
      reservationId,
      status: "confirmed" as ReservationStatus,
      paymentMethod,
      date: new Date().toISOString()
    };
  }
};
