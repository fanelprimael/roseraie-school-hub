import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus, Search, Edit, Trash2, Eye } from "lucide-react";

const Students = () => {
  // Mock data - à remplacer par de vraies données
  const students = [
    { id: 1, nom: "KOUAME", prenom: "Marie", classe: "CP1", sexe: "F", statut: "Actif" },
    { id: 2, nom: "DIALLO", prenom: "Jean", classe: "CE1", sexe: "M", statut: "Actif" },
    { id: 3, nom: "TRAORE", prenom: "Aminata", classe: "CM2", sexe: "F", statut: "Actif" },
    { id: 4, nom: "KONE", prenom: "Ibrahim", classe: "CP2", sexe: "M", statut: "Inactif" },
  ];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion des Élèves</h1>
            <p className="text-muted-foreground">
              Liste et gestion de tous les élèves de l'école
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <UserPlus className="mr-2 h-4 w-4" />
            Nouvel Élève
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recherche et Filtres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Rechercher un élève..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filtrer</Button>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Liste des Élèves ({students.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Sexe</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.nom}</TableCell>
                    <TableCell>{student.prenom}</TableCell>
                    <TableCell>{student.classe}</TableCell>
                    <TableCell>{student.sexe}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        student.statut === 'Actif' ? 'bg-secondary/20 text-secondary' : 'bg-destructive/20 text-destructive'
                      }`}>
                        {student.statut}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Students;