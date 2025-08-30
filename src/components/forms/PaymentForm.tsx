import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useFinances } from "@/hooks/useFinances";
import { useStudents } from "@/hooks/useStudents";
import { Plus } from "lucide-react";

interface PaymentFormProps {
  onSuccess?: () => void;
}

export const PaymentForm = ({ onSuccess }: PaymentFormProps) => {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const { createPayment, paymentTypes, isLoading } = useFinances();
  const { students } = useStudents();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent || !selectedType || !amount) {
      return;
    }

    const student = students.find(s => s.id === selectedStudent);
    const paymentType = paymentTypes.find(pt => pt.id === selectedType);
    
    if (!student || !paymentType) return;

    try {
      await createPayment({
        student_id: student.id,
        student_name: `${student.firstName} ${student.lastName}`,
        class_name: student.class || 'Non définie',
        type: paymentType.name,
        amount: parseFloat(amount),
        date
      });

      // Reset form
      setSelectedStudent("");
      setSelectedType("");
      setAmount("");
      setDate(new Date().toISOString().split('T')[0]);
      setOpen(false);
      
      onSuccess?.();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du paiement:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Paiement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enregistrer un Paiement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student">Élève</Label>
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un élève" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.firstName} {student.lastName} - {student.class || 'Classe non définie'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type de paiement</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type de paiement" />
              </SelectTrigger>
              <SelectContent>
                {paymentTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name} - {type.amount} FCFA
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Montant (FCFA)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Montant du paiement"
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date de paiement</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !selectedStudent || !selectedType || !amount}
              className="flex-1"
            >
              {isLoading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};