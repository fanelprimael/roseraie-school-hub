import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Download, 
  FileText, 
  Users, 
  School, 
  TrendingUp, 
  Calendar,
  Filter
} from "lucide-react";
import { useReports } from "@/hooks/useReports";
import { useState } from "react";

const Reports = () => {
  const { 
    reportData, 
    generatePDFReport, 
    generateExcelReport,
    exportStudentsList,
    exportOverduePayments,
    exportGlobalReport,
    getClassStatistics,
    getTotalStats,
    isLoading 
  } = useReports();

  const [selectedReportType, setSelectedReportType] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");

  const classStats = getClassStatistics();
  const totalStats = getTotalStats();

  const handleExport = async () => {
    if (!selectedReportType || !selectedPeriod || !selectedFormat) return;
    
    if (selectedFormat === "pdf") {
      await generatePDFReport(selectedReportType, selectedPeriod);
    } else {
      await generateExcelReport(selectedReportType, selectedPeriod);
    }
  };

  const handleFilterApply = () => {
    console.log("Filtres appliqués");
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Rapports & Statistiques</h1>
            <p className="text-muted-foreground">
              Analyses et exports des données de l'école
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleFilterApply}>
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                 <div>
                   <p className="text-2xl font-bold text-foreground">{totalStats.total_students}</p>
                   <p className="text-sm text-muted-foreground">Total Élèves</p>
                 </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <School className="h-6 w-6 text-secondary" />
                </div>
                 <div>
                   <p className="text-2xl font-bold text-foreground">{totalStats.total_classes}</p>
                   <p className="text-sm text-muted-foreground">Classes</p>
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">0%</p>
                  <p className="text-sm text-muted-foreground">Taux de réussite</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">0</p>
                  <p className="text-sm text-muted-foreground">Moyenne générale</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="effectifs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="effectifs">Effectifs</TabsTrigger>
            <TabsTrigger value="reussite">Réussite Scolaire</TabsTrigger>
            <TabsTrigger value="finances">Finances</TabsTrigger>
            <TabsTrigger value="exports">Exports</TabsTrigger>
          </TabsList>

          <TabsContent value="effectifs" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Effectifs par classe */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Effectifs par Classe</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="space-y-4">
                     {classStats.length > 0 ? (
                       classStats.map((classe, index) => (
                         <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                           <div>
                             <p className="font-medium">{classe.class_name}</p>
                             <div className="flex gap-4 text-sm text-muted-foreground">
                               <span>♂ {classe.boys}</span>
                               <span>♀ {classe.girls}</span>
                             </div>
                           </div>
                           <Badge variant="outline" className="text-lg px-3 py-1">
                             {classe.total_students}
                           </Badge>
                         </div>
                       ))
                     ) : (
                       <div className="text-center py-8 text-muted-foreground">
                         <p>Aucune classe enregistrée</p>
                       </div>
                     )}
                   </div>
                </CardContent>
              </Card>

              {/* Répartition par sexe */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Répartition Générale</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-6">
                   <div className="text-center">
                     <p className="text-3xl font-bold text-primary">{totalStats.total_students}</p>
                     <p className="text-muted-foreground">Total Élèves</p>
                   </div>

                   <div className="space-y-4">
                     <div className="flex items-center justify-between">
                       <span className="text-sm font-medium">Garçons</span>
                       <div className="flex items-center gap-2">
                         <div className="w-32 bg-muted rounded-full h-2">
                           <div 
                             className="bg-primary h-2 rounded-full" 
                             style={{ width: totalStats.total_students > 0 ? `${(totalStats.total_boys / totalStats.total_students) * 100}%` : '0%' }}
                           />
                         </div>
                         <span className="text-sm font-medium">{totalStats.total_boys}</span>
                       </div>
                     </div>

                     <div className="flex items-center justify-between">
                       <span className="text-sm font-medium">Filles</span>
                       <div className="flex items-center gap-2">
                         <div className="w-32 bg-muted rounded-full h-2">
                           <div 
                             className="bg-secondary h-2 rounded-full" 
                             style={{ width: totalStats.total_students > 0 ? `${(totalStats.total_girls / totalStats.total_students) * 100}%` : '0%' }}
                           />
                         </div>
                         <span className="text-sm font-medium">{totalStats.total_girls}</span>
                       </div>
                     </div>
                   </div>
                 </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reussite" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Statistiques de Réussite par Classe</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="space-y-4">
                   <div className="text-center py-8 text-muted-foreground">
                     <p>Aucune statistique de réussite disponible</p>
                   </div>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finances" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>État Financier</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-secondary/10">
                    <h4 className="font-medium text-secondary">Recettes Totales</h4>
                    <p className="text-2xl font-bold text-secondary">0 FCFA</p>
                    <p className="text-sm text-muted-foreground">Ce mois</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-destructive/10">
                    <h4 className="font-medium text-destructive">Impayés</h4>
                    <p className="text-2xl font-bold text-destructive">0 FCFA</p>
                    <p className="text-sm text-muted-foreground">0 élèves concernés</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exports" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Génération de Rapports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Type de rapport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="effectifs">Rapport d'effectifs</SelectItem>
                      <SelectItem value="finances">Rapport financier</SelectItem>
                      <SelectItem value="reussite">Rapport de réussite</SelectItem>
                      <SelectItem value="complet">Rapport complet</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mois">Ce mois</SelectItem>
                      <SelectItem value="trimestre">Ce trimestre</SelectItem>
                      <SelectItem value="annee">Cette année</SelectItem>
                      <SelectItem value="personnalise">Période personnalisée</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <Button className="bg-gradient-primary hover:opacity-90">
                    <Download className="mr-2 h-4 w-4" />
                    Générer PDF
                  </Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Générer Excel
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Rapports Prédéfinis</h4>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Liste des élèves par classe
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Élèves en retard de paiement
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Bulletin de notes global
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;