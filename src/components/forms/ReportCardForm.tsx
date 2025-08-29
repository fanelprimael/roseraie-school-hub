import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useClasses } from "@/hooks/useClasses";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";

interface ReportCardFormData {
  classId: string;
  quarter: string;
}

export const ReportCardForm = () => {
  const [open, setOpen] = useState(false);
  const { classes } = useClasses();
  const { toast } = useToast();
  
  const form = useForm<ReportCardFormData>({
    defaultValues: {
      classId: '',
      quarter: '',
    },
  });

  const onSubmit = async (data: ReportCardFormData) => {
    try {
      // Ici on ajouterait la logique pour générer les bulletins
      console.log('Report card data:', data);
      toast({
        title: "Bulletins générés",
        description: "Les bulletins ont été générés avec succès.",
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Bulletins
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Générer les bulletins</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="classId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Classe</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une classe" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name} - {cls.level}
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
              name="quarter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trimestre</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le trimestre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="T1">1er Trimestre</SelectItem>
                      <SelectItem value="T2">2ème Trimestre</SelectItem>
                      <SelectItem value="T3">3ème Trimestre</SelectItem>
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
              <Button type="submit">
                Générer les bulletins (PDF)
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};