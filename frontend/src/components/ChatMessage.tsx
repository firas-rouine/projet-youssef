
import { useState } from 'react';
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

export interface ChatMessageProps {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
  isRead: boolean;
  isCurrentUser: boolean;
  senderName?: string;
  senderAvatar?: string;
}

export function ChatMessage({
  content,
  timestamp,
  isRead,
  isCurrentUser,
  senderName,
  senderAvatar,
}: ChatMessageProps) {
  
  const formattedDate = format(new Date(timestamp), "HH:mm", { locale: fr });
  
  return (
    <div className={cn("flex gap-2 mb-4", isCurrentUser ? "flex-row-reverse" : "")}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8 flex-shrink-0 bg-muted">
          {senderAvatar ? (
            <img src={senderAvatar} alt={senderName || "User"} />
          ) : (
            <span className="text-xs font-semibold">{senderName?.charAt(0).toUpperCase() || "U"}</span>
          )}
        </Avatar>
      )}
      
      <div className={cn("flex flex-col max-w-[80%]", isCurrentUser ? "items-end" : "")}>
        {!isCurrentUser && senderName && (
          <span className="text-xs font-medium text-gray-500 mb-1">{senderName}</span>
        )}
        
        <div
          className={cn(
            "px-3 py-2 rounded-lg",
            isCurrentUser
              ? "bg-autowise-blue text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          )}
        >
          <p className="text-sm">{content}</p>
        </div>
        
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-gray-500">{formattedDate}</span>
          
          {isCurrentUser && (
            <span className="text-xs text-gray-500">
              {isRead ? (
                <CheckCheck className="h-3 w-3 text-autowise-blue" />
              ) : (
                <Check className="h-3 w-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
