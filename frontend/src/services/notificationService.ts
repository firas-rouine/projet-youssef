
import { Notification } from "@/lib/types";
import { notifications } from "@/lib/mockData";

export const notificationService = {
  // Get all notifications for a user
  getUserNotifications: async (userId: string): Promise<Notification[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    return notifications
      .filter((notif) => notif.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  // Get unread notification count for a user
  getUnreadCount: async (userId: string): Promise<number> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    return notifications.filter((notif) => notif.userId === userId && !notif.read).length;
  },

  // Mark notification as read
  markAsRead: async (notificationId: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const notifIndex = notifications.findIndex((notif) => notif.id === notificationId);
    if (notifIndex === -1) return false;

    notifications[notifIndex] = {
      ...notifications[notifIndex],
      read: true,
    };

    return true;
  },

  // Mark all notifications as read for a user
  markAllAsRead: async (userId: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    notifications.forEach((notif, index) => {
      if (notif.userId === userId && !notif.read) {
        notifications[index] = {
          ...notif,
          read: true,
        };
      }
    });

    return true;
  },

  // Create a notification
  createNotification: async (notification: Omit<Notification, "id" | "timestamp">): Promise<Notification> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    const newNotification: Notification = {
      ...notification,
      id: `notif-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
    };

    // Add to mock data
    notifications.push(newNotification);
    
    return newNotification;
  },

  // Delete notification
  deleteNotification: async (notificationId: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const notifIndex = notifications.findIndex((notif) => notif.id === notificationId);
    if (notifIndex === -1) return false;

    notifications.splice(notifIndex, 1);
    return true;
  },
};
