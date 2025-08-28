import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Search, Edit, Phone, Mail, School } from "lucide-react";

const Teachers = () => {
  // Mock data - à remplacer par de vraies données
  const teachers = [
    { 
      id: 1, 
      nom: "KONE", 
      prenom: "Fatou", 
      classe: "Petite Section", 
      matiere: "Éveil", 
      telephone: "07 12 34 56 78",
      email: "f.kone@laroseraie.edu",
      statut: "Actif" 
    },
    { 
      id: 2, 
      nom: "TRAORE", 
      prenom: "Aminata", 
      classe: "Moyenne Section", 
      matiere: "Éveil", 
      telephone: "07 23 45 67 89",
      email: "a.traore@laroseraie.edu",
      statut: "Actif" 
    },
    { 
      id: 3, 
      nom: "DIALLO", 
      prenom: "Moussa", 
      classe: "Grande Section", 
      matiere: "Éveil", 
      telephone: "07 34 56 78 90",
      email: "m.diallo@laroseraie.edu",
      statut: "Actif" 
    },
    { 
      id: 4, 
      nom: "KOUAME", 
      prenom: "Marie", 
      classe: "CP1", 
      matiere: "Français, Mathématiques", 
      telephone: "07 45 67 89 01",
      email: "m.kouame@laroseraie.edu",
      statut: "Actif" 
    },
    { 
      id: 5, 
      nom: "SANOGO", 
      prenom: "Ibrahim", 
      classe: "CP2", 
      matiere: "Français, Mathématiques", 
      telephone: "07 56 78 90 12",
      email: "i.sanogo@laroseraie.edu",
      statut: "Actif" 
    },
  ];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion des Enseignants</h1>
            <p className="text-muted-foreground">
              Liste et informations du corps enseignant
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <UserPlus className="mr-2 h-4 w-4" />
            Nouvel Enseignant
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <School className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{teachers.length}</p>
                  <p className="text-sm text-muted-foreground">Enseignants actifs</p>
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
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Maternelle</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <School className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">2</p>
                  <p className="text-sm text-muted-foreground">Primaire</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recherche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Rechercher un enseignant..." 
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Teachers Table */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Liste des Enseignants</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom & Prénom</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Matière(s)</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{teacher.nom} {teacher.prenom}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {teacher.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{teacher.classe}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm truncate">{teacher.matiere}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {teacher.telephone}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{teacher.statut}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
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

export default Teachers;