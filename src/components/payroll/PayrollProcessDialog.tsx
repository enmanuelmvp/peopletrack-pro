import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, CheckCircle } from "lucide-react";

interface PayrollRecord {
  id: string;
  employee: string;
  department: string;
  grossSalary: number;
  afp: number;
  sfs: number;
  isr: number;
  otherDeductions: number;
  bonuses: number;
  netSalary: number;
}

interface PayrollProcessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProcess: (record: PayrollRecord) => void;
  employees: { name: string; department: string }[];
}

// Dominican Republic tax calculations
const calculateAFP = (grossSalary: number) => grossSalary * 0.0287; // 2.87%
const calculateSFS = (grossSalary: number) => grossSalary * 0.0304; // 3.04%
const calculateISR = (grossSalary: number) => {
  const annual = grossSalary * 12;
  if (annual <= 416220) return 0;
  if (annual <= 624329) return ((annual - 416220) * 0.15) / 12;
  if (annual <= 867123) return ((annual - 624329) * 0.20 + 31216.35) / 12;
  return ((annual - 867123) * 0.25 + 79775.15) / 12;
};

export function PayrollProcessDialog({
  open,
  onOpenChange,
  onProcess,
  employees,
}: PayrollProcessDialogProps) {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [grossSalary, setGrossSalary] = useState("");
  const [bonuses, setBonuses] = useState("0");
  const [otherDeductions, setOtherDeductions] = useState("0");
  const [calculated, setCalculated] = useState<PayrollRecord | null>(null);

  const handleCalculate = () => {
    const employee = employees.find((e) => e.name === selectedEmployee);
    if (!employee || !grossSalary) return;

    const gross = parseFloat(grossSalary);
    const bonus = parseFloat(bonuses) || 0;
    const other = parseFloat(otherDeductions) || 0;
    const afp = calculateAFP(gross);
    const sfs = calculateSFS(gross);
    const isr = calculateISR(gross);
    const net = gross - afp - sfs - isr - other + bonus;

    setCalculated({
      id: Date.now().toString(),
      employee: selectedEmployee,
      department: employee.department,
      grossSalary: gross,
      afp: Math.round(afp * 100) / 100,
      sfs: Math.round(sfs * 100) / 100,
      isr: Math.round(isr * 100) / 100,
      otherDeductions: other,
      bonuses: bonus,
      netSalary: Math.round(net * 100) / 100,
    });
  };

  const handleProcess = () => {
    if (calculated) {
      onProcess(calculated);
      onOpenChange(false);
      setCalculated(null);
      setSelectedEmployee("");
      setGrossSalary("");
      setBonuses("0");
      setOtherDeductions("0");
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: "DOP",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Procesar Nómina</DialogTitle>
          <DialogDescription>
            Calcula y procesa la nómina de un empleado
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label>Empleado</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar empleado" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp.name} value={emp.name}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Salario Bruto (DOP)</Label>
              <Input
                type="number"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label>Bonificaciones (DOP)</Label>
              <Input
                type="number"
                value={bonuses}
                onChange={(e) => setBonuses(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label>Otras Deducciones (DOP)</Label>
              <Input
                type="number"
                value={otherDeductions}
                onChange={(e) => setOtherDeductions(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleCalculate} variant="secondary" className="w-full gap-2">
                <Calculator className="h-4 w-4" />
                Calcular
              </Button>
            </div>
          </div>

          {calculated && (
            <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                Resumen de Cálculo
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Salario Bruto:</span>
                <span className="text-right font-medium">{formatCurrency(calculated.grossSalary)}</span>
                <span className="text-muted-foreground">AFP (2.87%):</span>
                <span className="text-right text-destructive">-{formatCurrency(calculated.afp)}</span>
                <span className="text-muted-foreground">SFS (3.04%):</span>
                <span className="text-right text-destructive">-{formatCurrency(calculated.sfs)}</span>
                <span className="text-muted-foreground">ISR:</span>
                <span className="text-right text-destructive">-{formatCurrency(calculated.isr)}</span>
                <span className="text-muted-foreground">Otras Deducciones:</span>
                <span className="text-right text-destructive">-{formatCurrency(calculated.otherDeductions)}</span>
                <span className="text-muted-foreground">Bonificaciones:</span>
                <span className="text-right text-success">+{formatCurrency(calculated.bonuses)}</span>
                <div className="col-span-2 border-t border-border my-2" />
                <span className="font-semibold">Salario Neto:</span>
                <span className="text-right font-bold text-primary">{formatCurrency(calculated.netSalary)}</span>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleProcess} disabled={!calculated}>
              Procesar Nómina
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
