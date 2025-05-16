
// Re-export all services from the new files
import { messageService as messageServiceImpl } from "./messages/messageService";
import { conversationService } from "./messages/conversationService";

// Combine services into a single export
export const messageService = {
  ...messageServiceImpl,
  ...conversationService
};
