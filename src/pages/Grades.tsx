import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Download, Plus, BarChart3 } from "lucide-react";
import { GradeForm } from "@/components/forms/GradeForm";
import { ReportCardForm } from "@/components/forms/ReportCardForm";
import { SubjectForm } from "@/components/forms/SubjectForm";
import { useSubjects } from "@/hooks/useSubjects";
import { useGrades } from "@/hooks/useGrades";

const Grades = () => {
  const { subjects } = useSubjects();
  const { grades } = useGrades();

  const totalGrades = grades.length;
  const averageGrade = grades.length > 0 
    ? grades.reduce((sum, grade) => sum + grade.grade, 0) / grades.length 
    : 0;

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
            <GradeForm />
            <ReportCardForm />
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
                  <p className="text-2xl font-bold text-foreground">{subjects.length}</p>
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
                   <p className="text-2xl font-bold text-foreground">{totalGrades}</p>
                   <p className="text-sm text-muted-foreground">Notes saisies</p>
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
                   <p className="text-2xl font-bold text-foreground">{averageGrade.toFixed(1)}/20</p>
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
                  <p className="text-2xl font-bold text-foreground">0</p>
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
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
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

              <Button 
                variant="outline" 
                onClick={() => {
                  console.log('Filtrer notes avec critères sélectionnés');
                }}
              >
                Filtrer
              </Button>
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
                       <TableHead>Type</TableHead>
                       <TableHead>Note</TableHead>
                      <TableHead>Moyenne</TableHead>
                    </TableRow>
                  </TableHeader>
                   <TableBody>
                     {grades.length > 0 ? (
                       grades.map((grade) => (
                         <TableRow key={grade.id}>
                           <TableCell className="font-medium">{grade.student_name}</TableCell>
                           <TableCell>
                             <Badge variant="outline">{grade.class_name}</Badge>
                           </TableCell>
                           <TableCell>{grade.subject_name}</TableCell>
                           <TableCell>{grade.type}</TableCell>
                           <TableCell className="font-medium">
                             <Badge variant={grade.grade >= 10 ? 'default' : 'destructive'}>
                               {grade.grade}/20
                             </Badge>
                           </TableCell>
                           <TableCell>{grade.grade.toFixed(1)}</TableCell>
                         </TableRow>
                       ))
                     ) : (
                       <TableRow>
                         <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                           Aucune note saisie
                         </TableCell>
                       </TableRow>
                     )}
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
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        Aucun classement disponible
                      </TableCell>
                    </TableRow>
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

                  <Button 
                    className="bg-gradient-primary hover:opacity-90"
                    onClick={async () => {
                      // Générer les bulletins PDF
                      const link = document.createElement('a');
                      link.href = 'data:text/plain;charset=utf-8,Bulletin de notes généré';
                      link.download = `bulletins-${new Date().toISOString().split('T')[0]}.pdf`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
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