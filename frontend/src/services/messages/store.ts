
import { Message } from "@/lib/types";
import { generateMockConversations, generateMockMessages } from "./mockData";

// Initialiser les données simulées
export const mockConversations = generateMockConversations();
export let mockMessages = generateMockMessages();

// Methods to update the mock store
export const addMessage = (message: Message): void => {
  // Ensure message has the required properties
  const normalizedMessage = {
    ...message,
    read: message.read !== undefined ? message.read : message.isRead || false,
    isRead: message.isRead !== undefined ? message.isRead : message.read || false
  };
  
  mockMessages.push(normalizedMessage as any);
};

export const updateMessage = (messageId: string, updates: Partial<Message>): boolean => {
  const messageIndex = mockMessages.findIndex(msg => msg.id === messageId);
  if (messageIndex !== -1) {
    // Ensure updates are properly formatted
    const normalizedUpdates = {
      ...updates,
      read: updates.read !== undefined ? updates.read : updates.isRead,
      isRead: updates.isRead !== undefined ? updates.isRead : updates.read
    };
    
    mockMessages[messageIndex] = { ...mockMessages[messageIndex], ...normalizedUpdates };
    return true;
  }
  return false;
};

export const updateConversationLastMessage = (senderId: string, receiverId: string, message: Message): void => {
  const conversation = mockConversations.find(conv => 
    conv.participants.includes(senderId) && conv.participants.includes(receiverId)
  );
  
  if (conversation) {
    // Ensure message has the required properties
    const normalizedMessage = {
      ...message,
      read: message.read !== undefined ? message.read : message.isRead || false,
      isRead: message.isRead !== undefined ? message.isRead : message.read || false
    };
    
    conversation.lastMessage = normalizedMessage as any;
  }
};

export const createNewConversation = (senderId: string, receiverId: string, message: Message): void => {
  // Ensure message has the required properties
  const normalizedMessage = {
    ...message,
    read: message.read !== undefined ? message.read : message.isRead || false,
    isRead: message.isRead !== undefined ? message.isRead : message.read || false
  };
  
  mockConversations.push({
    id: `conv-${Date.now()}`,
    participants: [senderId, receiverId],
    lastMessage: normalizedMessage as any
  });
};
