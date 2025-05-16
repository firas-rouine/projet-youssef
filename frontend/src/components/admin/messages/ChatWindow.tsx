
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, MessageCircle, Send } from "lucide-react";
import { Message } from "@/lib/types";
import { users } from "@/lib/mockData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface ChatWindowProps {
  selectedUserId: string | null;
  messages: Message[];
  newMessage: string;
  onNewMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
}

export function ChatWindow({
  selectedUserId,
  messages,
  newMessage,
  onNewMessageChange,
  onSendMessage,
}: ChatWindowProps) {
  const getUserName = (userId: string): string => {
    const user = users.find(u => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "Utilisateur inconnu";
  };

  const getUserAvatar = (userId: string): string => {
    const user = users.find(u => u.id === userId);
    return user?.profilePicture || "";
  };

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return format(date, 'HH:mm');
    } else if (diffDays === 1) {
      return "Hier";
    } else if (diffDays < 7) {
      return format(date, 'EEEE', { locale: fr });
    } else {
      return format(date, 'dd MMM', { locale: fr });
    }
  };

  if (!selectedUserId) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="text-center p-4">
          <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-medium mb-2">Aucune conversation sélectionnée</h3>
          <p className="text-gray-500">
            Sélectionnez une conversation dans la liste pour commencer à discuter
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* En-tête du chat */}
      <div className="p-4 border-b flex items-center">
        <Avatar className="h-8 w-8 mr-3">
          <AvatarImage src={getUserAvatar(selectedUserId)} />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{getUserName(selectedUserId)}</h3>
          <p className="text-xs text-gray-500">Client</p>
        </div>
      </div>

      {/* Messages */}
      <div className="h-[500px] overflow-y-auto p-4 bg-gray-50 flex flex-col space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">Aucun message dans cette conversation</p>
            <p className="text-gray-400 text-sm mt-1">Envoyez un message pour commencer la conversation</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === "admin" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.senderId === "admin"
                    ? "bg-autowise-blue text-white"
                    : "bg-white border"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div
                  className={`text-xs mt-1 ${
                    message.senderId === "admin" ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {formatMessageTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Zone de saisie */}
      <div className="p-4 border-t">
        <div className="flex">
          <Input
            type="text"
            placeholder="Tapez votre message ici..."
            value={newMessage}
            onChange={onNewMessageChange}
            className="flex-1 mr-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") onSendMessage();
            }}
          />
          <Button onClick={onSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
