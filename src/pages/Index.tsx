import { MainLayout } from "@/components/layout/MainLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { VacationRequests } from "@/components/dashboard/VacationRequests";
import { PayrollSummary } from "@/components/dashboard/PayrollSummary";
import { 
  Users, 
  UserCheck, 
  Palmtree, 
  DollarSign,
  TrendingUp,
  Calendar
} from "lucide-react";

const Dashboard = () => {
  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Bienvenido de vuelta. Aquí está el resumen de tu empresa.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="animate-slide-up stagger-1">
          <StatsCard
            title="Total Empleados"
            value={156}
            subtitle="En toda la empresa"
            icon={Users}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
        </div>
        <div className="animate-slide-up stagger-2">
          <StatsCard
            title="Empleados Activos"
            value={148}
            subtitle="95% del total"
            icon={UserCheck}
            variant="success"
          />
        </div>
        <div className="animate-slide-up stagger-3">
          <StatsCard
            title="Vacaciones Pendientes"
            value={8}
            subtitle="Solicitudes por aprobar"
            icon={Palmtree}
            variant="warning"
          />
        </div>
        <div className="animate-slide-up stagger-4">
          <StatsCard
            title="Nómina del Mes"
            value="RD$ 2.1M"
            subtitle="Diciembre 2024"
            icon={DollarSign}
            variant="info"
            trend={{ value: 5.2, isPositive: true }}
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <VacationRequests />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
            <RecentActivity />
          </div>
        </div>

        {/* Right Column - Payroll Summary */}
        <div className="animate-slide-up" style={{ animationDelay: "400ms" }}>
          <PayrollSummary />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-card animate-slide-up" style={{ animationDelay: "500ms" }}>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Acciones Rápidas
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction
            icon={Users}
            label="Nuevo Empleado"
            description="Registrar empleado"
            href="/empleados"
          />
          <QuickAction
            icon={DollarSign}
            label="Procesar Nómina"
            description="Generar nómina mensual"
            href="/nomina"
          />
          <QuickAction
            icon={Calendar}
            label="Calendario"
            description="Ver calendario de vacaciones"
            href="/vacaciones"
          />
          <QuickAction
            icon={TrendingUp}
            label="Reportes"
            description="Ver reportes y estadísticas"
            href="/reportes"
          />
        </div>
      </div>
    </MainLayout>
  );
};

interface QuickActionProps {
  icon: typeof Users;
  label: string;
  description: string;
  href: string;
}

const QuickAction = ({ icon: Icon, label, description, href }: QuickActionProps) => {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-lg border border-border bg-background p-4 transition-all hover:border-primary/30 hover:shadow-sm"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
          {label}
        </p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </a>
  );
};

export default Dashboard;
