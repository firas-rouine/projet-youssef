
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Car,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  ChevronRight,
  Cpu,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    {
      title: "Tableau de bord",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
      exact: true,
    },
    {
      title: "Véhicules",
      href: "/admin/cars",
      icon: <Car className="h-5 w-5" />,
      exact: false,
    },
    {
      title: "Utilisateurs",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
      exact: false,
    },
    {
      title: "Réservations",
      href: "/admin/reservations",
      icon: <Calendar className="h-5 w-5" />,
      exact: false,
    },
    {
      title: "Messages",
      href: "/admin/messages",
      icon: <MessageSquare className="h-5 w-5" />,
      exact: false,
    },
    {
      title: "Télématique IoT",
      href: "/admin/iot",
      icon: <Cpu className="h-5 w-5" />,
      exact: false,
    },
    {
      title: "Paramètres",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
      exact: false,
    },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-screen py-4 flex flex-col justify-between bg-autowise-navy text-white w-64 fixed left-0 top-0 shadow-lg">
      {/* Logo */}
      <div className="px-6 py-4 border-b border-autowise-blue/20">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/43daed69-9290-490b-99c3-7d35f12ec6d5.png" 
            alt="AutoWise Logo" 
            className="h-8" 
          />
          <span className="font-bold text-xl">Admin</span>
        </Link>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-2 overflow-auto">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-colors",
                isActive(item.href, item.exact)
                  ? "bg-autowise-blue text-white"
                  : "text-gray-300 hover:bg-autowise-blue/20 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.title}</span>
              </div>
              <ChevronRight className={cn(
                "h-4 w-4 transition-transform",
                isActive(item.href, item.exact) ? "rotate-90" : ""
              )} />
            </Link>
          ))}
        </nav>
      </div>

      {/* User and Logout */}
      <div className="px-3 pb-4 pt-2 border-t border-autowise-blue/20">
        <div className="flex justify-between items-center p-3 rounded-lg text-gray-300">
          <div className="text-sm">
            <p className="text-white font-medium">Admin AutoWise</p>
            <p className="text-xs">admin@autowise.com</p>
          </div>
          <button 
            onClick={logout}
            className="p-1.5 rounded-lg hover:bg-red-800/30"
            title="Déconnexion"
          >
            <LogOut className="h-4 w-4 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
