import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Class {
  id: string;
  name: string;
  level: string;
  teacher: string;
  capacity: number;
  studentCount: number;
  createdAt: string;
}

export const useClasses = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Charger les classes au démarrage
  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedClasses: Class[] = data.map(cls => ({
        id: cls.id,
        name: cls.name,
        level: cls.level,
        teacher: cls.teacher,
        capacity: cls.capacity,
        studentCount: cls.student_count,
        createdAt: cls.created_at,
      }));

      setClasses(formattedClasses);
    } catch (error) {
      console.error('Erreur lors du chargement des classes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addClass = async (classData: Omit<Class, 'id' | 'createdAt' | 'studentCount'>) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('classes')
        .insert({
          name: classData.name,
          level: classData.level,
          teacher: classData.teacher,
          capacity: classData.capacity,
        })
        .select()
        .single();

      if (error) throw error;

      const newClass: Class = {
        id: data.id,
        name: data.name,
        level: data.level,
        teacher: data.teacher,
        capacity: data.capacity,
        studentCount: data.student_count,
        createdAt: data.created_at,
      };

      setClasses(prev => [newClass, ...prev]);
      return newClass;
    } finally {
      setIsLoading(false);
    }
  };

  const updateClass = async (id: string, updates: Partial<Class>) => {
    setIsLoading(true);
    try {
      const updateData: any = {};
      if (updates.name) updateData.name = updates.name;
      if (updates.level) updateData.level = updates.level;
      if (updates.teacher) updateData.teacher = updates.teacher;
      if (updates.capacity !== undefined) updateData.capacity = updates.capacity;
      if (updates.studentCount !== undefined) updateData.student_count = updates.studentCount;

      const { error } = await supabase
        .from('classes')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      setClasses(prev => 
        prev.map(cls => 
          cls.id === id ? { ...cls, ...updates } : cls
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteClass = async (id: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('classes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setClasses(prev => prev.filter(cls => cls.id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    classes,
    isLoading,
    addClass,
    updateClass,
    deleteClass,
  };
};