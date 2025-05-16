
import React, { useEffect, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { notificationService } from "@/services/notificationService";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function AdminLayout({
  children,
  title = "Admin Dashboard",
  description,
}: AdminLayoutProps) {
  const { isAdmin } = useAuth();
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const count = await notificationService.getUnreadCount("admin");
        setUnreadNotifications(count);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    
    // Set up a refresh interval for notifications (every 30 seconds)
    const interval = setInterval(fetchNotifications, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-autowise-navy">
                {title}
              </h1>
              {description && (
                <p className="text-sm text-gray-500">{description}</p>
              )}
            </div>
            
            {/* Notification icon */}
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-600 cursor-pointer" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  {unreadNotifications}
                </Badge>
              )}
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
