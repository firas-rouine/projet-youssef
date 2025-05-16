
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronRight, User, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Message } from "@/lib/types";
import { users } from "@/lib/mockData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Conversation {
  userId: string;
  lastMessage: Message;
  unreadCount: number;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedUserId: string | null;
  searchTerm: string;
  loading: boolean;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectConversation: (userId: string) => void;
}

export function ConversationList({
  conversations,
  selectedUserId,
  searchTerm,
  loading,
  onSearch,
  onSelectConversation,
}: ConversationListProps) {
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

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="p-4 border-b">
        <div className="relative">
          <Input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={onSearch}
            className="pl-9"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      <div className="h-[600px] overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center">
            <p>Chargement des conversations...</p>
          </div>
        ) : conversations.length === 0 ? (
          <div className="p-4 text-center">
            <MessageIcon className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">Aucune conversation trouvée</p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation.userId}
              className={`flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedUserId === conversation.userId ? "bg-blue-50" : ""
              }`}
              onClick={() => onSelectConversation(conversation.userId)}
            >
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={getUserAvatar(conversation.userId)} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium truncate">
                    {getUserName(conversation.userId)}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatMessageTime(conversation.lastMessage.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {conversation.lastMessage.content}
                </p>
              </div>
              {conversation.unreadCount > 0 && (
                <Badge className="ml-2 bg-autowise-blue">
                  {conversation.unreadCount}
                </Badge>
              )}
              <ChevronRight className="h-4 w-4 text-gray-400 ml-1" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Helper component for message icon
function MessageIcon(props: React.ComponentProps<typeof MessageCircle>) {
  return <MessageCircle {...props} />;
}
