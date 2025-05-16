
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import FileUpload from "@/components/FileUpload";
import { User } from "@/lib/types";
import { Loader2, Save } from "lucide-react";

export function ProfileSettings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<Partial<User>>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    cinPassport: "",
  });
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    browser: true,
    sms: false,
  });
  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        postalCode: user.postalCode || "",
        cinPassport: user.cinPassport || "",
      });
      
      setNotificationPreferences({
        email: user.notificationPreferences?.email ?? true,
        browser: user.notificationPreferences?.browser ?? true,
        sms: user.notificationPreferences?.sms ?? false,
      });
    }
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: keyof typeof notificationPreferences) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simuler une mise à jour de profil avec délai
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Dans une application réelle, appel à l'API pour mettre à jour le profil
      // await updateUserProfile(profileData);
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations personnelles ont été mises à jour avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour de votre profil.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation simple
      if (changePassword.newPassword !== changePassword.confirmPassword) {
        toast({
          title: "Erreur",
          description: "Les mots de passe ne correspondent pas.",
          variant: "destructive",
        });
        return;
      }

      if (changePassword.newPassword.length < 8) {
        toast({
          title: "Erreur",
          description: "Le mot de passe doit contenir au moins 8 caractères.",
          variant: "destructive",
        });
        return;
      }

      // Simuler une mise à jour de mot de passe avec délai
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Dans une application réelle, appel à l'API pour changer le mot de passe
      // await changeUserPassword(changePassword.currentPassword, changePassword.newPassword);
      
      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été modifié avec succès.",
      });
      
      // Réinitialiser le formulaire
      setChangePassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour de votre mot de passe.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNotifications = async () => {
    setLoading(true);

    try {
      // Simuler une mise à jour des préférences avec délai
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Dans une application réelle, appel à l'API pour mettre à jour les préférences
      // await updateNotificationPreferences(notificationPreferences);
      
      toast({
        title: "Préférences mises à jour",
        description: "Vos préférences de notification ont été mises à jour avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des préférences:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour de vos préférences de notification.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureChange = async (file: File | null) => {
    try {
      if (file) {
        // Simuler un téléchargement de fichier
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Créer une URL pour l'aperçu de l'image
        const url = URL.createObjectURL(file);
        setProfileData((prev) => ({ ...prev, profilePicture: url }));
      }
      
      // Dans une application réelle, appel à l'API pour mettre à jour la photo de profil
      // await updateUserProfile({ profilePicture: url });
      
      toast({
        title: "Photo de profil mise à jour",
        description: "Votre photo de profil a été mise à jour avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la photo de profil:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour de votre photo de profil.",
        variant: "destructive",
      });
    }
  };

  return (
    <Tabs defaultValue="profile">
      <TabsList className="mb-4">
        <TabsTrigger value="profile">Profil</TabsTrigger>
        <TabsTrigger value="security">Sécurité</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      
      {/* Profil */}
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Information personnelles</CardTitle>
            <CardDescription>
              Mettez à jour vos informations personnelles et vos coordonnées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile}>
              <div className="space-y-4">
                <div className="mx-auto max-w-xs mb-6">
                  <div className="mb-4 text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto bg-gray-100">
                      <img
                        src={profileData.profilePicture || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                        alt="Photo de profil"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Téléverser une nouvelle photo</p>
                  </div>
                  
                  <FileUpload 
                    onFileSelect={handleProfilePictureChange}
                    acceptedFileTypes="image/*"
                    maxSizeInMB={5}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cinPassport">CIN / Numéro de passeport</Label>
                  <Input
                    id="cinPassport"
                    name="cinPassport"
                    value={profileData.cinPassport}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Code postal</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={profileData.postalCode}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleUpdateProfile} 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mise à jour...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      {/* Sécurité */}
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Sécurité du compte</CardTitle>
            <CardDescription>
              Mettez à jour votre mot de passe et les paramètres de sécurité
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdatePassword}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={changePassword.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={changePassword.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={changePassword.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleUpdatePassword} 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mise à jour...
                </>
              ) : (
                "Changer le mot de passe"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      {/* Notifications */}
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Préférences de notification</CardTitle>
            <CardDescription>
              Personnalisez comment et quand vous souhaitez être notifié
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Notifications par email</Label>
                <p className="text-sm text-gray-500">
                  Recevez des notifications par email pour les réservations et les offres
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={notificationPreferences.email}
                onCheckedChange={() => handleNotificationChange("email")}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="browser-notifications">Notifications navigateur</Label>
                <p className="text-sm text-gray-500">
                  Recevez des notifications dans votre navigateur web
                </p>
              </div>
              <Switch
                id="browser-notifications"
                checked={notificationPreferences.browser}
                onCheckedChange={() => handleNotificationChange("browser")}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications">Notifications par SMS</Label>
                <p className="text-sm text-gray-500">
                  Recevez des notifications par SMS sur votre téléphone portable
                </p>
              </div>
              <Switch
                id="sms-notifications"
                checked={notificationPreferences.sms}
                onCheckedChange={() => handleNotificationChange("sms")}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleUpdateNotifications} 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mise à jour...
                </>
              ) : (
                "Enregistrer les préférences"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
