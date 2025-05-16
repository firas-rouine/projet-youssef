
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulation d'envoi de message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      
      // Réinitialiser le formulaire
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-autowise-navy py-16 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contactez-nous</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous aider à trouver la solution parfaite à vos besoins de mobilité.
            </p>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Informations de contact */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-autowise-blue mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      123 Rue Principale<br />
                      Tunis, Tunisie 1002
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-autowise-blue mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Téléphone</h3>
                    <p className="text-gray-600">+216 71 123 456</p>
                    <p className="text-gray-600">+216 71 987 654</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-autowise-blue mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-600">info@autowise.com</p>
                    <p className="text-gray-600">support@autowise.com</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-autowise-blue mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Heures d'ouverture</h3>
                    <p className="text-gray-600">Lun - Ven: 8h - 18h</p>
                    <p className="text-gray-600">Sam: 9h - 16h</p>
                    <p className="text-gray-600">Dim: Fermé</p>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Formulaire de contact */}
            <div className="md:col-span-2">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="votre-email@exemple.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+216 XX XXX XXX"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Sujet</Label>
                      <select
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="reservation">Réservation de véhicule</option>
                        <option value="information">Demande d'information</option>
                        <option value="support">Support client</option>
                        <option value="partenariat">Partenariat</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Votre message..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full sm:w-auto bg-autowise-blue hover:bg-autowise-navy" disabled={loading}>
                    {loading ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
          
          {/* Carte (simulée) */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Notre emplacement</h2>
            <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Carte interactive sera affichée ici</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
