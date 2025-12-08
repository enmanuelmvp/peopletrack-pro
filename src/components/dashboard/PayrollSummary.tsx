import { DollarSign, TrendingUp, Users, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface PayrollItem {
  label: string;
  value: string;
  icon: typeof DollarSign;
  color: string;
}

const payrollData: PayrollItem[] = [
  {
    label: "Salarios Brutos",
    value: "RD$ 2,450,000",
    icon: DollarSign,
    color: "text-primary",
  },
  {
    label: "Deducciones",
    value: "RD$ 320,500",
    icon: TrendingUp,
    color: "text-destructive",
  },
  {
    label: "Nómina Neta",
    value: "RD$ 2,129,500",
    icon: CreditCard,
    color: "text-success",
  },
  {
    label: "Empleados",
    value: "45",
    icon: Users,
    color: "text-info",
  },
];

export const PayrollSummary = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Resumen de Nómina
          </h3>
          <p className="text-sm text-muted-foreground">Diciembre 2024</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <DollarSign className="h-5 w-5 text-primary" />
        </div>
      </div>

      <div className="space-y-4">
        {payrollData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="group flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg bg-muted", item.color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </span>
              </div>
              <span className={cn("text-sm font-semibold", item.color)}>
                {item.value}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-lg bg-gradient-primary p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-primary-foreground/80">
              Próximo Pago
            </p>
            <p className="text-lg font-bold text-primary-foreground">
              15 de Diciembre
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20">
            <CreditCard className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};
