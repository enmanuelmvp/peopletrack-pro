import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Download,
  Users,
  DollarSign,
  Palmtree,
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  Building2,
} from "lucide-react";

interface ReportCard {
  id: string;
  title: string;
  description: string;
  icon: typeof FileText;
  category: "employees" | "payroll" | "vacations" | "general";
  lastGenerated?: string;
}

const reports: ReportCard[] = [
  {
    id: "1",
    title: "Listado de Empleados Activos",
    description: "Reporte completo de todos los empleados activos con datos personales",
    icon: Users,
    category: "employees",
    lastGenerated: "2024-01-05",
  },
  {
    id: "2",
    title: "Empleados por Departamento",
    description: "Distribución de empleados por departamento y cargo",
    icon: Building2,
    category: "employees",
    lastGenerated: "2024-01-04",
  },
  {
    id: "3",
    title: "Nómina Mensual",
    description: "Detalle completo de la nómina del período seleccionado",
    icon: DollarSign,
    category: "payroll",
    lastGenerated: "2024-01-01",
  },
  {
    id: "4",
    title: "Análisis de Deducciones",
    description: "Resumen de AFP, SFS, ISR y otras deducciones",
    icon: TrendingUp,
    category: "payroll",
  },
  {
    id: "5",
    title: "Historial de Vacaciones",
    description: "Registro histórico de vacaciones por empleado",
    icon: Palmtree,
    category: "vacations",
    lastGenerated: "2024-01-03",
  },
  {
    id: "6",
    title: "Vacaciones Pendientes",
    description: "Empleados con días de vacaciones disponibles",
    icon: Calendar,
    category: "vacations",
  },
  {
    id: "7",
    title: "Estadísticas Generales",
    description: "Resumen ejecutivo con KPIs principales",
    icon: BarChart3,
    category: "general",
    lastGenerated: "2024-01-06",
  },
  {
    id: "8",
    title: "Distribución Salarial",
    description: "Análisis de rangos salariales por departamento",
    icon: PieChart,
    category: "payroll",
  },
];

const categoryConfig = {
  employees: {
    label: "Empleados",
    color: "bg-info/10 text-info",
  },
  payroll: {
    label: "Nómina",
    color: "bg-success/10 text-success",
  },
  vacations: {
    label: "Vacaciones",
    color: "bg-warning/10 text-warning",
  },
  general: {
    label: "General",
    color: "bg-primary/10 text-primary",
  },
};

const Reportes = () => {
  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-slide-up">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Reportes
          </h1>
          <p className="mt-1 text-muted-foreground">
            Genera y exporta reportes de la empresa
          </p>
        </div>
        <Button className="gap-2">
          <FileText className="h-4 w-4" />
          Crear Reporte Personalizado
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center animate-slide-up" style={{ animationDelay: "100ms" }}>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="employees">Empleados</SelectItem>
            <SelectItem value="payroll">Nómina</SelectItem>
            <SelectItem value="vacations">Vacaciones</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="december">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="december">Diciembre 2024</SelectItem>
            <SelectItem value="november">Noviembre 2024</SelectItem>
            <SelectItem value="october">Octubre 2024</SelectItem>
            <SelectItem value="q4">Q4 2024</SelectItem>
            <SelectItem value="2024">Año 2024</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, index) => {
          const Icon = report.icon;
          return (
            <div
              key={report.id}
              className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <Badge
                  variant="secondary"
                  className={categoryConfig[report.category].color}
                >
                  {categoryConfig[report.category].label}
                </Badge>
              </div>

              <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary transition-colors">
                {report.title}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {report.description}
              </p>

              {report.lastGenerated && (
                <p className="mb-4 text-xs text-muted-foreground">
                  Último generado:{" "}
                  {new Date(report.lastGenerated).toLocaleDateString("es-DO")}
                </p>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <FileText className="h-4 w-4" />
                  Vista Previa
                </Button>
                <Button size="sm" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Descargar
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-card animate-slide-up" style={{ animationDelay: "600ms" }}>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Reportes Frecuentes
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickReport
            icon={Users}
            label="Empleados Activos"
            count="156"
            color="text-info"
          />
          <QuickReport
            icon={DollarSign}
            label="Nóminas Procesadas"
            count="12"
            color="text-success"
          />
          <QuickReport
            icon={Palmtree}
            label="Vacaciones del Mes"
            count="8"
            color="text-warning"
          />
          <QuickReport
            icon={FileText}
            label="Reportes Generados"
            count="45"
            color="text-primary"
          />
        </div>
      </div>
    </MainLayout>
  );
};

interface QuickReportProps {
  icon: typeof Users;
  label: string;
  count: string;
  color: string;
}

const QuickReport = ({ icon: Icon, label, count, color }: QuickReportProps) => {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-background p-4 transition-all hover:border-primary/30">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{count}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};

export default Reportes;
