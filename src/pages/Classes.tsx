import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { School, Users, Plus, Edit } from "lucide-react";

const Classes = () => {
  // Mock data - à remplacer par de vraies données
  const classes = [
    { id: 1, nom: "Petite Section", niveau: "Maternelle", effectif: 20, enseignant: "Mme KONE" },
    { id: 2, nom: "Moyenne Section", niveau: "Maternelle", effectif: 18, enseignant: "Mme TRAORE" },
    { id: 3, nom: "Grande Section", niveau: "Maternelle", effectif: 22, enseignant: "M. DIALLO" },
    { id: 4, nom: "CP1", niveau: "Primaire", effectif: 25, enseignant: "Mme KOUAME" },
    { id: 5, nom: "CP2", niveau: "Primaire", effectif: 24, enseignant: "M. SANOGO" },
    { id: 6, nom: "CE1", niveau: "Primaire", effectif: 26, enseignant: "Mme OUATTARA" },
    { id: 7, nom: "CE2", niveau: "Primaire", effectif: 23, enseignant: "M. BAMBA" },
    { id: 8, nom: "CM1", niveau: "Primaire", effectif: 28, enseignant: "Mme DIABATE" },
    { id: 9, nom: "CM2", niveau: "Primaire", effectif: 27, enseignant: "M. KOFFI" },
  ];

  const totalEleves = classes.reduce((sum, classe) => sum + classe.effectif, 0);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion des Classes</h1>
            <p className="text-muted-foreground">
              Organisation des classes et répartition des élèves
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle Classe
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
                  <p className="text-2xl font-bold text-foreground">{classes.length}</p>
                  <p className="text-sm text-muted-foreground">Classes actives</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalEleves}</p>
                  <p className="text-sm text-muted-foreground">Total élèves</p>
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
                  <p className="text-2xl font-bold text-foreground">{Math.round(totalEleves / classes.length)}</p>
                  <p className="text-sm text-muted-foreground">Moyenne par classe</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classes Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((classe) => (
            <Card key={classe.id} className="shadow-soft hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{classe.nom}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {classe.niveau}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>{classe.effectif}</strong> élèves
                  </span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <strong>Enseignant:</strong> {classe.enseignant}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Users className="mr-2 h-4 w-4" />
                    Élèves
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Classes;