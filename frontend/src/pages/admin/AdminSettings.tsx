
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Save, RefreshCw } from "lucide-react";

export default function AdminSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "AutoWise",
    email: "contact@autowise.com",
    phone: "+216 71 123 456",
    address: "123 Rue Principale, Tunis, Tunisie"
  });

  const [bookingSettings, setBookingSettings] = useState({
    minBookingDuration: 1,
    maxBookingDuration: 30,
    allowSameDayBooking: true,
    advanceBookingDays: 90,
    depositPercentage: 30
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    adminNewBookingAlert: true,
    customerBookingConfirmation: true,
    customerReminderBeforeDeparture: true,
    customerFeedbackRequest: true
  });

  const [seoSettings, setSeoSettings] = useState({
    siteTitle: "AutoWise - Location de Voitures en Tunisie",
    siteDescription: "Location de voitures à prix compétitifs en Tunisie. Large gamme de véhicules pour tous vos besoins.",
    keywords: "location voiture, tunisie, pas cher, luxe, autowise",
    googleAnalyticsId: "UA-XXXXXXXX-X"
  });

  // Simulation d'une opération de sauvegarde
  const handleSaveSettings = (type: string) => {
    let message = "";
    
    switch(type) {
      case "general":
        message = "Paramètres généraux mis à jour";
        break;
      case "booking":
        message = "Paramètres de réservation mis à jour";
        break;
      case "notification":
        message = "Paramètres de notification mis à jour";
        break;
      case "seo":
        message = "Paramètres SEO mis à jour";
        break;
      default:
        message = "Paramètres mis à jour";
    }

    toast({
      title: "Paramètres sauvegardés",
      description: message
    });
  };

  return (
    <AdminLayout title="Paramètres" description="Configurez les paramètres de votre application">
      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="booking">Réservations</TabsTrigger>
          <TabsTrigger value="notification">Notifications</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
              <CardDescription>
                Configurez les informations de base de votre entreprise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Nom de l'entreprise</Label>
                  <Input 
                    id="companyName" 
                    value={generalSettings.companyName} 
                    onChange={(e) => setGeneralSettings({...generalSettings, companyName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={generalSettings.email} 
                    onChange={(e) => setGeneralSettings({...generalSettings, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input 
                    id="phone" 
                    value={generalSettings.phone} 
                    onChange={(e) => setGeneralSettings({...generalSettings, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Adresse</Label>
                  <Input 
                    id="address" 
                    value={generalSettings.address} 
                    onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("general")}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="booking">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de réservation</CardTitle>
              <CardDescription>
                Configurez les règles pour les réservations de véhicules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minBookingDuration">Durée minimum de location (jours)</Label>
                  <Input 
                    id="minBookingDuration" 
                    type="number" 
                    value={bookingSettings.minBookingDuration} 
                    onChange={(e) => setBookingSettings({...bookingSettings, minBookingDuration: parseInt(e.target.value)})}
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="maxBookingDuration">Durée maximum de location (jours)</Label>
                  <Input 
                    id="maxBookingDuration" 
                    type="number" 
                    value={bookingSettings.maxBookingDuration} 
                    onChange={(e) => setBookingSettings({...bookingSettings, maxBookingDuration: parseInt(e.target.value)})}
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="advanceBookingDays">Jours maximum de réservation à l'avance</Label>
                  <Input 
                    id="advanceBookingDays" 
                    type="number" 
                    value={bookingSettings.advanceBookingDays} 
                    onChange={(e) => setBookingSettings({...bookingSettings, advanceBookingDays: parseInt(e.target.value)})}
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="depositPercentage">Pourcentage de dépôt (%)</Label>
                  <Input 
                    id="depositPercentage" 
                    type="number" 
                    value={bookingSettings.depositPercentage} 
                    onChange={(e) => setBookingSettings({...bookingSettings, depositPercentage: parseInt(e.target.value)})}
                    min="0"
                    max="100"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="allowSameDayBooking"
                    checked={bookingSettings.allowSameDayBooking}
                    onCheckedChange={(checked) => setBookingSettings({...bookingSettings, allowSameDayBooking: checked})}
                  />
                  <Label htmlFor="allowSameDayBooking">Autoriser les réservations le jour même</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("booking")}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notification">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notifications</CardTitle>
              <CardDescription>
                Gérez les notifications envoyées aux clients et administrateurs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                  />
                  <Label htmlFor="emailNotifications">Notifications par email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="smsNotifications"
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                  />
                  <Label htmlFor="smsNotifications">Notifications par SMS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="adminNewBookingAlert"
                    checked={notificationSettings.adminNewBookingAlert}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, adminNewBookingAlert: checked})}
                  />
                  <Label htmlFor="adminNewBookingAlert">Alerter l'admin pour chaque nouvelle réservation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="customerBookingConfirmation"
                    checked={notificationSettings.customerBookingConfirmation}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, customerBookingConfirmation: checked})}
                  />
                  <Label htmlFor="customerBookingConfirmation">Confirmation de réservation au client</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="customerReminderBeforeDeparture"
                    checked={notificationSettings.customerReminderBeforeDeparture}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, customerReminderBeforeDeparture: checked})}
                  />
                  <Label htmlFor="customerReminderBeforeDeparture">Rappel avant le début de location</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="customerFeedbackRequest"
                    checked={notificationSettings.customerFeedbackRequest}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, customerFeedbackRequest: checked})}
                  />
                  <Label htmlFor="customerFeedbackRequest">Demande d'avis après la location</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("notification")}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres SEO</CardTitle>
              <CardDescription>
                Optimisez votre site pour les moteurs de recherche
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="siteTitle">Titre du site</Label>
                  <Input 
                    id="siteTitle" 
                    value={seoSettings.siteTitle} 
                    onChange={(e) => setSeoSettings({...seoSettings, siteTitle: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="siteDescription">Meta description</Label>
                  <Input 
                    id="siteDescription" 
                    value={seoSettings.siteDescription} 
                    onChange={(e) => setSeoSettings({...seoSettings, siteDescription: e.target.value})}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Description affichée dans les résultats de recherche (maximum 160 caractères)
                  </p>
                </div>
                <div>
                  <Label htmlFor="keywords">Mots-clés</Label>
                  <Input 
                    id="keywords" 
                    value={seoSettings.keywords} 
                    onChange={(e) => setSeoSettings({...seoSettings, keywords: e.target.value})}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Séparés par des virgules
                  </p>
                </div>
                <div>
                  <Label htmlFor="googleAnalyticsId">ID Google Analytics</Label>
                  <Input 
                    id="googleAnalyticsId" 
                    value={seoSettings.googleAnalyticsId} 
                    onChange={(e) => setSeoSettings({...seoSettings, googleAnalyticsId: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSeoSettings({
                siteTitle: "AutoWise - Location de Voitures en Tunisie",
                siteDescription: "Location de voitures à prix compétitifs en Tunisie. Large gamme de véhicules pour tous vos besoins.",
                keywords: "location voiture, tunisie, pas cher, luxe, autowise",
                googleAnalyticsId: "UA-XXXXXXXX-X"
              })}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Réinitialiser
              </Button>
              <Button onClick={() => handleSaveSettings("seo")}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
