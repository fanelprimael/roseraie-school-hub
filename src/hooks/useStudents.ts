import { useState } from 'react';

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

  const addStudent = async (studentData: Omit<Student, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      const newStudent: Student = {
        ...studentData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setStudents(prev => [...prev, newStudent]);
      return newStudent;
    } finally {
      setIsLoading(false);
    }
  };

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    setIsLoading(true);
    try {
      setStudents(prev => 
        prev.map(student => 
          student.id === id ? { ...student, ...updates } : student
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteStudent = async (id: string) => {
    setIsLoading(true);
    try {
      setStudents(prev => prev.filter(student => student.id !== id));
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
  };
};