
import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ConversationList } from "@/components/admin/messages/ConversationList";
import { ChatWindow } from "@/components/admin/messages/ChatWindow";
import { useConversations } from "@/hooks/useConversations";

export default function AdminMessages() {
  const {
    conversations,
    selectedUserId,
    setSelectedUserId,
    messages,
    newMessage,
    setNewMessage,
    searchTerm,
    setSearchTerm,
    loading,
    handleSendMessage
  } = useConversations();

  return (
    <AdminLayout title="Messages" description="Gérez vos communications avec les clients">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Liste des conversations */}
        <ConversationList
          conversations={conversations}
          selectedUserId={selectedUserId}
          searchTerm={searchTerm}
          loading={loading}
          onSearch={(e) => setSearchTerm(e.target.value)}
          onSelectConversation={(userId) => setSelectedUserId(userId)}
        />

        {/* Zone de chat */}
        <div className="md:col-span-2">
          <ChatWindow
            selectedUserId={selectedUserId}
            messages={messages}
            newMessage={newMessage}
            onNewMessageChange={(e) => setNewMessage(e.target.value)}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
