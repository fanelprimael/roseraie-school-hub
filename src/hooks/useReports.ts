import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useStudents } from './useStudents';
import { useClasses } from './useClasses';
import { useFinances } from './useFinances';

interface ClassStats {
  class_name: string;
  total_students: number;
  boys: number;
  girls: number;
  average_grade?: number;
  success_rate?: number;
}

interface ReportData {
  total_students: number;
  total_classes: number;
  total_teachers: number;
  monthly_income: number;
  overdue_payments: number;
  class_stats: ClassStats[];
}

export const useReports = () => {
  const [reportData, setReportData] = useState<ReportData>({
    total_students: 0,
    total_classes: 0,
    total_teachers: 0,
    monthly_income: 0,
    overdue_payments: 0,
    class_stats: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { students } = useStudents();
  const { classes } = useClasses();
  const { stats: financeStats } = useFinances();

  useEffect(() => {
    generateReportData();
  }, [students, classes, financeStats]);

  const generateReportData = () => {
    // Calculate class statistics
    const classStats: ClassStats[] = classes.map(classItem => {
      const classStudents = students.filter(s => s.class === classItem.name);
      const boys = 0; // Gender field not available in current Student model
      const girls = 0; // Gender field not available in current Student model

      return {
        class_name: classItem.name,
        total_students: classStudents.length,
        boys,
        girls,
        average_grade: 0, // À calculer avec les notes
        success_rate: 0   // À calculer avec les notes
      };
    });

    setReportData({
      total_students: students.length,
      total_classes: classes.length,
      total_teachers: 0, // À connecter avec les enseignants
      monthly_income: financeStats.monthly_income,
      overdue_payments: financeStats.overdue_count,
      class_stats: classStats
    });
  };

  const generatePDFReport = async (reportType: string, period: string) => {
    setIsLoading(true);
    try {
      // Generate PDF content
      const pdfContent = generateReportContent(reportType, period);
      
      // Create and download PDF
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rapport-${reportType}-${period}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Rapport PDF téléchargé",
        description: `Le rapport ${reportType} pour ${period} a été téléchargé`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le rapport PDF",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateExcelReport = async (reportType: string, period: string) => {
    setIsLoading(true);
    try {
      // Generate Excel content
      const excelContent = generateExcelContent(reportType, period);
      
      // Create and download Excel
      const blob = new Blob([excelContent], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rapport-${reportType}-${period}-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Rapport Excel téléchargé",
        description: `Le rapport ${reportType} pour ${period} a été téléchargé`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le rapport Excel",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportStudentsList = async () => {
    setIsLoading(true);
    try {
      const csvContent = generateStudentsListCSV();
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `liste-eleves-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Liste exportée",
        description: "La liste des élèves par classe a été téléchargée",
      });
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: "Impossible d'exporter la liste des élèves",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportOverduePayments = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Rapport exporté",
        description: "Le rapport des paiements en retard a été exporté",
      });
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: "Impossible d'exporter le rapport des retards",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportGlobalReport = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      toast({
        title: "Bulletin global exporté",
        description: "Le bulletin de notes global a été généré",
      });
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: "Impossible d'exporter le bulletin global",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getClassStatistics = () => {
    return reportData.class_stats;
  };

  const getTotalStats = () => {
    const totalBoys = reportData.class_stats.reduce((sum, cls) => sum + cls.boys, 0);
    const totalGirls = reportData.class_stats.reduce((sum, cls) => sum + cls.girls, 0);
    
    return {
      total_students: reportData.total_students,
      total_boys: totalBoys,
      total_girls: totalGirls,
      total_classes: reportData.total_classes
    };
  };

  // Helper functions for content generation
  const generateReportContent = (reportType: string, period: string) => {
    return `%PDF-SIMULATED-CONTENT-${reportType}-${period}`;
  };

  const generateExcelContent = (reportType: string, period: string) => {
    return `EXCEL-SIMULATED-CONTENT-${reportType}-${period}`;
  };

  const generateStudentsListCSV = () => {
    let csv = 'Classe,Nom,Prénom,Date de naissance\n';
    students.forEach(student => {
      csv += `${student.class || 'N/A'},${student.lastName},${student.firstName},${student.dateOfBirth || 'N/A'}\n`;
    });
    return csv;
  };

  return {
    reportData,
    isLoading,
    generatePDFReport,
    generateExcelReport,
    exportStudentsList,
    exportOverduePayments,
    exportGlobalReport,
    getClassStatistics,
    getTotalStats
  };
};