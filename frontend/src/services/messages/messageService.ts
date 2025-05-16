
import { Message } from "@/lib/types";
import { mockMessages, addMessage, updateMessage, updateConversationLastMessage, createNewConversation } from "./store";

// Service for message management
export const messageService = {
  // Obtenir les messages d'une conversation entre deux utilisateurs
  getConversationMessages: async (userId1: string, userId2: string) => {
    // Simuler une requête à l'API
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Filtrer les messages échangés entre les deux utilisateurs
    const conversationMessages = mockMessages.filter(msg => 
      (msg.senderId === userId1 && msg.receiverId === userId2) ||
      (msg.senderId === userId2 && msg.receiverId === userId1)
    );
    
    // Trier les messages par date
    return conversationMessages.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  },
  
  // Envoyer un message
  sendMessage: async (senderId: string, receiverId: string, content: string) => {
    // Simuler une requête à l'API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Créer un nouveau message
    const newMessage = {
      id: `msg-${Date.now()}`,
      content,
      senderId,
      receiverId,
      timestamp: new Date().toISOString(),
      isRead: false,
      read: false  // Add both properties to satisfy the Message interface
    };
    
    // Ajouter le message aux données simulées
    addMessage(newMessage as Message);
    
    // Vérifier si une conversation existe déjà entre ces utilisateurs
    const conversationExists = mockMessages.some(msg => 
      (msg.senderId === senderId && msg.receiverId === receiverId) ||
      (msg.senderId === receiverId && msg.receiverId === senderId)
    );
    
    // Si aucune conversation n'existe, en créer une nouvelle
    if (!conversationExists) {
      createNewConversation(senderId, receiverId, newMessage as Message);
    } else {
      // Mettre à jour le dernier message de la conversation existante
      updateConversationLastMessage(senderId, receiverId, newMessage as Message);
    }
    
    return newMessage;
  },
  
  // Marquer un message comme lu
  markMessageAsRead: async (messageId: string) => {
    // Simuler une requête à l'API
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Trouver et mettre à jour le message
    const success = updateMessage(messageId, { isRead: true, read: true });
    
    return success 
      ? { success: true } 
      : { success: false, error: "Message not found" };
  }
};
