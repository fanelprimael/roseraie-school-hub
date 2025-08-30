import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, Search, Download, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { useFinances } from "@/hooks/useFinances";
import { PaymentForm } from "@/components/forms/PaymentForm";
import { useState } from "react";

const Finances = () => {
  const { 
    payments, 
    paymentTypes, 
    stats, 
    getOverduePayments, 
    searchPayments,
    isLoading 
  } = useFinances();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = searchQuery === "" || 
      searchPayments(searchQuery).some(p => p.id === payment.id);
    const matchesType = selectedType === "all" || payment.type === selectedType;
    const matchesStatus = selectedStatus === "all" || payment.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const overduePayments = getOverduePayments();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  const generateReport = async () => {
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Rapport financier généré");
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion Financière</h1>
            <p className="text-muted-foreground">
              Suivi des paiements, recettes et dépenses de l'école
            </p>
          </div>
          <div className="flex gap-3">
            <PaymentForm />
            <Button variant="outline" onClick={generateReport}>
              <Download className="mr-2 h-4 w-4" />
              Rapport
            </Button>
          </div>
        </div>

        {/* Financial Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                 <div>
                   <p className="text-lg font-bold text-foreground">{formatCurrency(stats.monthly_income)}</p>
                   <p className="text-sm text-muted-foreground">Recettes ce mois</p>
                 </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-destructive/10">
                  <TrendingDown className="h-6 w-6 text-destructive" />
                </div>
                 <div>
                   <p className="text-lg font-bold text-foreground">{formatCurrency(stats.monthly_expenses)}</p>
                   <p className="text-sm text-muted-foreground">Dépenses ce mois</p>
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                 <div>
                   <p className="text-lg font-bold text-foreground">{formatCurrency(stats.net_profit)}</p>
                   <p className="text-sm text-muted-foreground">Bénéfice net</p>
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-l-4 border-l-destructive">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                 <div>
                   <p className="text-lg font-bold text-destructive">{stats.overdue_count}</p>
                   <p className="text-sm text-muted-foreground">Paiements en retard</p>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="paiements" className="space-y-4">
          <TabsList>
            <TabsTrigger value="paiements">Paiements</TabsTrigger>
            <TabsTrigger value="retards">Retards</TabsTrigger>
            <TabsTrigger value="recettes">Recettes</TabsTrigger>
          </TabsList>

          <TabsContent value="paiements" className="space-y-4">
            {/* Filters */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Recherche et Filtres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Rechercher..." className="pl-10" />
                  </div>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Type de paiement" />
                    </SelectTrigger>
                    <SelectContent>
                     {paymentTypes.map((type) => (
                       <SelectItem key={type.id} value={type.name.toLowerCase()}>
                         {type.name}
                       </SelectItem>
                     ))}
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paye">Payé</SelectItem>
                      <SelectItem value="attente">En attente</SelectItem>
                      <SelectItem value="retard">En retard</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline">Filtrer</Button>
                </div>
              </CardContent>
            </Card>

            {/* Payments Table */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Paiements Récents</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Élève</TableHead>
                      <TableHead>Classe</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                   <TableBody>
                     {filteredPayments.length > 0 ? (
                       filteredPayments.map((payment) => (
                         <TableRow key={payment.id}>
                           <TableCell className="font-medium">{payment.student_name}</TableCell>
                           <TableCell>
                             <Badge variant="outline">{payment.class_name}</Badge>
                           </TableCell>
                           <TableCell className="max-w-xs truncate">{payment.type}</TableCell>
                           <TableCell className="font-medium text-secondary">
                             {formatCurrency(payment.amount)}
                           </TableCell>
                           <TableCell>{new Date(payment.date).toLocaleDateString('fr-FR')}</TableCell>
                           <TableCell>
                             <Badge variant={payment.status === 'Payé' ? 'secondary' : 'outline'}>
                               {payment.status}
                             </Badge>
                           </TableCell>
                           <TableCell>
                             <Button variant="outline" size="sm">
                               <Download className="h-4 w-4" />
                             </Button>
                           </TableCell>
                         </TableRow>
                       ))
                     ) : (
                       <TableRow>
                         <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                           Aucun paiement enregistré
                         </TableCell>
                       </TableRow>
                     )}
                   </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="retards" className="space-y-4">
            <Card className="shadow-soft border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Paiements en Retard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Élève</TableHead>
                      <TableHead>Classe</TableHead>
                      <TableHead>Montant Dû</TableHead>
                      <TableHead>Jours de Retard</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                   <TableBody>
                     {overduePayments.length > 0 ? (
                       overduePayments.map((payment, index) => (
                         <TableRow key={index}>
                           <TableCell className="font-medium">{payment.student_name}</TableCell>
                           <TableCell>
                             <Badge variant="outline">{payment.class_name}</Badge>
                           </TableCell>
                           <TableCell className="font-medium text-destructive">
                             {formatCurrency(payment.amount)}
                           </TableCell>
                           <TableCell>
                             <Badge variant="destructive">En retard</Badge>
                           </TableCell>
                           <TableCell>
                             <div className="flex gap-2">
                               <Button variant="outline" size="sm">
                                 Rappel
                               </Button>
                               <Button variant="outline" size="sm">
                                 Contact
                               </Button>
                             </div>
                           </TableCell>
                         </TableRow>
                       ))
                     ) : (
                       <TableRow>
                         <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                           Aucun paiement en retard
                         </TableCell>
                       </TableRow>
                     )}
                   </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recettes" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Répartition des Recettes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Aucune donnée de recettes disponible</p>
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

export default Finances;