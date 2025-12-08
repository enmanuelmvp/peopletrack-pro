import { useState } from "react";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Palmtree,
  Plus,
  Search,
  Calendar,
  Check,
  X,
  Clock,
  Download,
  Eye,
} from "lucide-react";

interface VacationRequest {
  id: string;
  employee: string;
  department: string;
  startDate: string;
  endDate: string;
  daysRequested: number;
  daysAvailable: number;
  reason?: string;
  status: "pending" | "approved" | "rejected";
  requestDate: string;
}

const vacationRequests: VacationRequest[] = [
  {
    id: "1",
    employee: "María García López",
    department: "Ventas",
    startDate: "2024-01-15",
    endDate: "2024-01-22",
    daysRequested: 5,
    daysAvailable: 14,
    reason: "Vacaciones familiares",
    status: "pending",
    requestDate: "2024-01-05",
  },
  {
    id: "2",
    employee: "Carlos Rodríguez Pérez",
    department: "IT",
    startDate: "2024-01-20",
    endDate: "2024-01-25",
    daysRequested: 4,
    daysAvailable: 18,
    status: "pending",
    requestDate: "2024-01-06",
  },
  {
    id: "3",
    employee: "Ana Martínez Santos",
    department: "Finanzas",
    startDate: "2024-02-01",
    endDate: "2024-02-10",
    daysRequested: 7,
    daysAvailable: 21,
    reason: "Viaje personal",
    status: "approved",
    requestDate: "2024-01-02",
  },
  {
    id: "4",
    employee: "Pedro Sánchez Díaz",
    department: "RRHH",
    startDate: "2024-01-08",
    endDate: "2024-01-10",
    daysRequested: 2,
    daysAvailable: 10,
    status: "rejected",
    requestDate: "2024-01-03",
  },
  {
    id: "5",
    employee: "Laura Fernández Cruz",
    department: "Marketing",
    startDate: "2024-02-15",
    endDate: "2024-02-22",
    daysRequested: 5,
    daysAvailable: 12,
    reason: "Descanso",
    status: "pending",
    requestDate: "2024-01-07",
  },
];

const statusConfig = {
  pending: {
    label: "Pendiente",
    className: "bg-warning/10 text-warning border-warning/20",
    icon: Clock,
  },
  approved: {
    label: "Aprobada",
    className: "bg-success/10 text-success border-success/20",
    icon: Check,
  },
  rejected: {
    label: "Rechazada",
    className: "bg-destructive/10 text-destructive border-destructive/20",
    icon: X,
  },
};

const Vacaciones = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const pendingCount = vacationRequests.filter(
    (r) => r.status === "pending"
  ).length;
  const approvedCount = vacationRequests.filter(
    (r) => r.status === "approved"
  ).length;
  const rejectedCount = vacationRequests.filter(
    (r) => r.status === "rejected"
  ).length;

  const filteredRequests = vacationRequests.filter(
    (request) => statusFilter === "all" || request.status === statusFilter
  );

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-slide-up">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Vacaciones
          </h1>
          <p className="mt-1 text-muted-foreground">
            Gestión de solicitudes y control de vacaciones
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Ver Calendario
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva Solicitud
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3 animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10 text-warning">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
            <p className="text-sm text-muted-foreground">Pendientes</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10 text-success">
            <Check className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{approvedCount}</p>
            <p className="text-sm text-muted-foreground">Aprobadas</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
            <X className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{rejectedCount}</p>
            <p className="text-sm text-muted-foreground">Rechazadas</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="requests" className="animate-slide-up" style={{ animationDelay: "200ms" }}>
        <TabsList className="mb-6">
          <TabsTrigger value="requests" className="gap-2">
            <Palmtree className="h-4 w-4" />
            Solicitudes
          </TabsTrigger>
          <TabsTrigger value="calendar" className="gap-2">
            <Calendar className="h-4 w-4" />
            Calendario
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests">
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar empleado..." className="pl-10" />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="approved">Aprobadas</SelectItem>
                  <SelectItem value="rejected">Rechazadas</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Empleado</TableHead>
                  <TableHead className="font-semibold">Período</TableHead>
                  <TableHead className="font-semibold">Días</TableHead>
                  <TableHead className="font-semibold">Disponibles</TableHead>
                  <TableHead className="font-semibold">Motivo</TableHead>
                  <TableHead className="font-semibold">Estado</TableHead>
                  <TableHead className="font-semibold">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request, index) => {
                  const StatusIcon = statusConfig[request.status].icon;
                  return (
                    <TableRow
                      key={request.id}
                      className="group hover:bg-muted/30 transition-colors"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">
                            {request.employee}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {request.department}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(request.startDate).toLocaleDateString(
                              "es-DO"
                            )}{" "}
                            -{" "}
                            {new Date(request.endDate).toLocaleDateString(
                              "es-DO"
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-primary">
                          {request.daysRequested}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">
                          {request.daysAvailable}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate text-muted-foreground">
                        {request.reason || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusConfig[request.status].className}
                        >
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {statusConfig[request.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {request.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1 border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                              <Button size="sm" className="h-8 gap-1" variant="success">
                                <Check className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <div className="flex h-[400px] items-center justify-center rounded-xl border border-border bg-card shadow-card">
            <div className="text-center">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium text-foreground">
                Calendario de Vacaciones
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Vista de calendario próximamente
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Vacaciones;
