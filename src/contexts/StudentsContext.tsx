import React, { createContext, useContext } from 'react';
import { useStudents, Student } from '@/hooks/useStudents';

interface StudentsContextType {
  students: Student[];
  isLoading: boolean;
  addStudent: (studentData: Omit<Student, 'id' | 'createdAt'>) => Promise<Student>;
  updateStudent: (id: string, updates: Partial<Student>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
}

const StudentsContext = createContext<StudentsContextType | undefined>(undefined);

export const StudentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const studentsData = useStudents();
  
  return (
    <StudentsContext.Provider value={studentsData}>
      {children}
    </StudentsContext.Provider>
  );
};

export const useStudentsContext = () => {
  const context = useContext(StudentsContext);
  if (context === undefined) {
    throw new Error('useStudentsContext must be used within a StudentsProvider');
  }
  return context;
};