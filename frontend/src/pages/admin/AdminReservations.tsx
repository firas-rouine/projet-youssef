
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { reservationService } from "@/services/reservationService";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import { Search, FileText, Check, X, Clock, Calendar } from "lucide-react";
import { ReservationStatus, PaymentStatus } from "@/lib/types";

// Types
interface Reservation {
  id: string;
  userId: string;
  carId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: ReservationStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  userName: string;
  carName: string;
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadReservations = async () => {
      setLoading(true);
      try {
        // Conversion des statuts en anglais pour la cohérence avec les types
        const data = await reservationService.getAllReservations();
        const convertedData = data.map((res: any) => ({
          ...res,
          status: mapStatusToEnglish(res.status),
        }));
        setReservations(convertedData);
        setFilteredReservations(convertedData);
      } catch (error) {
        console.error("Error loading reservations:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les réservations",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadReservations();
  }, [toast]);

  // Fonction pour convertir les statuts français en anglais
  const mapStatusToEnglish = (frenchStatus: string): ReservationStatus => {
    const statusMap: Record<string, ReservationStatus> = {
      "en attente": "pending",
      "confirmée": "confirmed",
      "annulée": "cancelled",
      "terminée": "completed",
      "rejetée": "cancelled" // Mapping "rejetée" to "cancelled" for compatibility
    };
    
    return statusMap[frenchStatus] || "pending";
  };
  
  // Fonction pour convertir les statuts anglais en français
  const mapStatusToFrench = (englishStatus: ReservationStatus): string => {
    const statusMap: Record<string, string> = {
      "pending": "En attente",
      "confirmed": "Confirmé",
      "cancelled": "Annulé",
      "completed": "Terminé"
    };
    
    return statusMap[englishStatus] || "En attente";
  };
  
  // Filtrer les réservations à chaque modification du terme de recherche ou du filtre d'état
  useEffect(() => {
    let filtered = [...reservations];
    
    // Filtre par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(
        reservation =>
          reservation.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reservation.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reservation.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtre par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter(reservation => reservation.status === statusFilter);
    }
    
    setFilteredReservations(filtered);
  }, [searchTerm, statusFilter, reservations]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };
  
  const openDetailDialog = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setDetailDialogOpen(true);
  };
  
  const handleConfirmReservation = async () => {
    if (!selectedReservation) return;
    
    try {
      await reservationService.updateReservationStatus(selectedReservation.id, "confirmed");
      
      // Mise à jour de l'état local
      const updatedReservations = reservations.map(res =>
        res.id === selectedReservation.id ? { ...res, status: "confirmed" as ReservationStatus } : res
      );
      
      setReservations(updatedReservations);
      setFilteredReservations(updatedReservations);
      
      toast({
        title: "Réservation confirmée",
        description: `La réservation ${selectedReservation.id} a été confirmée avec succès.`
      });
      
      setConfirmDialogOpen(false);
      setDetailDialogOpen(false);
    } catch (error) {
      console.error("Error confirming reservation:", error);
      toast({
        title: "Erreur",
        description: "Impossible de confirmer la réservation",
        variant: "destructive",
      });
    }
  };
  
  const handleCancelReservation = async () => {
    if (!selectedReservation) return;
    
    try {
      await reservationService.updateReservationStatus(selectedReservation.id, "cancelled");
      
      // Mise à jour de l'état local
      const updatedReservations = reservations.map(res =>
        res.id === selectedReservation.id ? { ...res, status: "cancelled" as ReservationStatus } : res
      );
      
      setReservations(updatedReservations);
      setFilteredReservations(updatedReservations);
      
      toast({
        title: "Réservation annulée",
        description: `La réservation ${selectedReservation.id} a été annulée avec succès.`
      });
      
      setCancelDialogOpen(false);
      setDetailDialogOpen(false);
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'annuler la réservation",
        variant: "destructive",
      });
    }
  };
  
  const handleCompleteReservation = async () => {
    if (!selectedReservation) return;
    
    try {
      await reservationService.updateReservationStatus(selectedReservation.id, "completed");
      
      // Mise à jour de l'état local
      const updatedReservations = reservations.map(res =>
        res.id === selectedReservation.id ? { ...res, status: "completed" as ReservationStatus } : res
      );
      
      setReservations(updatedReservations);
      setFilteredReservations(updatedReservations);
      
      toast({
        title: "Réservation terminée",
        description: `La réservation ${selectedReservation.id} a été marquée comme terminée.`
      });
      
      setCompleteDialogOpen(false);
      setDetailDialogOpen(false);
    } catch (error) {
      console.error("Error completing reservation:", error);
      toast({
        title: "Erreur",
        description: "Impossible de terminer la réservation",
        variant: "destructive",
      });
    }
  };
  
  const getStatusBadge = (status: ReservationStatus) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            En attente
          </span>
        );
      case "confirmed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="w-3 h-3 mr-1" />
            Confirmé
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <X className="w-3 h-3 mr-1" />
            Annulé
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Check className="w-3 h-3 mr-1" />
            Terminé
          </span>
        );
      default:
        return null;
    }
  };
  
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            En attente
          </span>
        );
      case "paid":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Payé
          </span>
        );
      case "refunded":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Remboursé
          </span>
        );
      default:
        return null;
    }
  };
  
  const DetailActions = () => {
    if (!selectedReservation) return null;
    
    return (
      <div className="flex flex-wrap gap-2 mt-4 justify-end">
        {selectedReservation.status === "pending" && (
          <>
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50"
              onClick={() => setCancelDialogOpen(true)}
            >
              <X className="mr-2 h-4 w-4" />
              Annuler
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setConfirmDialogOpen(true)}
            >
              <Check className="mr-2 h-4 w-4" />
              Confirmer
            </Button>
          </>
        )}
        
        {(selectedReservation.status === "confirmed" || selectedReservation.status === "pending") && (
          <Button
            variant="outline"
            onClick={() => setCompleteDialogOpen(true)}
          >
            <Check className="mr-2 h-4 w-4" />
            Marquer comme terminée
          </Button>
        )}
        
        {selectedReservation.status === "completed" && selectedReservation.paymentStatus === "paid" && (
          <Button
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-50"
            onClick={() => setRefundDialogOpen(true)}
          >
            Rembourser
          </Button>
        )}
      </div>
    );
  };
  
  return (
    <AdminLayout title="Gestion des réservations" description="Gérez les réservations clients">
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="relative w-full sm:w-64">
              <Input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-9"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="confirmed">Confirmé</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {loading ? (
            <div className="text-center py-10">
              <p>Chargement des réservations...</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Véhicule</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Paiement</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10">
                        Aucune réservation trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell className="font-mono text-xs">
                          {reservation.id.substring(0, 8)}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{reservation.userName}</div>
                          <div className="text-sm text-gray-500">{reservation.userId.substring(0, 8)}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{reservation.carName}</div>
                          <div className="text-sm text-gray-500">{reservation.carId.substring(0, 8)}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                            {format(new Date(reservation.startDate), "dd/MM/yy", { locale: fr })} - {format(new Date(reservation.endDate), "dd/MM/yy", { locale: fr })}
                          </div>
                        </TableCell>
                        <TableCell>{reservation.totalPrice} TND</TableCell>
                        <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                        <TableCell>{getPaymentStatusBadge(reservation.paymentStatus)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDetailDialog(reservation)}
                          >
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">Détails</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </div>
      
      {/* Dialogue de détails */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Détails de la réservation</DialogTitle>
          </DialogHeader>
          
          {selectedReservation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">ID de réservation</h3>
                  <p className="font-mono">{selectedReservation.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Date de création</h3>
                  <p>{format(new Date(selectedReservation.createdAt), "PPP", { locale: fr })}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Client</h3>
                <p className="font-medium">{selectedReservation.userName}</p>
                <p className="text-sm text-gray-500">ID: {selectedReservation.userId}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Véhicule</h3>
                <p className="font-medium">{selectedReservation.carName}</p>
                <p className="text-sm text-gray-500">ID: {selectedReservation.carId}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Date de début</h3>
                  <p>{format(new Date(selectedReservation.startDate), "PPP", { locale: fr })}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Date de fin</h3>
                  <p>{format(new Date(selectedReservation.endDate), "PPP", { locale: fr })}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Statut</h3>
                  <div>{getStatusBadge(selectedReservation.status)}</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Paiement</h3>
                  <div>{getPaymentStatusBadge(selectedReservation.paymentStatus)}</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Montant total</h3>
                <p className="text-xl font-bold">{selectedReservation.totalPrice} TND</p>
              </div>
              
              <DetailActions />
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Dialogue de confirmation */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la réservation</DialogTitle>
          </DialogHeader>
          <p>
            Êtes-vous sûr de vouloir confirmer cette réservation ? Un email de confirmation sera envoyé au client.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>Annuler</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleConfirmReservation}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue d'annulation */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Annuler la réservation</DialogTitle>
          </DialogHeader>
          <p>
            Êtes-vous sûr de vouloir annuler cette réservation ? Un email de notification sera envoyé au client.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>Retour</Button>
            <Button variant="destructive" onClick={handleCancelReservation}>
              Annuler la réservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue de finalisation */}
      <Dialog open={completeDialogOpen} onOpenChange={setCompleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Terminer la réservation</DialogTitle>
          </DialogHeader>
          <p>
            Êtes-vous sûr de vouloir marquer cette réservation comme terminée ? Cette action indique que le client a rendu le véhicule.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCompleteDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleCompleteReservation}>
              Marquer comme terminée
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
