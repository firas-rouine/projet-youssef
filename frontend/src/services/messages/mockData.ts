
import { users } from "@/lib/mockData";
import { subDays, subHours, subMinutes } from "date-fns";
import { Message } from "@/lib/types";

// Générer des données de conversation simulées
export const generateMockConversations = () => {
  // Simuler quelques conversations entre utilisateurs
  return [
    {
      id: 'conv-1',
      participants: ['user-1', 'admin-1'],
      lastMessage: {
        id: 'msg-104',
        content: "Oui bien sûr, je vous envoie les détails.",
        senderId: 'admin-1',
        receiverId: 'user-1',
        timestamp: subMinutes(new Date(), 35).toISOString(),
        isRead: false
      }
    },
    {
      id: 'conv-2',
      participants: ['user-2', 'admin-1'],
      lastMessage: {
        id: 'msg-207',
        content: "Je voudrais réserver pour la semaine prochaine.",
        senderId: 'user-2',
        receiverId: 'admin-1',
        timestamp: subHours(new Date(), 3).toISOString(),
        isRead: true
      }
    },
    {
      id: 'conv-3',
      participants: ['user-3', 'admin-2'],
      lastMessage: {
        id: 'msg-308',
        content: "Merci pour votre aide !",
        senderId: 'user-3',
        receiverId: 'admin-2',
        timestamp: subDays(new Date(), 2).toISOString(),
        isRead: true
      }
    }
  ];
};

// Générer des messages simulés pour les conversations
export const generateMockMessages = () => {
  // Conversation 1: user-1 et admin-1
  const conv1Messages = [
    {
      id: 'msg-101',
      content: "Bonjour, je souhaiterais avoir des informations sur la location de la BMW Série 5.",
      senderId: 'user-1',
      receiverId: 'admin-1',
      timestamp: subHours(new Date(), 5).toISOString(),
      isRead: true
    },
    {
      id: 'msg-102',
      content: "Bonjour ! Bien sûr, que souhaitez-vous savoir exactement ?",
      senderId: 'admin-1',
      receiverId: 'user-1',
      timestamp: subHours(new Date(), 4).toISOString(),
      isRead: true
    },
    {
      id: 'msg-103',
      content: "Est-ce que je peux avoir les tarifs pour une location de 3 jours le mois prochain ?",
      senderId: 'user-1',
      receiverId: 'admin-1',
      timestamp: subHours(new Date(), 1).toISOString(),
      isRead: true
    },
    {
      id: 'msg-104',
      content: "Oui bien sûr, je vous envoie les détails.",
      senderId: 'admin-1',
      receiverId: 'user-1',
      timestamp: subMinutes(new Date(), 35).toISOString(),
      isRead: false
    }
  ];
  
  // Conversation 2: user-2 et admin-1
  const conv2Messages = [
    {
      id: 'msg-201',
      content: "Bonjour, avez-vous des véhicules disponibles pour ce week-end ?",
      senderId: 'user-2',
      receiverId: 'admin-1',
      timestamp: subDays(new Date(), 1).toISOString(),
      isRead: true
    },
    {
      id: 'msg-202',
      content: "Bonjour ! Oui, nous avons plusieurs modèles disponibles. Quelle catégorie vous intéresse ?",
      senderId: 'admin-1',
      receiverId: 'user-2',
      timestamp: subDays(new Date(), 1).toISOString(),
      isRead: true
    },
    {
      id: 'msg-203',
      content: "Je cherche quelque chose de confortable pour un voyage en famille.",
      senderId: 'user-2',
      receiverId: 'admin-1',
      timestamp: subDays(new Date(), 1).toISOString(),
      isRead: true
    },
    {
      id: 'msg-204',
      content: "Je vous recommande notre Mercedes Classe C ou notre Audi A6, toutes deux très confortables pour les longs trajets.",
      senderId: 'admin-1',
      receiverId: 'user-2',
      timestamp: subHours(new Date(), 20).toISOString(),
      isRead: true
    },
    {
      id: 'msg-205',
      content: "Excellent, quel est le tarif pour l'Audi A6 ?",
      senderId: 'user-2',
      receiverId: 'admin-1',
      timestamp: subHours(new Date(), 18).toISOString(),
      isRead: true
    },
    {
      id: 'msg-206',
      content: "Le tarif est de 240 TND par jour. Nous avons une promotion ce mois-ci : -10% pour les locations de 3 jours et plus.",
      senderId: 'admin-1',
      receiverId: 'user-2',
      timestamp: subHours(new Date(), 10).toISOString(),
      isRead: true
    },
    {
      id: 'msg-207',
      content: "Je voudrais réserver pour la semaine prochaine.",
      senderId: 'user-2',
      receiverId: 'admin-1',
      timestamp: subHours(new Date(), 3).toISOString(),
      isRead: true
    }
  ];
  
  // Conversation 3: user-3 et admin-2
  const conv3Messages = [
    {
      id: 'msg-301',
      content: "Bonjour, j'ai un problème avec ma réservation n°RE-56789.",
      senderId: 'user-3',
      receiverId: 'admin-2',
      timestamp: subDays(new Date(), 3).toISOString(),
      isRead: true
    },
    {
      id: 'msg-302',
      content: "Bonjour, je vérifie cela immédiatement. Quel est le problème exactement ?",
      senderId: 'admin-2',
      receiverId: 'user-3',
      timestamp: subDays(new Date(), 3).toISOString(),
      isRead: true
    },
    {
      id: 'msg-303',
      content: "J'ai besoin de modifier les dates de ma réservation.",
      senderId: 'user-3',
      receiverId: 'admin-2',
      timestamp: subDays(new Date(), 3).toISOString(),
      isRead: true
    },
    {
      id: 'msg-304',
      content: "Bien sûr, quelles sont les nouvelles dates souhaitées ?",
      senderId: 'admin-2',
      receiverId: 'user-3',
      timestamp: subDays(new Date(), 3).toISOString(),
      isRead: true
    },
    {
      id: 'msg-305',
      content: "Du 20 au 25 du mois prochain.",
      senderId: 'user-3',
      receiverId: 'admin-2',
      timestamp: subDays(new Date(), 2).toISOString(),
      isRead: true
    },
    {
      id: 'msg-306',
      content: "J'ai vérifié la disponibilité et ces dates sont libres. Je viens de modifier votre réservation.",
      senderId: 'admin-2',
      receiverId: 'user-3',
      timestamp: subDays(new Date(), 2).toISOString(),
      isRead: true
    },
    {
      id: 'msg-307',
      content: "Vous recevrez un email de confirmation dans quelques minutes.",
      senderId: 'admin-2',
      receiverId: 'user-3',
      timestamp: subDays(new Date(), 2).toISOString(),
      isRead: true
    },
    {
      id: 'msg-308',
      content: "Merci pour votre aide !",
      senderId: 'user-3',
      receiverId: 'admin-2',
      timestamp: subDays(new Date(), 2).toISOString(),
      isRead: true
    }
  ];
  
  return [...conv1Messages, ...conv2Messages, ...conv3Messages];
};
