import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

  // Charger les enseignants au démarrage
  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedTeachers: Teacher[] = data.map(teacher => ({
        id: teacher.id,
        firstName: teacher.first_name,
        lastName: teacher.last_name,
        email: teacher.email,
        phone: teacher.phone,
        subjects: teacher.subjects || [],
        classes: teacher.classes || [],
        status: teacher.status as 'active' | 'inactive',
        createdAt: teacher.created_at,
      }));

      setTeachers(formattedTeachers);
    } catch (error) {
      console.error('Erreur lors du chargement des enseignants:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
          classes: teacherData.classes,
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
      return newTeacher;
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
  };
};