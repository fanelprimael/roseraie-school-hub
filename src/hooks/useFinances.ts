import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
  const [stats, setStats] = useState<FinancialStats>({
    monthly_income: 0,
    monthly_expenses: 0,
    net_profit: 0,
    overdue_count: 0,
    overdue_amount: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPayments();
    fetchPaymentTypes();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [payments]);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPayments: Payment[] = data?.map(payment => ({
        id: payment.id,
        student_id: payment.student_id,
        student_name: payment.student_name,
        class_name: payment.class_name,
        type: payment.type,
        amount: payment.amount,
        status: payment.status as 'Payé' | 'En attente' | 'En retard',
        date: payment.date,
        due_date: payment.due_date,
      })) || [];

      setPayments(formattedPayments);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const fetchPaymentTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('payment_types')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedTypes: PaymentType[] = data?.map(type => ({
        id: type.id,
        name: type.name,
        amount: type.amount,
        description: type.description,
      })) || [];

      setPaymentTypes(formattedTypes);
    } catch (error) {
      console.error('Error fetching payment types:', error);
    }
  };

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
      const { data, error } = await supabase
        .from('payments')
        .insert({
          student_id: paymentData.student_id,
          student_name: paymentData.student_name,
          class_name: paymentData.class_name,
          type: paymentData.type,
          amount: paymentData.amount,
          date: paymentData.date,
          status: 'Payé'
        })
        .select()
        .single();

      if (error) throw error;

      const newPayment: Payment = {
        id: data.id,
        student_id: data.student_id,
        student_name: data.student_name,
        class_name: data.class_name,
        type: data.type,
        amount: data.amount,
        status: data.status as 'Payé' | 'En attente' | 'En retard',
        date: data.date,
        due_date: data.due_date,
      };

      setPayments(prev => [newPayment, ...prev]);
      
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
      const { error } = await supabase
        .from('payments')
        .update({ status })
        .eq('id', paymentId);

      if (error) throw error;

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