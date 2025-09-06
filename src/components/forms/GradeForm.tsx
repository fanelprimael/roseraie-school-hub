import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useSubjects } from "@/hooks/useSubjects";
import { useStudents } from "@/hooks/useStudents";
import { useGrades } from "@/hooks/useGrades";
import { PlusCircle } from "lucide-react";

interface GradeFormData {
  studentId: string;
  subjectId: string;
  grade: number;
  evaluationType: 'DS' | 'Interrogation' | 'Examen';
  date: string;
}

export const GradeForm = () => {
  const [open, setOpen] = useState(false);
  const { subjects } = useSubjects();
  const { students } = useStudents();
  const { addGrade, isLoading } = useGrades();
  
  const form = useForm<GradeFormData>({
    defaultValues: {
      studentId: '',
      subjectId: '',
      grade: 0,
      evaluationType: 'DS',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: GradeFormData) => {
    try {
      const student = students.find(s => s.id === data.studentId);
      const subject = subjects.find(s => s.id === data.subjectId);
      
      if (!student || !subject) return;

      await addGrade({
        student_id: student.id,
        student_name: `${student.firstName} ${student.lastName}`,
        subject_id: subject.id,
        subject_name: subject.name,
        class_name: student.class,
        grade: data.grade,
        coefficient: subject.coefficient,
        type: data.evaluationType,
        date: data.date,
      });

      setOpen(false);
      form.reset();
    } catch (error) {
      console.error('Error adding grade:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <PlusCircle className="h-4 w-4 mr-2" />
          Saisir Notes
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Saisir une note</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Élève</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un élève" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.firstName} {student.lastName} - {student.class}
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
              name="subjectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matière</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une matière" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name} (Coef. {subject.coefficient})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note (/20)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="20" 
                        step="0.5"
                        placeholder="Note" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="evaluationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type d'évaluation</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Type d'évaluation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DS">Devoir Surveillé</SelectItem>
                      <SelectItem value="Interrogation">Interrogation</SelectItem>
                      <SelectItem value="Examen">Examen</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Enregistrement..." : "Enregistrer la note"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};