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
    { id: '1', name: 'Français', coefficient: 1, category: 'core', createdAt: new Date().toISOString() },
    { id: '2', name: 'Mathématiques', coefficient: 1, category: 'core', createdAt: new Date().toISOString() },
    { id: '3', name: 'Sciences', coefficient: 1, category: 'core', createdAt: new Date().toISOString() },
    { id: '4', name: 'Histoire-Géographie', coefficient: 1, category: 'core', createdAt: new Date().toISOString() },
    { id: '5', name: 'Anglais', coefficient: 1, category: 'core', createdAt: new Date().toISOString() },
    { id: '6', name: 'Arts Plastiques', coefficient: 1, category: 'optional', createdAt: new Date().toISOString() },
    { id: '7', name: 'Éducation Physique', coefficient: 1, category: 'optional', createdAt: new Date().toISOString() },
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