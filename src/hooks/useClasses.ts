import { useState } from 'react';

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
  const [classes, setClasses] = useState<Class[]>([
    { id: '1', name: 'Maternelle 1', level: 'Maternelle', teacher: '', capacity: 25, studentCount: 0, createdAt: new Date().toISOString() },
    { id: '2', name: 'Maternelle 2', level: 'Maternelle', teacher: '', capacity: 25, studentCount: 0, createdAt: new Date().toISOString() },
    { id: '3', name: 'CI', level: 'Primaire', teacher: '', capacity: 30, studentCount: 0, createdAt: new Date().toISOString() },
    { id: '4', name: 'CP', level: 'Primaire', teacher: '', capacity: 30, studentCount: 0, createdAt: new Date().toISOString() },
    { id: '5', name: 'CE1', level: 'Primaire', teacher: '', capacity: 30, studentCount: 0, createdAt: new Date().toISOString() },
    { id: '6', name: 'CE2', level: 'Primaire', teacher: '', capacity: 30, studentCount: 0, createdAt: new Date().toISOString() },
    { id: '7', name: 'CM1', level: 'Primaire', teacher: '', capacity: 30, studentCount: 0, createdAt: new Date().toISOString() },
    { id: '8', name: 'CM2', level: 'Primaire', teacher: '', capacity: 30, studentCount: 0, createdAt: new Date().toISOString() },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addClass = async (classData: Omit<Class, 'id' | 'createdAt' | 'studentCount'>) => {
    setIsLoading(true);
    try {
      const newClass: Class = {
        ...classData,
        id: crypto.randomUUID(),
        studentCount: 0,
        createdAt: new Date().toISOString(),
      };
      setClasses(prev => [...prev, newClass]);
      return newClass;
    } finally {
      setIsLoading(false);
    }
  };

  const updateClass = async (id: string, updates: Partial<Class>) => {
    setIsLoading(true);
    try {
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