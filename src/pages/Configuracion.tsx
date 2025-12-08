import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Settings,
  Building2,
  Users,
  Bell,
  Shield,
  Palette,
  Database,
  Save,
} from "lucide-react";

const Configuracion = () => {
  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Configuración
        </h1>
        <p className="mt-1 text-muted-foreground">
          Administra la configuración del sistema
        </p>
      </div>

      <Tabs defaultValue="company" className="animate-slide-up" style={{ animationDelay: "100ms" }}>
        <TabsList className="mb-6 flex-wrap">
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="h-4 w-4" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Seguridad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Información de la Empresa
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nombre de la Empresa</Label>
                <Input id="companyName" defaultValue="Mi Empresa S.R.L." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rnc">RNC</Label>
                <Input id="rnc" defaultValue="123-45678-9" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" defaultValue="Av. Principal #123, Santo Domingo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" defaultValue="809-555-0100" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" defaultValue="info@miempresa.com" />
              </div>
            </div>

            <Separator className="my-6" />

            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Configuración de Nómina
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="afpRate">Tasa AFP (%)</Label>
                <Input id="afpRate" type="number" defaultValue="2.87" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sfsRate">Tasa SFS (%)</Label>
                <Input id="sfsRate" type="number" defaultValue="3.04" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payDay">Día de Pago</Label>
                <Input id="payDay" type="number" defaultValue="15" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Moneda</Label>
                <Input id="currency" defaultValue="DOP" />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Guardar Cambios
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Gestión de Usuarios
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Administra los usuarios y sus roles en el sistema.
            </p>

            <div className="space-y-4">
              {[
                { name: "Admin Usuario", email: "admin@empresa.com", role: "Administrador" },
                { name: "RRHH Usuario", email: "rrhh@empresa.com", role: "Recursos Humanos" },
                { name: "Empleado Demo", email: "empleado@empresa.com", role: "Empleado" },
              ].map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{user.role}</span>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button className="mt-6 gap-2">
              <Users className="h-4 w-4" />
              Agregar Usuario
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Preferencias de Notificaciones
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Nuevas solicitudes de vacaciones</p>
                  <p className="text-sm text-muted-foreground">
                    Recibir notificación cuando un empleado solicite vacaciones
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Procesamiento de nómina</p>
                  <p className="text-sm text-muted-foreground">
                    Notificación al procesar la nómina mensual
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Nuevos empleados</p>
                  <p className="text-sm text-muted-foreground">
                    Recibir notificación al registrar nuevos empleados
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Correos de resumen</p>
                  <p className="text-sm text-muted-foreground">
                    Recibir resumen semanal por correo electrónico
                  </p>
                </div>
                <Switch />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Guardar Preferencias
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Configuración de Seguridad
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Autenticación de dos factores</p>
                  <p className="text-sm text-muted-foreground">
                    Requerir código adicional al iniciar sesión
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Expiración de sesión</p>
                  <p className="text-sm text-muted-foreground">
                    Cerrar sesión automáticamente después de 30 minutos de inactividad
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Registro de auditoría</p>
                  <p className="text-sm text-muted-foreground">
                    Mantener registro de todas las acciones del sistema
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <Separator className="my-6" />

            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Cambiar Contraseña
            </h3>
            <div className="grid gap-4 sm:max-w-md">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contraseña Actual</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button className="w-fit gap-2">
                <Shield className="h-4 w-4" />
                Actualizar Contraseña
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Configuracion;
