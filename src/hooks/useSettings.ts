import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface SchoolSettings {
  name: string;
  type: string;
  address: string;
  phone: string;
  email: string;
  school_year: string;
  currency: string;
  email_notifications: boolean;
  maintenance_mode: boolean;
}

interface User {
  id: string;
  email: string;
  role: string;
  permissions: {
    manage_students: boolean;
    manage_finances: boolean;
    generate_reports: boolean;
    system_admin: boolean;
  };
}

interface SecuritySettings {
  two_factor_enabled: boolean;
  auto_logout: boolean;
  session_timeout: number;
}

export const useSettings = () => {
  const [schoolSettings, setSchoolSettings] = useState<SchoolSettings>({
    name: 'Complexe Scolaire La Roseraie',
    type: 'Primaire et Maternelle',
    address: '',
    phone: '',
    email: '',
    school_year: '2023-2024',
    currency: 'FCFA',
    email_notifications: true,
    maintenance_mode: false
  });
  
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      email: 'admin@laroseraie.edu',
      role: 'Administrateur Principal',
      permissions: {
        manage_students: true,
        manage_finances: true,
        generate_reports: true,
        system_admin: true
      }
    }
  ]);

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    two_factor_enabled: false,
    auto_logout: true,
    session_timeout: 30
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simulate loading settings
  useEffect(() => {
    // Load from Supabase or localStorage
  }, []);

  const updateSchoolSettings = async (newSettings: Partial<SchoolSettings>) => {
    setIsLoading(true);
    try {
      setSchoolSettings(prev => ({ ...prev, ...newSettings }));
      
      toast({
        title: "Paramètres sauvegardés",
        description: "Les informations de l'école ont été mises à jour",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les paramètres",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (userData: {
    email: string;
    role: string;
    permissions: User['permissions'];
  }) => {
    setIsLoading(true);
    try {
      const newUser: User = {
        id: Date.now().toString(),
        ...userData
      };

      setUsers(prev => [...prev, newUser]);
      
      toast({
        title: "Utilisateur ajouté",
        description: `Nouvel utilisateur créé: ${userData.email}`,
      });
      
      return newUser;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'utilisateur",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserPermissions = async (userId: string, permissions: User['permissions']) => {
    setIsLoading(true);
    try {
      setUsers(prev => 
        prev.map(user => 
          user.id === userId ? { ...user, permissions } : user
        )
      );
      
      toast({
        title: "Permissions mises à jour",
        description: "Les permissions de l'utilisateur ont été modifiées",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier les permissions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateSecuritySettings = async (newSettings: Partial<SecuritySettings>) => {
    setIsLoading(true);
    try {
      setSecuritySettings(prev => ({ ...prev, ...newSettings }));
      
      toast({
        title: "Sécurité mise à jour",
        description: "Les paramètres de sécurité ont été modifiés",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier les paramètres de sécurité",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    setIsLoading(true);
    try {
      // Simulate password change
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Mot de passe modifié",
        description: "Votre mot de passe a été changé avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de changer le mot de passe",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = async (format: 'json' | 'csv' | 'excel') => {
    setIsLoading(true);
    try {
      // Simulate data export
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Export réussi",
        description: `Les données ont été exportées au format ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: "Impossible d'exporter les données",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const importData = async (file: File) => {
    setIsLoading(true);
    try {
      // Simulate data import
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Import réussi",
        description: `Les données de ${file.name} ont été importées`,
      });
    } catch (error) {
      toast({
        title: "Erreur d'import",
        description: "Impossible d'importer les données",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetSystem = async () => {
    setIsLoading(true);
    try {
      // Simulate system reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Système réinitialisé",
        description: "Toutes les données ont été supprimées",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de réinitialiser le système",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    schoolSettings,
    users,
    securitySettings,
    isLoading,
    updateSchoolSettings,
    createUser,
    updateUserPermissions,
    updateSecuritySettings,
    changePassword,
    exportData,
    importData,
    resetSystem
  };
};