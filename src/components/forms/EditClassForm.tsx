import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useClasses } from "@/hooks/useClasses";
import { useTeachers } from "@/hooks/useTeachers";
import { useToast } from "@/hooks/use-toast";

interface ClassFormData {
  name: string;
  level: string;
  teacher: string;
  capacity: number;
}

interface Class {
  id: string;
  name: string;
  level: string;
  teacher: string;
  capacity: number;
  studentCount: number;
  createdAt: string;
}

const levels = [
  "Maternelle 1",
  "Maternelle 2", 
  "CI",
  "CP",
  "CE1",
  "CE2",
  "CM1", 
  "CM2"
];

interface EditClassFormProps {
  classData: Class | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditClassForm = ({ classData, open, onOpenChange }: EditClassFormProps) => {
  const { updateClass, isLoading } = useClasses();
  const { teachers } = useTeachers();
  const { toast } = useToast();
  
  const form = useForm<ClassFormData>({
    defaultValues: {
      name: '',
      level: '',
      teacher: '',
      capacity: 25,
    },
  });

  useEffect(() => {
    if (classData) {
      form.reset({
        name: classData.name,
        level: classData.level,
        teacher: classData.teacher,
        capacity: classData.capacity,
      });
    }
  }, [classData, form]);

  const onSubmit = async (data: ClassFormData) => {
    if (!classData) return;
    
    try {
      await updateClass(classData.id, data);
      toast({
        title: "Classe modifiée",
        description: "La classe a été modifiée avec succès.",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la modification de la classe.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier la classe</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la classe</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: CP-A, CE1-B..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niveau</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un niveau" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enseignant principal</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un enseignant" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={`${teacher.firstName} ${teacher.lastName}`}>
                          {teacher.firstName} {teacher.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacité maximale</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="25" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Modification..." : "Modifier la classe"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};