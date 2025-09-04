import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { School, Users, Edit } from "lucide-react";
import { ClassForm } from "@/components/forms/ClassForm";
import { EditClassForm } from "@/components/forms/EditClassForm";
import { useClassesContext } from "@/contexts/ClassesContext";
import { useStudentsContext } from "@/contexts/StudentsContext";
import { useState } from "react";

const Classes = () => {
  const { classes, deleteClass } = useClassesContext();
  const { students } = useStudentsContext();
  const [editingClass, setEditingClass] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const totalStudents = students.length;

  const handleEditClass = (classItem: any) => {
    setEditingClass(classItem);
    setEditDialogOpen(true);
  };

  const handleViewStudents = (classItem: any) => {
    // Navigate to students page with class filter
    window.location.href = `/students?class=${encodeURIComponent(classItem.name)}`;
  };

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
          <ClassForm />
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
                  <p className="text-2xl font-bold text-foreground">{classes.filter(c => c.studentCount > 0).length}</p>
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
                  <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
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
                  <p className="text-2xl font-bold text-foreground">{classes.length > 0 ? Math.round(totalStudents / classes.length) : 0}</p>
                  <p className="text-sm text-muted-foreground">Moyenne par classe</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classes Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {classes.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <School className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Aucune classe créée</p>
            </div>
          ) : (
            classes.map((classItem) => (
              <Card key={classItem.id} className="shadow-soft hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{classItem.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {classItem.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>{classItem.studentCount}</strong>/{classItem.capacity} élèves
                    </span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <strong>Enseignant:</strong> {classItem.teacher}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleEditClass(classItem)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewStudents(classItem)}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Élèves
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Edit Class Dialog */}
        <EditClassForm 
          classData={editingClass}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
        />
      </div>
    </Layout>
  );
};

export default Classes;