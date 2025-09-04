import React, { createContext, useContext } from 'react';
import { useClasses } from '@/hooks/useClasses';

interface Class {
  id: string;
  name: string;
  level: string;
  teacher: string;
  capacity: number;
  studentCount: number;
  createdAt: string;
}

interface ClassesContextType {
  classes: Class[];
  isLoading: boolean;
  addClass: (classData: Omit<Class, 'id' | 'createdAt' | 'studentCount'>) => Promise<Class>;
  updateClass: (id: string, updates: Partial<Class>) => Promise<void>;
  deleteClass: (id: string) => Promise<void>;
}

const ClassesContext = createContext<ClassesContextType | undefined>(undefined);

export const ClassesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const classesData = useClasses();
  
  return (
    <ClassesContext.Provider value={classesData}>
      {children}
    </ClassesContext.Provider>
  );
};

export const useClassesContext = () => {
  const context = useContext(ClassesContext);
  if (context === undefined) {
    throw new Error('useClassesContext must be used within a ClassesProvider');
  }
  return context;
};