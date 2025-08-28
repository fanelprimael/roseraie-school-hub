import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, Search, Download, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

const Finances = () => {
  // Données financières - à connecter à la base de données
  const typesPaiements = [
    "Frais de scolarité 1",
    "Frais de scolarité 2", 
    "Frais de scolarité 3",
    "Photocopie et anglais",
    "Uniforme",
    "Cantine",
    "Activité"
  ];

  const paiements = [];
  const retards = [];

  const recettesMensuelles = 0;
  const depensesMensuelles = 0;
  const benefice = 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
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
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Paiement
            </Button>
            <Button variant="outline">
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
                  <p className="text-lg font-bold text-foreground">{formatCurrency(recettesMensuelles)}</p>
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
                  <p className="text-lg font-bold text-foreground">{formatCurrency(depensesMensuelles)}</p>
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
                  <p className="text-lg font-bold text-foreground">{formatCurrency(benefice)}</p>
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
                  <p className="text-lg font-bold text-destructive">0</p>
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
                      {typesPaiements.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
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
                    {paiements.length > 0 ? (
                      paiements.map((paiement) => (
                        <TableRow key={paiement.id}>
                          <TableCell className="font-medium">{paiement.eleve}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{paiement.classe}</Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{paiement.type}</TableCell>
                          <TableCell className="font-medium text-secondary">
                            {formatCurrency(paiement.montant)}
                          </TableCell>
                          <TableCell>{new Date(paiement.date).toLocaleDateString('fr-FR')}</TableCell>
                          <TableCell>
                            <Badge variant={paiement.statut === 'Payé' ? 'secondary' : 'outline'}>
                              {paiement.statut}
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
                    {retards.length > 0 ? (
                      retards.map((retard, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{retard.eleve}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{retard.classe}</Badge>
                          </TableCell>
                          <TableCell className="font-medium text-destructive">
                            {formatCurrency(retard.montant)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="destructive">{retard.jours} jours</Badge>
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