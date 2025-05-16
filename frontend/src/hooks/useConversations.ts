import { useState, useEffect } from "react";
import { messageService } from "@/services/messageService";
import { Message } from "@/lib/types";
import { users } from "@/lib/mockData";

interface Conversation {
  userId: string;
  lastMessage: Message;
  unreadCount: number;
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Load conversations
  useEffect(() => {
    const loadConversations = async () => {
      setLoading(true);
      try {
        const data = await messageService.getAdminConversations();
        
        // Convert the API response to our Conversation interface
        const formattedConversations: Conversation[] = data.map(conv => {
          return {
            userId: conv.user?.id || "",
            lastMessage: {
              id: conv.lastMessage.id,
              senderId: conv.lastMessage.senderId,
              receiverId: conv.lastMessage.receiverId,
              content: conv.lastMessage.content,
              timestamp: conv.lastMessage.timestamp,
              read: conv.lastMessage.isRead || false
            },
            unreadCount: conv.lastMessage.isRead ? 0 : 1 // Simple assumption for unread count
          };
        });
        
        setConversations(formattedConversations);
        setFilteredConversations(formattedConversations);
        
        if (formattedConversations.length > 0 && !selectedUserId) {
          setSelectedUserId(formattedConversations[0].userId);
        }
      } catch (error) {
        console.error("Error loading conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, []);

  // Load messages when selected user changes
  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedUserId) return;

      try {
        const apiMessages = await messageService.getConversationMessages("admin", selectedUserId);
        
        // Convert API messages to our Message interface
        const formattedMessages: Message[] = apiMessages.map(msg => {
          return {
            id: msg.id,
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            content: msg.content,
            timestamp: msg.timestamp,
            read: msg.isRead || false
          };
        });
        
        setMessages(formattedMessages);

        // Mark messages as read
        const updatedConversations = conversations.map(conv => {
          if (conv.userId === selectedUserId) {
            return { ...conv, unreadCount: 0 };
          }
          return conv;
        });
        setConversations(updatedConversations);
        setFilteredConversations(
          updatedConversations.filter(conv => 
            searchTerm ? getUserName(conv.userId).toLowerCase().includes(searchTerm.toLowerCase()) : true
          )
        );
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    loadMessages();
  }, [selectedUserId]);

  // Filter conversations when search term changes
  useEffect(() => {
    if (searchTerm) {
      const filtered = conversations.filter(conv => 
        getUserName(conv.userId).toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(conversations);
    }
  }, [searchTerm, conversations]);

  // Helper function to get user name from userId
  const getUserName = (userId: string): string => {
    const user = users.find(u => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "Utilisateur inconnu";
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUserId) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: "admin",
      receiverId: selectedUserId,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    try {
      // In a real application, this would be a real API request
      // For now, we just update the local state
      const updatedConversations = conversations.map(conv => {
        if (conv.userId === selectedUserId) {
          return {
            ...conv,
            lastMessage: message
          };
        }
        return conv;
      });

      setConversations(updatedConversations);
      setFilteredConversations(
        updatedConversations.filter(conv => 
          searchTerm ? getUserName(conv.userId).toLowerCase().includes(searchTerm.toLowerCase()) : true
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return {
    conversations: filteredConversations,
    selectedUserId,
    setSelectedUserId,
    messages,
    newMessage,
    setNewMessage,
    searchTerm,
    setSearchTerm,
    loading,
    handleSendMessage
  };
}
