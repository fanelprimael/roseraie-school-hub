import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

  // Charger les matières au démarrage
  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedSubjects: Subject[] = data.map(subject => ({
        id: subject.id,
        name: subject.name,
        coefficient: subject.coefficient,
        category: subject.category as 'core' | 'optional' | 'extra',
        createdAt: subject.created_at,
      }));

      setSubjects(formattedSubjects);
    } catch (error) {
      console.error('Erreur lors du chargement des matières:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
      return newSubject;
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
  };
};