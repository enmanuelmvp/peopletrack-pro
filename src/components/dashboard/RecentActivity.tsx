import { cn } from "@/lib/utils";
import { 
  UserPlus, 
  DollarSign, 
  Palmtree, 
  UserCheck,
  Clock
} from "lucide-react";

interface Activity {
  id: string;
  type: "new_employee" | "payroll" | "vacation_request" | "vacation_approved";
  description: string;
  timestamp: string;
  user: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "vacation_approved",
    description: "Solicitud de vacaciones aprobada",
    timestamp: "Hace 2 horas",
    user: "María García",
  },
  {
    id: "2",
    type: "new_employee",
    description: "Nuevo empleado registrado",
    timestamp: "Hace 5 horas",
    user: "Carlos Rodríguez",
  },
  {
    id: "3",
    type: "payroll",
    description: "Nómina procesada para Diciembre",
    timestamp: "Ayer",
    user: "Sistema",
  },
  {
    id: "4",
    type: "vacation_request",
    description: "Nueva solicitud de vacaciones",
    timestamp: "Hace 2 días",
    user: "Ana Martínez",
  },
  {
    id: "5",
    type: "new_employee",
    description: "Nuevo empleado registrado",
    timestamp: "Hace 3 días",
    user: "Pedro Sánchez",
  },
];

const activityIcons = {
  new_employee: UserPlus,
  payroll: DollarSign,
  vacation_request: Palmtree,
  vacation_approved: UserCheck,
};

const activityColors = {
  new_employee: "bg-info/10 text-info",
  payroll: "bg-success/10 text-success",
  vacation_request: "bg-warning/10 text-warning",
  vacation_approved: "bg-primary/10 text-primary",
};

export const RecentActivity = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Actividad Reciente
        </h3>
        <Clock className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          return (
            <div
              key={activity.id}
              className="group flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105",
                  activityColors[activity.type]
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {activity.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.user}
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {activity.timestamp}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
