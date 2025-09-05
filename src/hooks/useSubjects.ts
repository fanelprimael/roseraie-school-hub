import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Subject {
  id: string;
  name: string;
  coefficient: number;
  category: 'core' | 'optional' | 'extra';
  createdAt: string;
}

export const useSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedData = data?.map(subject => ({
        id: subject.id,
        name: subject.name,
        coefficient: subject.coefficient,
        category: subject.category as 'core' | 'optional' | 'extra',
        createdAt: subject.created_at,
      })) || [];

      setSubjects(formattedData);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les matières",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const addSubject = async (subjectData: Omit<Subject, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('subjects')
        .insert({
          name: subjectData.name,
          coefficient: subjectData.coefficient,
          category: subjectData.category,
        })
        .select()
        .single();

      if (error) throw error;

      const newSubject: Subject = {
        id: data.id,
        name: data.name,
        coefficient: data.coefficient,
        category: data.category as 'core' | 'optional' | 'extra',
        createdAt: data.created_at,
      };

      setSubjects(prev => [newSubject, ...prev]);
      toast({
        title: "Succès",
        description: "Matière ajoutée avec succès",
      });
      return newSubject;
    } catch (error) {
      console.error('Error adding subject:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la matière",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSubject = async (id: string, updates: Partial<Subject>) => {
    setIsLoading(true);
    try {
      const updateData: any = {};
      if (updates.name) updateData.name = updates.name;
      if (updates.coefficient !== undefined) updateData.coefficient = updates.coefficient;
      if (updates.category) updateData.category = updates.category;

      const { error } = await supabase
        .from('subjects')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      setSubjects(prev => 
        prev.map(subject => 
          subject.id === id ? { ...subject, ...updates } : subject
        )
      );

      toast({
        title: "Succès",
        description: "Matière modifiée avec succès",
      });
    } catch (error) {
      console.error('Error updating subject:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier la matière",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSubject = async (id: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('subjects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSubjects(prev => prev.filter(subject => subject.id !== id));
      toast({
        title: "Succès",
        description: "Matière supprimée avec succès",
      });
    } catch (error) {
      console.error('Error deleting subject:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la matière",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subjects,
    isLoading,
    addSubject,
    updateSubject,
    deleteSubject,
    fetchSubjects,
  };
};