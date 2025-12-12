import { useState, useRef } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  Download,
  Search,
  Calculator,
  FileText,
  TrendingDown,
  TrendingUp,
  Eye,
  Upload,
} from "lucide-react";
import { exportToJSON, importFromJSON } from "@/lib/jsonExport";
import { useToast } from "@/hooks/use-toast";

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

const payrollRecords: PayrollRecord[] = [
  {
    id: "1",
    employee: "María García López",
    department: "Ventas",
    grossSalary: 85000,
    afp: 2437.5,
    sfs: 2584,
    isr: 4250,
    otherDeductions: 0,
    bonuses: 5000,
    netSalary: 80728.5,
  },
  {
    id: "2",
    employee: "Carlos Rodríguez Pérez",
    department: "IT",
    grossSalary: 120000,
    afp: 3442.8,
    sfs: 3648,
    isr: 12500,
    otherDeductions: 2000,
    bonuses: 8000,
    netSalary: 106409.2,
  },
  {
    id: "3",
    employee: "Ana Martínez Santos",
    department: "Finanzas",
    grossSalary: 75000,
    afp: 2152.5,
    sfs: 2280,
    isr: 2875,
    otherDeductions: 0,
    bonuses: 0,
    netSalary: 67692.5,
  },
  {
    id: "4",
    employee: "Pedro Sánchez Díaz",
    department: "RRHH",
    grossSalary: 65000,
    afp: 1866.5,
    sfs: 1976,
    isr: 1625,
    otherDeductions: 1500,
    bonuses: 0,
    netSalary: 58032.5,
  },
  {
    id: "5",
    employee: "Laura Fernández Cruz",
    department: "Marketing",
    grossSalary: 55000,
    afp: 1579,
    sfs: 1672,
    isr: 625,
    otherDeductions: 0,
    bonuses: 2500,
    netSalary: 53624,
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    minimumFractionDigits: 0,
  }).format(amount);
};

const Nomina = () => {
  const [payrollData, setPayrollData] = useState<PayrollRecord[]>(payrollRecords);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const totalGross = payrollData.reduce((sum, r) => sum + r.grossSalary, 0);
  const totalNet = payrollData.reduce((sum, r) => sum + r.netSalary, 0);
  const totalDeductions = payrollData.reduce(
    (sum, r) => sum + r.afp + r.sfs + r.isr + r.otherDeductions,
    0
  );
  const totalBonuses = payrollData.reduce((sum, r) => sum + r.bonuses, 0);

  const handleExportJSON = () => {
    exportToJSON(payrollData, `nomina_${new Date().toISOString().split('T')[0]}`);
    toast({ title: "Exportado", description: "Nómina exportada a JSON correctamente" });
  };

  const handleImportJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importFromJSON<PayrollRecord[]>(file);
      setPayrollData(data);
      toast({ title: "Importado", description: `${data.length} registros importados correctamente` });
    } catch {
      toast({ title: "Error", description: "Archivo JSON inválido", variant: "destructive" });
    }
    e.target.value = '';
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-slide-up">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Nómina
          </h1>
          <p className="mt-1 text-muted-foreground">
            Gestión y procesamiento de nómina mensual
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calculator className="h-4 w-4" />
            Calcular Nómina
          </Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Procesar Nómina
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Salario Bruto Total
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {formatCurrency(totalGross)}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Deducciones Totales
              </p>
              <p className="mt-1 text-2xl font-bold text-destructive">
                {formatCurrency(totalDeductions)}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <TrendingDown className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Bonificaciones
              </p>
              <p className="mt-1 text-2xl font-bold text-success">
                {formatCurrency(totalBonuses)}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Nómina Neta Total
              </p>
              <p className="mt-1 text-2xl font-bold text-info">
                {formatCurrency(totalNet)}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10 text-info">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center animate-slide-up" style={{ animationDelay: "200ms" }}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar empleado..." className="pl-10" />
        </div>
        <div className="flex gap-3">
          <Select defaultValue="december">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="december">Diciembre 2024</SelectItem>
              <SelectItem value="november">Noviembre 2024</SelectItem>
              <SelectItem value="october">Octubre 2024</SelectItem>
            </SelectContent>
          </Select>
          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            onChange={handleImportJSON}
            className="hidden"
          />
          <Button variant="outline" className="gap-2" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-4 w-4" />
            Importar
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleExportJSON}>
            <Download className="h-4 w-4" />
            Exportar JSON
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-x-auto animate-slide-up" style={{ animationDelay: "300ms" }}>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Empleado</TableHead>
              <TableHead className="font-semibold text-right">Salario Bruto</TableHead>
              <TableHead className="font-semibold text-right">AFP</TableHead>
              <TableHead className="font-semibold text-right">SFS</TableHead>
              <TableHead className="font-semibold text-right">ISR</TableHead>
              <TableHead className="font-semibold text-right">Otras Ded.</TableHead>
              <TableHead className="font-semibold text-right">Bonificaciones</TableHead>
              <TableHead className="font-semibold text-right">Salario Neto</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrollData.map((record, index) => (
              <TableRow
                key={record.id}
                className="group hover:bg-muted/30 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">
                      {record.employee}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {record.department}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(record.grossSalary)}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatCurrency(record.afp)}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatCurrency(record.sfs)}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatCurrency(record.isr)}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatCurrency(record.otherDeductions)}
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-success font-medium">
                    +{formatCurrency(record.bonuses)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-semibold text-primary">
                    {formatCurrency(record.netSalary)}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-muted/30 p-4 animate-slide-up" style={{ animationDelay: "400ms" }}>
        <div className="text-sm text-muted-foreground">
          Período: <span className="font-medium text-foreground">Diciembre 2024</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">
            Empleados procesados: <span className="font-medium text-foreground">{payrollData.length}</span>
          </span>
          <Badge variant="secondary" className="gap-1">
            <DollarSign className="h-3 w-3" />
            Total Neto: {formatCurrency(totalNet)}
          </Badge>
        </div>
      </div>
    </MainLayout>
  );
};

export default Nomina;
