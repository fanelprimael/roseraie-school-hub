import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Grade {
  id: string;
  student_id: string;
  student_name: string;
  subject_id?: string;
  subject_name: string;
  class_name: string;
  grade: number;
  coefficient: number;
  type: 'DS' | 'Interrogation' | 'Examen';
  date: string;
  createdAt: string;
}

export const useGrades = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchGrades = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('grades')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedData = data?.map(grade => ({
        id: grade.id,
        student_id: grade.student_id,
        student_name: grade.student_name,
        subject_id: grade.subject_id,
        subject_name: grade.subject_name,
        class_name: grade.class_name,
        grade: parseFloat(grade.grade.toString()),
        coefficient: grade.coefficient,
        type: grade.type as 'DS' | 'Interrogation' | 'Examen',
        date: grade.date,
        createdAt: grade.created_at,
      })) || [];

      setGrades(formattedData);
    } catch (error) {
      console.error('Error fetching grades:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les notes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  const addGrade = async (gradeData: Omit<Grade, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('grades')
        .insert({
          student_id: gradeData.student_id,
          student_name: gradeData.student_name,
          subject_id: gradeData.subject_id,
          subject_name: gradeData.subject_name,
          class_name: gradeData.class_name,
          grade: gradeData.grade,
          coefficient: gradeData.coefficient,
          type: gradeData.type,
          date: gradeData.date,
        })
        .select()
        .single();

      if (error) throw error;

      const newGrade: Grade = {
        id: data.id,
        student_id: data.student_id,
        student_name: data.student_name,
        subject_id: data.subject_id,
        subject_name: data.subject_name,
        class_name: data.class_name,
        grade: parseFloat(data.grade.toString()),
        coefficient: data.coefficient,
        type: data.type as 'DS' | 'Interrogation' | 'Examen',
        date: data.date,
        createdAt: data.created_at,
      };

      setGrades(prev => [newGrade, ...prev]);
      toast({
        title: "Succès",
        description: "Note ajoutée avec succès",
      });
      return newGrade;
    } catch (error) {
      console.error('Error adding grade:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la note",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateGrade = async (id: string, updates: Partial<Grade>) => {
    setIsLoading(true);
    try {
      const updateData: any = {};
      if (updates.grade !== undefined) updateData.grade = updates.grade;
      if (updates.coefficient !== undefined) updateData.coefficient = updates.coefficient;
      if (updates.type) updateData.type = updates.type;
      if (updates.date) updateData.date = updates.date;

      const { error } = await supabase
        .from('grades')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      setGrades(prev => 
        prev.map(grade => 
          grade.id === id ? { ...grade, ...updates } : grade
        )
      );

      toast({
        title: "Succès",
        description: "Note modifiée avec succès",
      });
    } catch (error) {
      console.error('Error updating grade:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier la note",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteGrade = async (id: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('grades')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setGrades(prev => prev.filter(grade => grade.id !== id));
      toast({
        title: "Succès",
        description: "Note supprimée avec succès",
      });
    } catch (error) {
      console.error('Error deleting grade:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la note",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getGradesByStudent = (studentId: string) => {
    return grades.filter(grade => grade.student_id === studentId);
  };

  const getGradesBySubject = (subjectName: string) => {
    return grades.filter(grade => grade.subject_name === subjectName);
  };

  const calculateStudentAverage = (studentId: string) => {
    const studentGrades = getGradesByStudent(studentId);
    if (studentGrades.length === 0) return 0;

    const totalPoints = studentGrades.reduce((sum, grade) => sum + (grade.grade * grade.coefficient), 0);
    const totalCoefficients = studentGrades.reduce((sum, grade) => sum + grade.coefficient, 0);
    
    return totalCoefficients > 0 ? totalPoints / totalCoefficients : 0;
  };

  return {
    grades,
    isLoading,
    addGrade,
    updateGrade,
    deleteGrade,
    getGradesByStudent,
    getGradesBySubject,
    calculateStudentAverage,
    fetchGrades,
  };
};