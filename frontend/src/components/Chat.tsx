import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft } from "lucide-react";
import { ChatMessage } from '@/components/ChatMessage';
import { useAuth } from '@/contexts/AuthContext';
import { messageService } from '@/services/messageService';
import { toast } from '@/components/ui/use-toast';
import { users } from '@/lib/mockData'; // Import mock users

interface ChatProps {
  receiverId: string;
  receiverName?: string;
  receiverAvatar?: string;
  onBack?: () => void;
}

export function Chat({ receiverId, receiverName, receiverAvatar, onBack }: ChatProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // If receiverName is not provided, try to get it from users
  const computedReceiverName = receiverName || (() => {
    const receiver = users.find(u => u.id === receiverId);
    return receiver ? `${receiver.firstName} ${receiver.lastName}` : 'Utilisateur';
  })();
  
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      try {
        const conversationData = await messageService.getConversationMessages(user.id, receiverId);
        setMessages(conversationData);
        
        // Marquer les messages non lus comme lus
        const unreadMessages = conversationData.filter(
          (msg) => !msg.isRead && msg.senderId === receiverId
        );
        
        if (unreadMessages.length > 0) {
          unreadMessages.forEach(async (msg) => {
            await messageService.markMessageAsRead(msg.id);
          });
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les messages",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchMessages();
    
    // Polling pour les nouveaux messages toutes les 10 secondes
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, [user, receiverId]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageText.trim() || !user?.id) return;
    
    setSending(true);
    try {
      const newMessage = await messageService.sendMessage(
        user.id,
        receiverId,
        messageText.trim()
      );
      
      setMessages((prev) => [...prev, newMessage]);
      setMessageText('');
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b shadow-sm">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {receiverAvatar ? (
              <img src={receiverAvatar} alt={computedReceiverName} className="h-full w-full object-cover" />
            ) : (
              <span className="font-semibold text-gray-600">{computedReceiverName.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <h3 className="font-medium">{computedReceiverName}</h3>
            <p className="text-xs text-green-600">En ligne</p>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Chargement des messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full text-center">
            <p className="text-gray-500 mb-2">Pas encore de messages</p>
            <p className="text-sm text-gray-400">Envoyez votre premier message à {computedReceiverName}</p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              id={message.id}
              content={message.content}
              senderId={message.senderId}
              receiverId={message.receiverId}
              timestamp={message.timestamp}
              isRead={message.isRead}
              isCurrentUser={message.senderId === user?.id}
              senderName={message.senderId === user?.id ? user.firstName : computedReceiverName}
              senderAvatar={message.senderId === user?.id ? user.avatar : receiverAvatar}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <form onSubmit={sendMessage} className="p-3 border-t flex gap-2">
        <Input
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Écrivez votre message..."
          disabled={sending}
          className="flex-1"
        />
        <Button type="submit" disabled={sending || !messageText.trim()} className="bg-autowise-blue hover:bg-autowise-navy">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
