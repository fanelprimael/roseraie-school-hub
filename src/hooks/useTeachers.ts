import { useState } from 'react';

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

  const addTeacher = async (teacherData: Omit<Teacher, 'id' | 'createdAt' | 'subjects'>) => {
    setIsLoading(true);
    try {
      const newTeacher: Teacher = {
        ...teacherData,
        id: crypto.randomUUID(),
        subjects: [], // Initialize empty subjects array
        createdAt: new Date().toISOString(),
      };
      setTeachers(prev => [...prev, newTeacher]);
      return newTeacher;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTeacher = async (id: string, updates: Partial<Teacher>) => {
    setIsLoading(true);
    try {
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