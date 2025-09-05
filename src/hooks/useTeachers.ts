import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subjects: string[];
  classes: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedData = data?.map(teacher => ({
        id: teacher.id,
        firstName: teacher.first_name,
        lastName: teacher.last_name,
        email: teacher.email,
        phone: teacher.phone,
        subjects: teacher.subjects || [],
        classes: teacher.classes || [],
        status: teacher.status as 'active' | 'inactive',
        createdAt: teacher.created_at,
      })) || [];

      setTeachers(formattedData);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les enseignants",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const addTeacher = async (teacherData: Omit<Teacher, 'id' | 'createdAt' | 'subjects'>) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('teachers')
        .insert({
          first_name: teacherData.firstName,
          last_name: teacherData.lastName,
          email: teacherData.email,
          phone: teacherData.phone,
          classes: teacherData.classes || [],
          status: teacherData.status,
        })
        .select()
        .single();

      if (error) throw error;

      const newTeacher: Teacher = {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phone: data.phone,
        subjects: data.subjects || [],
        classes: data.classes || [],
        status: data.status as 'active' | 'inactive',
        createdAt: data.created_at,
      };

      setTeachers(prev => [newTeacher, ...prev]);
      toast({
        title: "Succès",
        description: "Enseignant ajouté avec succès",
      });
      return newTeacher;
    } catch (error) {
      console.error('Error adding teacher:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'enseignant",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTeacher = async (id: string, updates: Partial<Teacher>) => {
    setIsLoading(true);
    try {
      const updateData: any = {};
      if (updates.firstName) updateData.first_name = updates.firstName;
      if (updates.lastName) updateData.last_name = updates.lastName;
      if (updates.email) updateData.email = updates.email;
      if (updates.phone) updateData.phone = updates.phone;
      if (updates.subjects) updateData.subjects = updates.subjects;
      if (updates.classes) updateData.classes = updates.classes;
      if (updates.status) updateData.status = updates.status;

      const { error } = await supabase
        .from('teachers')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      setTeachers(prev => 
        prev.map(teacher => 
          teacher.id === id ? { ...teacher, ...updates } : teacher
        )
      );

      toast({
        title: "Succès",
        description: "Enseignant modifié avec succès",
      });
    } catch (error) {
      console.error('Error updating teacher:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'enseignant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTeacher = async (id: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('teachers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTeachers(prev => prev.filter(teacher => teacher.id !== id));
      toast({
        title: "Succès",
        description: "Enseignant supprimé avec succès",
      });
    } catch (error) {
      console.error('Error deleting teacher:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'enseignant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    teachers,
    isLoading,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    fetchTeachers,
  };
};