
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Layout, Users, Car, Calendar, ArrowRight } from "lucide-react";
import { reservations, cars, users } from "@/lib/mockData";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { statusFrToEn } from "@/lib/types";

export default function AdminDashboard() {
  const [recentReservations, setRecentReservations] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalReservations: 0,
    totalRevenue: 0,
    pendingReservations: 0,
  });

  useEffect(() => {
    // Calculate dashboard stats
    const clientUsers = users.filter((u) => u.role === "client");
    // Utiliser le mapping de statut pour la comparaison
    const pendingRes = reservations.filter((r) => 
      statusFrToEn(r.status) === "pending"
    );
    const totalRevenue = reservations.reduce(
      (sum, res) => sum + res.totalPrice,
      0
    );

    setStats({
      totalUsers: clientUsers.length,
      totalCars: cars.length,
      totalReservations: reservations.length,
      totalRevenue,
      pendingReservations: pendingRes.length,
    });

    // Get recent reservations
    const recent = [...reservations]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
    setRecentReservations(recent);
  }, []);

  // Prepare chart data
  const getChartData = () => {
    // Group reservations by month
    const data: Record<string, { reservations: number; revenue: number }> = {};
    
    reservations.forEach((res) => {
      const date = new Date(res.createdAt);
      const month = date.toLocaleString("fr-FR", { month: "short" });
      
      if (!data[month]) {
        data[month] = { reservations: 0, revenue: 0 };
      }
      
      data[month].reservations += 1;
      data[month].revenue += res.totalPrice;
    });
    
    return Object.entries(data).map(([month, values]) => ({
      name: month,
      reservations: values.reservations,
      revenue: values.revenue,
    }));
  };

  const formatPrice = (price: number) => {
    return `${price} TND`;
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "en attente":
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmée":
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "annulée":
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "terminée":
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "rejetée":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout
      title="Tableau de bord"
      description="Vue d'ensemble de l'activité de votre entreprise"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" /> Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats.totalUsers}
            </div>
            <CardDescription>utilisateurs inscrits</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Car className="h-5 w-5 text-green-600" /> Véhicules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats.totalCars}
            </div>
            <CardDescription>véhicules disponibles</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" /> Réservations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats.totalReservations}
            </div>
            <CardDescription>
              dont {stats.pendingReservations} en attente
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Layout className="h-5 w-5 text-red-600" /> Revenus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatPrice(stats.totalRevenue)}
            </div>
            <CardDescription>chiffre d'affaires total</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Aperçu des réservations</CardTitle>
            <CardDescription>
              Réservations et revenus par mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#82ca9d"
                  />
                  <Tooltip formatter={(value, name) => {
                    if (name === "revenue") return formatPrice(value as number);
                    return value;
                  }} />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="reservations"
                    name="Réservations"
                    fill="#8884d8"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="revenue"
                    name="Revenus (TND)"
                    fill="#82ca9d"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Réservations récentes</CardTitle>
            <CardDescription>
              Les 5 dernières réservations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReservations.map((reservation: any) => {
                const carInfo = cars.find((c) => c.id === reservation.carId);
                const userInfo = users.find((u) => u.id === reservation.userId);
                
                return (
                  <div key={reservation.id} className="flex justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{carInfo?.brand} {carInfo?.model}</p>
                      <p className="text-sm text-gray-500">{userInfo?.firstName} {userInfo?.lastName}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(reservation.status)}`}>
                        {reservation.status}
                      </span>
                      <p className="text-sm">{formatPrice(reservation.totalPrice)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/cars" className="group">
          <Card className="transition-all hover:border-autowise-blue">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Gérer les véhicules
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-autowise-blue group-hover:translate-x-1 transition-all" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Ajouter, modifier ou supprimer des véhicules de votre flotte.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/users" className="group">
          <Card className="transition-all hover:border-autowise-blue">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Gérer les utilisateurs
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-autowise-blue group-hover:translate-x-1 transition-all" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Consulter et gérer les comptes utilisateurs.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/reservations" className="group">
          <Card className="transition-all hover:border-autowise-blue">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Gérer les réservations
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-autowise-blue group-hover:translate-x-1 transition-all" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Approuver, annuler ou consulter les réservations.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </AdminLayout>
  );
}
