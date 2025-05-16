
import { users } from "@/lib/mockData";
import { mockConversations } from "./store";

// Service for conversation management
export const conversationService = {
  // Obtenir les conversations d'un utilisateur
  getUserConversations: async (userId: string) => {
    // Simuler une requête à l'API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filtrer les conversations où l'utilisateur est un participant
    const userConversations = mockConversations.filter(conv => 
      conv.participants.includes(userId)
    );
    
    // Enrichir les données avec les infos des participants
    return userConversations.map(conv => {
      const otherParticipantId = conv.participants.find(id => id !== userId);
      const otherParticipant = users.find(u => u.id === otherParticipantId);
      
      return {
        ...conv,
        otherParticipant: otherParticipant ? {
          id: otherParticipant.id,
          name: `${otherParticipant.firstName} ${otherParticipant.lastName}`,
          avatar: otherParticipant.profilePicture || otherParticipant.avatar || null
        } : {
          id: otherParticipantId || "",
          name: "Utilisateur inconnu",
          avatar: null
        }
      };
    }).sort((a, b) => 
      new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime()
    );
  },
  
  // Obtenir les conversations pour l'administration
  getAdminConversations: async () => {
    // Simuler une requête à l'API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Enrichir les données avec les infos des participants
    return mockConversations.map(conv => {
      const userParticipantId = conv.participants.find(id => id.startsWith('user-'));
      const userParticipant = users.find(u => u.id === userParticipantId);
      
      return {
        ...conv,
        user: userParticipant ? {
          id: userParticipant.id,
          name: `${userParticipant.firstName} ${userParticipant.lastName}`,
          avatar: userParticipant.profilePicture || userParticipant.avatar || null
        } : {
          id: userParticipantId || "",
          name: "Utilisateur inconnu",
          avatar: null
        }
      };
    }).sort((a, b) => 
      new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime()
    );
  }
};
