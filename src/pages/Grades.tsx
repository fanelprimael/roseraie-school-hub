import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Download, Plus, BarChart3 } from "lucide-react";

const Grades = () => {
  // Mock data - à remplacer par de vraies données
  const matieres = [
    "ANGLAIS", "ES", "EST", "EA", "MATHÉMATIQUES", 
    "LECTURE", "EXPRESSION ÉCRITE", "POÉSIE/CHANT"
  ];

  const notes = [
    { 
      id: 1, 
      eleve: "KOUAME Marie", 
      classe: "CP1", 
      matiere: "MATHÉMATIQUES", 
      trimestre: "1", 
      note: 15.5, 
      moyenne: 14.2 
    },
    { 
      id: 2, 
      eleve: "DIALLO Jean", 
      classe: "CE1", 
      matiere: "FRANÇAIS", 
      trimestre: "1", 
      note: 12.0, 
      moyenne: 13.8 
    },
    { 
      id: 3, 
      eleve: "TRAORE Aminata", 
      classe: "CM2", 
      matiere: "ANGLAIS", 
      trimestre: "1", 
      note: 18.0, 
      moyenne: 16.5 
    },
  ];

  const classements = [
    { rang: 1, eleve: "TRAORE Aminata", classe: "CM2", moyenne: 16.5 },
    { rang: 2, eleve: "KOUAME Marie", classe: "CP1", moyenne: 14.2 },
    { rang: 3, eleve: "DIALLO Jean", classe: "CE1", moyenne: 13.8 },
  ];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notes & Examens</h1>
            <p className="text-muted-foreground">
              Gestion des notes, moyennes et bulletins scolaires
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Saisir Notes
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Bulletins
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{matieres.length}</p>
                  <p className="text-sm text-muted-foreground">Matières</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <FileText className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Trimestres</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">14.8</p>
                  <p className="text-sm text-muted-foreground">Moyenne générale</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">247</p>
                  <p className="text-sm text-muted-foreground">Bulletins à générer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="notes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="notes">Saisie des Notes</TabsTrigger>
            <TabsTrigger value="classements">Classements</TabsTrigger>
            <TabsTrigger value="bulletins">Bulletins</TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="space-y-4">
            {/* Filters */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Filtres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Classe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cp1">CP1</SelectItem>
                      <SelectItem value="cp2">CP2</SelectItem>
                      <SelectItem value="ce1">CE1</SelectItem>
                      <SelectItem value="ce2">CE2</SelectItem>
                      <SelectItem value="cm1">CM1</SelectItem>
                      <SelectItem value="cm2">CM2</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Matière" />
                    </SelectTrigger>
                    <SelectContent>
                      {matieres.map((matiere) => (
                        <SelectItem key={matiere} value={matiere.toLowerCase()}>
                          {matiere}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Trimestre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1er Trimestre</SelectItem>
                      <SelectItem value="2">2e Trimestre</SelectItem>
                      <SelectItem value="3">3e Trimestre</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline">Filtrer</Button>
                </div>
              </CardContent>
            </Card>

            {/* Notes Table */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Notes Récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Élève</TableHead>
                      <TableHead>Classe</TableHead>
                      <TableHead>Matière</TableHead>
                      <TableHead>Trimestre</TableHead>
                      <TableHead>Note</TableHead>
                      <TableHead>Moyenne</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notes.map((note) => (
                      <TableRow key={note.id}>
                        <TableCell className="font-medium">{note.eleve}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{note.classe}</Badge>
                        </TableCell>
                        <TableCell>{note.matiere}</TableCell>
                        <TableCell>{note.trimestre}er</TableCell>
                        <TableCell>
                          <span className={`font-medium ${
                            note.note >= 16 ? 'text-secondary' :
                            note.note >= 10 ? 'text-primary' : 'text-destructive'
                          }`}>
                            {note.note}/20
                          </span>
                        </TableCell>
                        <TableCell>{note.moyenne}/20</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classements" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Classement Général</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rang</TableHead>
                      <TableHead>Élève</TableHead>
                      <TableHead>Classe</TableHead>
                      <TableHead>Moyenne</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classements.map((classement) => (
                      <TableRow key={classement.rang}>
                        <TableCell>
                          <Badge variant={classement.rang <= 3 ? "default" : "outline"}>
                            {classement.rang}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{classement.eleve}</TableCell>
                        <TableCell>{classement.classe}</TableCell>
                        <TableCell>
                          <span className="font-medium text-secondary">
                            {classement.moyenne}/20
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulletins" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Génération des Bulletins</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Classe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toutes">Toutes les classes</SelectItem>
                      <SelectItem value="cp1">CP1</SelectItem>
                      <SelectItem value="cp2">CP2</SelectItem>
                      <SelectItem value="ce1">CE1</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Trimestre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1er Trimestre</SelectItem>
                      <SelectItem value="2">2e Trimestre</SelectItem>
                      <SelectItem value="3">3e Trimestre</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button className="bg-gradient-primary hover:opacity-90">
                    <Download className="mr-2 h-4 w-4" />
                    Générer PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Grades;