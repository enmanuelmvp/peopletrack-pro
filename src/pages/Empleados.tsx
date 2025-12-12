import { useState, useRef } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreVertical,
  Mail,
  Phone,
  Eye,
  Pencil,
  Trash2,
  Upload,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportToJSON, importFromJSON } from "@/lib/jsonExport";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: "active" | "inactive" | "suspended";
  startDate: string;
  avatar?: string;
}

const employees: Employee[] = [
  {
    id: "1",
    name: "María García López",
    email: "maria.garcia@empresa.com",
    phone: "809-555-0101",
    department: "Ventas",
    position: "Gerente de Ventas",
    status: "active",
    startDate: "2020-03-15",
  },
  {
    id: "2",
    name: "Carlos Rodríguez Pérez",
    email: "carlos.rodriguez@empresa.com",
    phone: "809-555-0102",
    department: "IT",
    position: "Desarrollador Senior",
    status: "active",
    startDate: "2019-08-20",
  },
  {
    id: "3",
    name: "Ana Martínez Santos",
    email: "ana.martinez@empresa.com",
    phone: "809-555-0103",
    department: "Finanzas",
    position: "Contadora",
    status: "active",
    startDate: "2021-01-10",
  },
  {
    id: "4",
    name: "Pedro Sánchez Díaz",
    email: "pedro.sanchez@empresa.com",
    phone: "809-555-0104",
    department: "Recursos Humanos",
    position: "Analista de RRHH",
    status: "inactive",
    startDate: "2018-06-05",
  },
  {
    id: "5",
    name: "Laura Fernández Cruz",
    email: "laura.fernandez@empresa.com",
    phone: "809-555-0105",
    department: "Marketing",
    position: "Diseñadora Gráfica",
    status: "active",
    startDate: "2022-02-28",
  },
  {
    id: "6",
    name: "José Ramírez Vega",
    email: "jose.ramirez@empresa.com",
    phone: "809-555-0106",
    department: "Operaciones",
    position: "Supervisor",
    status: "suspended",
    startDate: "2017-11-12",
  },
];

const statusConfig = {
  active: {
    label: "Activo",
    className: "bg-success/10 text-success border-success/20",
  },
  inactive: {
    label: "Inactivo",
    className: "bg-muted text-muted-foreground border-muted",
  },
  suspended: {
    label: "Suspendido",
    className: "bg-warning/10 text-warning border-warning/20",
  },
};

const Empleados = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [employeeData, setEmployeeData] = useState<Employee[]>(employees);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleExportJSON = () => {
    exportToJSON(employeeData, `empleados_${new Date().toISOString().split('T')[0]}`);
    toast({ title: "Exportado", description: "Datos exportados a JSON correctamente" });
  };

  const handleImportJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importFromJSON<Employee[]>(file);
      setEmployeeData(data);
      toast({ title: "Importado", description: `${data.length} empleados importados correctamente` });
    } catch {
      toast({ title: "Error", description: "Archivo JSON inválido", variant: "destructive" });
    }
    e.target.value = '';
  };

  const filteredEmployees = employeeData.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;
    const matchesStatus =
      statusFilter === "all" || employee.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departments = [...new Set(employeeData.map((e) => e.department))];

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-slide-up">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Empleados
          </h1>
          <p className="mt-1 text-muted-foreground">
            Gestiona la información de todos los empleados
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Empleado
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o correo..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="inactive">Inactivo</SelectItem>
              <SelectItem value="suspended">Suspendido</SelectItem>
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
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden animate-slide-up" style={{ animationDelay: "200ms" }}>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Empleado</TableHead>
              <TableHead className="font-semibold">Departamento</TableHead>
              <TableHead className="font-semibold">Cargo</TableHead>
              <TableHead className="font-semibold">Contacto</TableHead>
              <TableHead className="font-semibold">Estado</TableHead>
              <TableHead className="font-semibold">Fecha Ingreso</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee, index) => (
              <TableRow
                key={employee.id}
                className="group hover:bg-muted/30 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {employee.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {employee.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{employee.department}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {employee.position}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <a
                      href={`mailto:${employee.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                    <a
                      href={`tel:${employee.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusConfig[employee.status].className}
                  >
                    {statusConfig[employee.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(employee.startDate).toLocaleDateString("es-DO")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="h-4 w-4" />
                        Ver Detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Pencil className="h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Info */}
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: "300ms" }}>
        <p>
          Mostrando {filteredEmployees.length} de {employeeData.length} empleados
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm">
            Siguiente
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Empleados;
