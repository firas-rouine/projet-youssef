import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  role: "admin" | "client";
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt: string;
  profilePicture: string;
  active: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "http://localhost:1337/api";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const jwt = localStorage.getItem("jwt");
      const storedUser = localStorage.getItem("autowise-user");
      if (jwt && storedUser) {
        try {
          const userData: User = JSON.parse(storedUser);
          const response = await axios.get(`${API_URL}/users/me?populate=role,profilePicture`, {
            headers: { Authorization: `Bearer ${jwt}` },
          });
          const isAdmin = response.data.role?.name === "Admin";
          setUser({ ...userData, role: isAdmin ? "admin" : "client" });
          setIsAuthenticated(true);
          setIsAdmin(isAdmin);
        } catch (error) {
          console.error("Error verifying auth:", error);
          localStorage.removeItem("jwt");
          localStorage.removeItem("autowise-user");
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/local`, {
        identifier: email,
        password,
      });
      const { jwt, user: strapiUser } = response.data;
      const userResponse = await axios.get(`${API_URL}/users/me?populate=role,profilePicture`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const isAdmin = userResponse.data.role?.name === "Admin";
      const mappedUser: User = {
        id: strapiUser.id.toString(),
        role: isAdmin ? "admin" : "client",
        email: strapiUser.email,
        firstName: strapiUser.firstName || "",
        lastName: strapiUser.lastName || "",
        phoneNumber: strapiUser.phoneNumber || "",
        createdAt: strapiUser.createdAt,
        profilePicture: strapiUser.profilePicture?.[0]?.url || "/placeholder.svg",
        active: strapiUser.active || false,
      };
      setUser(mappedUser);
      setIsAuthenticated(true);
      setIsAdmin(isAdmin);
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("autowise-user", JSON.stringify(mappedUser));
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur AutoWise",
      });
      return true;
    } catch (error: any) {
      console.error("Login error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        error,
      });
      const errorMessage =
        error.response?.data?.error?.message ||
        error.message ||
        "Erreur lors de la connexion";
      toast({
        title: "Échec de la connexion",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User>, password: string) => {
    setIsLoading(true);
    try {
      const payload = {
        username: userData.email,
        email: userData.email,
        password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        profilePicture: userData.profilePicture || null,
        active: userData.active ?? true,
      };
      console.debug("Registration payload:", payload);
      const response = await axios.post(`${API_URL}/auth/local/register`, payload);
      const { jwt, user: strapiUser } = response.data;
      const userResponse = await axios.get(`${API_URL}/users/me?populate=role,profilePicture`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.debug("User response:", userResponse.data); // Log response for debugging
      const isAdmin = userResponse.data.role?.name === "Admin" || false;
      const mappedUser: User = {
        id: strapiUser.id.toString(),
        role: isAdmin ? "admin" : "client",
        email: strapiUser.email,
        firstName: strapiUser.firstName || "",
        lastName: strapiUser.lastName || "",
        phoneNumber: strapiUser.phoneNumber || "",
        createdAt: strapiUser.createdAt,
        profilePicture: strapiUser.profilePicture?.[0]?.url || "/placeholder.svg",
        active: strapiUser.active || false,
      };
      setUser(mappedUser);
      setIsAuthenticated(true);
      setIsAdmin(isAdmin);
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("autowise-user", JSON.stringify(mappedUser));
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès",
      });
      return true;
    } catch (error: any) {
      console.error("Registration error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        // payload,
        error,
      });
      const errorMessage =
        error.response?.data?.error?.message ||
        error.message ||
        "Une erreur s'est produite lors de l'inscription";
      toast({
        title: "Échec de l'inscription",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("autowise-user");
    toast({
      title: "Déconnexion réussie",
      description: "Vous êtes déconnecté",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isAdmin, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};