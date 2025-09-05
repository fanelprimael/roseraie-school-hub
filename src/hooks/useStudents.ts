import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  class: string;
  status: 'active' | 'inactive';
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  createdAt: string;
}

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedData = data?.map(student => ({
        id: student.id,
        firstName: student.first_name,
        lastName: student.last_name,
        dateOfBirth: student.date_of_birth,
        class: student.class,
        status: student.status as 'active' | 'inactive',
        parentName: student.parent_name,
        parentPhone: student.parent_phone,
        parentEmail: student.parent_email,
        address: student.address,
        createdAt: student.created_at,
      })) || [];

      setStudents(formattedData);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les étudiants",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (studentData: Omit<Student, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('students')
        .insert({
          first_name: studentData.firstName,
          last_name: studentData.lastName,
          date_of_birth: studentData.dateOfBirth,
          class: studentData.class,
          status: studentData.status,
          parent_name: studentData.parentName,
          parent_phone: studentData.parentPhone,
          parent_email: studentData.parentEmail,
          address: studentData.address,
        })
        .select()
        .single();

      if (error) throw error;

      const newStudent: Student = {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        dateOfBirth: data.date_of_birth,
        class: data.class,
        status: data.status as 'active' | 'inactive',
        parentName: data.parent_name,
        parentPhone: data.parent_phone,
        parentEmail: data.parent_email,
        address: data.address,
        createdAt: data.created_at,
      };

      setStudents(prev => [newStudent, ...prev]);
      toast({
        title: "Succès",
        description: "Étudiant ajouté avec succès",
      });
      return newStudent;
    } catch (error) {
      console.error('Error adding student:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'étudiant",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    setIsLoading(true);
    try {
      const updateData: any = {};
      if (updates.firstName) updateData.first_name = updates.firstName;
      if (updates.lastName) updateData.last_name = updates.lastName;
      if (updates.dateOfBirth) updateData.date_of_birth = updates.dateOfBirth;
      if (updates.class) updateData.class = updates.class;
      if (updates.status) updateData.status = updates.status;
      if (updates.parentName) updateData.parent_name = updates.parentName;
      if (updates.parentPhone) updateData.parent_phone = updates.parentPhone;
      if (updates.parentEmail) updateData.parent_email = updates.parentEmail;
      if (updates.address) updateData.address = updates.address;

      const { error } = await supabase
        .from('students')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      setStudents(prev => 
        prev.map(student => 
          student.id === id ? { ...student, ...updates } : student
        )
      );

      toast({
        title: "Succès",
        description: "Étudiant modifié avec succès",
      });
    } catch (error) {
      console.error('Error updating student:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'étudiant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteStudent = async (id: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setStudents(prev => prev.filter(student => student.id !== id));
      toast({
        title: "Succès",
        description: "Étudiant supprimé avec succès",
      });
    } catch (error) {
      console.error('Error deleting student:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'étudiant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    students,
    isLoading,
    addStudent,
    updateStudent,
    deleteStudent,
    fetchStudents,
  };
};