import React, { createContext, useContext } from 'react';
import { useTeachers, Teacher } from '@/hooks/useTeachers';

interface TeachersContextType {
  teachers: Teacher[];
  isLoading: boolean;
  addTeacher: (teacherData: Omit<Teacher, 'id' | 'createdAt' | 'subjects'>) => Promise<Teacher>;
  updateTeacher: (id: string, updates: Partial<Teacher>) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
}

const TeachersContext = createContext<TeachersContextType | undefined>(undefined);

export const TeachersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const teachersData = useTeachers();
  
  return (
    <TeachersContext.Provider value={teachersData}>
      {children}
    </TeachersContext.Provider>
  );
};

export const useTeachersContext = () => {
  const context = useContext(TeachersContext);
  if (context === undefined) {
    throw new Error('useTeachersContext must be used within a TeachersProvider');
  }
  return context;
};