import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ReservationHistory } from "@/components/ReservationHistory";
import { FavoritesList } from "@/components/FavoritesList";
import { ProfileSettings } from "@/components/ProfileSettings";
import { 
  LayoutDashboard, 
  ClipboardList, 
  History, 
  Settings, 
  Bell,
  Heart
} from "lucide-react";

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mon profil</h1>
            <p className="text-gray-600">
              Bienvenue, {user?.firstName} {user?.lastName}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar de navigation */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {/* Wrap TabsList within a Tabs component */}
                <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
                  <TabsList className="flex flex-col h-auto space-y-2 bg-transparent">
                    <TabsTrigger
                      value="dashboard"
                      className={`w-full justify-start ${activeTab === "dashboard" ? "data-[state=active]" : ""}`}
                    >
                      <LayoutDashboard className="h-5 w-5 mr-2" />
                      Tableau de bord
                    </TabsTrigger>
                    <TabsTrigger
                      value="reservations"
                      className={`w-full justify-start ${activeTab === "reservations" ? "data-[state=active]" : ""}`}
                    >
                      <ClipboardList className="h-5 w-5 mr-2" />
                      Mes réservations
                    </TabsTrigger>
                    <TabsTrigger
                      value="favorites"
                      className={`w-full justify-start ${activeTab === "favorites" ? "data-[state=active]" : ""}`}
                    >
                      <Heart className="h-5 w-5 mr-2" />
                      Mes favoris
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className={`w-full justify-start ${activeTab === "history" ? "data-[state=active]" : ""}`}
                    >
                      <History className="h-5 w-5 mr-2" />
                      Historique
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className={`w-full justify-start ${activeTab === "notifications" ? "data-[state=active]" : ""}`}
                    >
                      <Bell className="h-5 w-5 mr-2" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className={`w-full justify-start ${activeTab === "settings" ? "data-[state=active]" : ""}`}
                    >
                      <Settings className="h-5 w-5 mr-2" />
                      Paramètres
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="dashboard" className="m-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h2 className="text-lg font-medium mb-4">Informations personnelles</h2>
                      <div className="space-y-2">
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-500">Nom</span>
                          <span>{user?.firstName} {user?.lastName}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-500">Email</span>
                          <span>{user?.email}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-500">Téléphone</span>
                          <span>{user?.phoneNumber || "-"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Adresse</span>
                          <span>{user?.address || "-"}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h2 className="text-lg font-medium mb-4">Résumé d'activité</h2>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Réservations actives</span>
                          <span className="font-medium bg-green-100 text-green-800 px-2 py-1 rounded">2</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Réservations passées</span>
                          <span className="font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded">3</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Véhicules dans l'historique</span>
                          <span className="font-medium bg-red-100 text-red-800 px-2 py-1 rounded">5</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Messages non lus</span>
                          <span className="font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">1</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Réservations récentes</h2>
                    <ReservationHistory />
                  </div>
                </TabsContent>
                
                <TabsContent value="reservations" className="m-0">
                  <h2 className="text-xl font-semibold mb-4">Mes réservations</h2>
                  <ReservationHistory />
                </TabsContent>
                
                <TabsContent value="favorites" className="m-0">
                  <h2 className="text-xl font-semibold mb-4">Mes voitures préférées</h2>
                  <FavoritesList isHistory={false} />
                </TabsContent>
                
                <TabsContent value="history" className="m-0">
                  <h2 className="text-xl font-semibold mb-4">Historique des véhicules</h2>
                  <FavoritesList isHistory={true} />
                </TabsContent>
                
                <TabsContent value="notifications" className="m-0">
                  <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <Bell className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">
                      Vous n'avez pas de notifications pour le moment.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="m-0">
                  <h2 className="text-xl font-semibold mb-4">Paramètres du compte</h2>
                  <ProfileSettings />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
