import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  student_id: string;
  student_name: string;
  class_name: string;
  type: string;
  amount: number;
  status: 'Payé' | 'En attente' | 'En retard';
  date: string;
  due_date?: string;
}

interface PaymentType {
  id: string;
  name: string;
  amount: number;
  description?: string;
}

interface FinancialStats {
  monthly_income: number;
  monthly_expenses: number;
  net_profit: number;
  overdue_count: number;
  overdue_amount: number;
}

export const useFinances = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([
    { id: '1', name: 'Frais de scolarité 1', amount: 15000 },
    { id: '2', name: 'Frais de scolarité 2', amount: 15000 },
    { id: '3', name: 'Frais de scolarité 3', amount: 15000 },
    { id: '4', name: 'Photocopie et anglais', amount: 5000 },
    { id: '5', name: 'Uniforme', amount: 8000 },
    { id: '6', name: 'Cantine', amount: 12000 },
    { id: '7', name: 'Activité', amount: 3000 }
  ]);
  const [stats, setStats] = useState<FinancialStats>({
    monthly_income: 0,
    monthly_expenses: 0,
    net_profit: 0,
    overdue_count: 0,
    overdue_amount: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simulate loading data
  useEffect(() => {
    // Données simulées - remplacer par API Supabase
    calculateStats();
  }, [payments]);

  const calculateStats = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyPayments = payments.filter(p => {
      const paymentDate = new Date(p.date);
      return paymentDate.getMonth() === currentMonth && 
             paymentDate.getFullYear() === currentYear &&
             p.status === 'Payé';
    });

    const overduePayments = payments.filter(p => p.status === 'En retard');

    const monthly_income = monthlyPayments.reduce((sum, p) => sum + p.amount, 0);
    const overdue_amount = overduePayments.reduce((sum, p) => sum + p.amount, 0);

    setStats({
      monthly_income,
      monthly_expenses: 0, // À définir selon les besoins
      net_profit: monthly_income,
      overdue_count: overduePayments.length,
      overdue_amount
    });
  };

  const createPayment = async (paymentData: {
    student_id: string;
    student_name: string;
    class_name: string;
    type: string;
    amount: number;
    date: string;
  }) => {
    setIsLoading(true);
    try {
      const newPayment: Payment = {
        id: Date.now().toString(),
        ...paymentData,
        status: 'Payé'
      };

      setPayments(prev => [...prev, newPayment]);
      
      toast({
        title: "Paiement enregistré",
        description: `Paiement de ${paymentData.amount} FCFA pour ${paymentData.student_name}`,
      });
      
      return newPayment;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer le paiement",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePaymentStatus = async (paymentId: string, status: Payment['status']) => {
    setIsLoading(true);
    try {
      setPayments(prev => 
        prev.map(p => p.id === paymentId ? { ...p, status } : p)
      );
      
      toast({
        title: "Statut mis à jour",
        description: `Le statut du paiement a été changé en "${status}"`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getOverduePayments = () => {
    return payments.filter(p => p.status === 'En retard');
  };

  const getPaymentsByType = (type: string) => {
    return payments.filter(p => p.type === type);
  };

  const searchPayments = (query: string) => {
    const searchTerm = query.toLowerCase();
    return payments.filter(p => 
      p.student_name.toLowerCase().includes(searchTerm) ||
      p.class_name.toLowerCase().includes(searchTerm) ||
      p.type.toLowerCase().includes(searchTerm)
    );
  };

  return {
    payments,
    paymentTypes,
    stats,
    isLoading,
    createPayment,
    updatePaymentStatus,
    getOverduePayments,
    getPaymentsByType,
    searchPayments
  };
};