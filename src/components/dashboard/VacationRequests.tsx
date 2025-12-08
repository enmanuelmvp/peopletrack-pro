import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock, Calendar } from "lucide-react";

interface VacationRequest {
  id: string;
  employee: string;
  department: string;
  startDate: string;
  endDate: string;
  days: number;
  status: "pending" | "approved" | "rejected";
}

const requests: VacationRequest[] = [
  {
    id: "1",
    employee: "María García",
    department: "Ventas",
    startDate: "2024-01-15",
    endDate: "2024-01-22",
    days: 5,
    status: "pending",
  },
  {
    id: "2",
    employee: "Carlos López",
    department: "IT",
    startDate: "2024-01-20",
    endDate: "2024-01-25",
    days: 4,
    status: "pending",
  },
  {
    id: "3",
    employee: "Ana Martínez",
    department: "Finanzas",
    startDate: "2024-02-01",
    endDate: "2024-02-10",
    days: 7,
    status: "pending",
  },
];

const statusStyles = {
  pending: {
    label: "Pendiente",
    variant: "outline" as const,
    className: "border-warning text-warning",
  },
  approved: {
    label: "Aprobada",
    variant: "outline" as const,
    className: "border-success text-success",
  },
  rejected: {
    label: "Rechazada",
    variant: "outline" as const,
    className: "border-destructive text-destructive",
  },
};

export const VacationRequests = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Solicitudes de Vacaciones
        </h3>
        <Badge variant="secondary" className="gap-1">
          <Clock className="h-3 w-3" />
          {requests.filter(r => r.status === "pending").length} pendientes
        </Badge>
      </div>

      <div className="space-y-4">
        {requests.map((request, index) => (
          <div
            key={request.id}
            className="group rounded-lg border border-border bg-background p-4 transition-all hover:border-primary/30 hover:shadow-sm"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-foreground">
                    {request.employee}
                  </h4>
                  <Badge
                    variant={statusStyles[request.status].variant}
                    className={statusStyles[request.status].className}
                  >
                    {statusStyles[request.status].label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {request.department}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1 border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <X className="h-3 w-3" />
                  Rechazar
                </Button>
                <Button size="sm" className="h-8 gap-1" variant="success">
                  <Check className="h-3 w-3" />
                  Aprobar
                </Button>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{request.startDate} - {request.endDate}</span>
              </div>
              <span className="font-medium text-foreground">
                {request.days} días
              </span>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="mt-4 w-full">
        Ver todas las solicitudes
      </Button>
    </div>
  );
};
