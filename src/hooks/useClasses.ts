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
  const [classes, setClasses] = useState<Class[]>([]);
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