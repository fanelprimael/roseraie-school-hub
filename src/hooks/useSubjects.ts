import { useState } from 'react';

export interface Subject {
  id: string;
  name: string;
  coefficient: number;
  category: 'core' | 'optional' | 'extra';
  createdAt: string;
}

export const useSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'ANGLAIS', coefficient: 1, category: 'core', createdAt: new Date().toISOString() },
    { id: '2', name: 'ES', coefficient: 1, category: 'core', createdAt: new Date().toISOString() },
    { id: '3', name: 'EST', coefficient: 1, category: 'core', createdAt: new Date().toISOString() },
    { id: '4', name: 'EA', coefficient: 1, category: 'core', createdAt: new Date().toISOString() },
    { id: '5', name: 'MATHÉMATIQUES', coefficient: 1, category: 'core', createdAt: new Date().toISOString() },
    { id: '6', name: 'LECTURE', coefficient: 1, category: 'core', createdAt: new Date().toISOString() },
    { id: '7', name: 'EXPRESSION ÉCRITE', coefficient: 1, category: 'core', createdAt: new Date().toISOString() },
    { id: '8', name: 'POÉSIE/CHANT', coefficient: 1, category: 'core', createdAt: new Date().toISOString() },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addSubject = async (subjectData: Omit<Subject, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      const newSubject: Subject = {
        ...subjectData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setSubjects(prev => [...prev, newSubject]);
      return newSubject;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSubject = async (id: string, updates: Partial<Subject>) => {
    setIsLoading(true);
    try {
      setSubjects(prev => 
        prev.map(subject => 
          subject.id === id ? { ...subject, ...updates } : subject
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSubject = async (id: string) => {
    setIsLoading(true);
    try {
      setSubjects(prev => prev.filter(subject => subject.id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subjects,
    isLoading,
    addSubject,
    updateSubject,
    deleteSubject,
  };
};