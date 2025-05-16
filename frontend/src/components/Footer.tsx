
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Phone, 
  Mail, 
  MapPin 
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-autowise-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/43daed69-9290-490b-99c3-7d35f12ec6d5.png" 
                alt="AutoWise Logo" 
                className="h-10" 
              />
            </Link>
            <p className="text-gray-300 mb-4">
              AutoWise propose des solutions de location de voitures fiables et abordables en Tunisie pour tous vos besoins.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Accueil</Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-300 hover:text-white">Nos véhicules</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">Services</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">À propos</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/rental" className="text-gray-300 hover:text-white">Location de voitures</Link>
              </li>
              <li>
                <Link to="/services/driver" className="text-gray-300 hover:text-white">Service chauffeur</Link>
              </li>
              <li>
                <Link to="/services/insurance" className="text-gray-300 hover:text-white">Assurances</Link>
              </li>
              <li>
                <Link to="/services/assistance" className="text-gray-300 hover:text-white">Assistance routière</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contactez-nous</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-autowise-blue" />
                <span>+216 71 123 456</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-autowise-blue" />
                <span>contact@autowise.tn</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-autowise-blue mt-1" />
                <span>123 Avenue Habib Bourguiba, Tunis 1000, Tunisie</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} AutoWise. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
