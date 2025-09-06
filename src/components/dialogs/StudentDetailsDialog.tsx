import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/hooks/useStudents";

interface StudentDetailsDialogProps {
  student: Student | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StudentDetailsDialog: React.FC<StudentDetailsDialogProps> = ({
  student,
  open,
  onOpenChange
}) => {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Détails de l'élève</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informations personnelles */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Informations personnelles</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Nom complet:</span>
                  <p className="font-medium">{student.firstName} {student.lastName}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Date de naissance:</span>
                  <p>{new Date(student.dateOfBirth).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Classe:</span>
                  <Badge variant="outline">{student.class}</Badge>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Statut:</span>
                  <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                    {student.status === 'active' ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Contact parent</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Nom du parent:</span>
                  <p className="font-medium">{student.parentName}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Téléphone:</span>
                  <p>{student.parentPhone}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <p>{student.parentEmail}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Adresse:</span>
                  <p>{student.address}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Informations additionnelles */}
          <div className="border-t pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <span>ID:</span> {student.id.split('-')[0]}...
              </div>
              <div>
                <span>Créé le:</span> {new Date(student.createdAt).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};