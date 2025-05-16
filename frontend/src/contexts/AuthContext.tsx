
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { users } from '@/lib/mockData';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('autowise-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('autowise-user');
      }
    }
    setIsLoading(false);
  }, []);

  // Amélioré pour faciliter la connexion admin
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Special handling for admin login
    if (email.toLowerCase() === "admin@autowise.com" && password === "admin123") {
      const adminUser: User = {
        id: "admin-1",
        role: "admin",
        email: "admin@autowise.com",
        firstName: "Admin",
        lastName: "AutoWise",
        phoneNumber: "12345678",
        createdAt: new Date().toISOString(),
        notificationPreferences: {
          email: true,
          browser: true,
          sms: false,
        },
        profilePicture: "/placeholder.svg",
      };
      
      setUser(adminUser);
      localStorage.setItem('autowise-user', JSON.stringify(adminUser));
      setIsLoading(false);
      return true;
    }
    
    // Regular user login
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      // Dans une app réelle, on validerait le mot de passe ici
      setUser(foundUser);
      localStorage.setItem('autowise-user', JSON.stringify(foundUser));
      setIsLoading(false);
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${foundUser.firstName} ${foundUser.lastName}`,
      });
      return true;
    } else {
      toast({
        title: "Échec de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  // Mock register functionality
  const register = async (userData: Partial<User>, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const emailExists = users.some(u => u.email.toLowerCase() === userData.email?.toLowerCase());
    
    if (emailExists) {
      toast({
        title: "Échec de l'inscription",
        description: "Cet email est déjà utilisé",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }

    // Create new user
    const newUser: User = {
      id: `user-${Math.random().toString(36).substring(2, 9)}`,
      role: "client",
      email: userData.email || "",
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      phoneNumber: userData.phoneNumber || "",
      createdAt: new Date().toISOString(),
      notificationPreferences: {
        email: true,
        browser: true,
        sms: false,
      },
      profilePicture: "/placeholder.svg",
    };
    
    // Add to users array (in a real app, this would be a DB operation)
    users.push(newUser);
    
    // Log user in
    setUser(newUser);
    localStorage.setItem('autowise-user', JSON.stringify(newUser));
    
    toast({
      title: "Inscription réussie",
      description: "Votre compte a été créé avec succès",
    });
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('autowise-user');
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return false;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('autowise-user', JSON.stringify(updatedUser));
    
    // Update in the users array (simulating DB update)
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
    }
    
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été mises à jour avec succès",
    });
    
    setIsLoading(false);
    return true;
  };

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    // Simulate password change
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Mot de passe mis à jour",
      description: "Votre mot de passe a été modifié avec succès",
    });
    
    setIsLoading(false);
    return true;
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      updateUser,
      updatePassword,
      isAuthenticated,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
