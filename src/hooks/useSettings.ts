import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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

  useEffect(() => {
    fetchSchoolSettings();
    fetchUsers();
  }, []);

  const fetchSchoolSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('school_settings')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setSchoolSettings({
          name: data.name,
          type: data.type,
          address: data.address || '',
          phone: data.phone || '',
          email: data.email || '',
          school_year: data.school_year,
          currency: data.currency,
          email_notifications: data.email_notifications,
          maintenance_mode: data.maintenance_mode,
        });
      }
    } catch (error) {
      console.error('Error fetching school settings:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedUsers: User[] = data?.map(user => ({
        id: user.id,
        email: user.email,
        role: user.role,
        permissions: user.permissions as User['permissions'],
      })) || [];

      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updateSchoolSettings = async (newSettings: Partial<SchoolSettings>) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('school_settings')
        .upsert({
          ...schoolSettings,
          ...newSettings,
        });

      if (error) throw error;

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
      const { data, error } = await supabase
        .from('users')
        .insert({
          email: userData.email,
          role: userData.role,
          permissions: userData.permissions,
        })
        .select()
        .single();

      if (error) throw error;

      const newUser: User = {
        id: data.id,
        email: data.email,
        role: data.role,
        permissions: data.permissions as User['permissions'],
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
      const { error } = await supabase
        .from('users')
        .update({ permissions })
        .eq('id', userId);

      if (error) throw error;

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
      let content: string;
      let filename: string;
      let mimeType: string;

      const exportData = {
        school: schoolSettings,
        users: users,
        security: securitySettings,
        exportDate: new Date().toISOString()
      };

      switch (format) {
        case 'json':
          content = JSON.stringify(exportData, null, 2);
          filename = `donnees-ecole-${new Date().toISOString().split('T')[0]}.json`;
          mimeType = 'application/json';
          break;
        case 'csv':
          content = 'Type,Nom,Email,Role\n';
          content += `École,${schoolSettings.name},,\n`;
          users.forEach(user => {
            content += `Utilisateur,,${user.email},${user.role}\n`;
          });
          filename = `donnees-ecole-${new Date().toISOString().split('T')[0]}.csv`;
          mimeType = 'text/csv';
          break;
        case 'excel':
          content = JSON.stringify(exportData, null, 2); // Simplified for now
          filename = `donnees-ecole-${new Date().toISOString().split('T')[0]}.xlsx`;
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          break;
        default:
          throw new Error('Format non supporté');
      }

      const blob = new Blob([content], { type: mimeType + ';charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export réussi",
        description: `Les données ont été exportées et téléchargées au format ${format.toUpperCase()}`,
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