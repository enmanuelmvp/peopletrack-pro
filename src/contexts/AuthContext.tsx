import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "rrhh" | "empleado";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "rrhh_users";
const SESSION_KEY = "rrhh_session";

// Default users
const defaultUsers = [
  { id: "1", email: "admin@empresa.com", password: "admin123", name: "Administrador", role: "admin" as const },
  { id: "2", email: "rrhh@empresa.com", password: "rrhh123", name: "Recursos Humanos", role: "rrhh" as const },
  { id: "3", email: "empleado@empresa.com", password: "emp123", name: "Empleado Demo", role: "empleado" as const },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Initialize default users if not exists
    const existingUsers = localStorage.getItem(USERS_KEY);
    if (!existingUsers) {
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    }

    // Check for existing session
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        const userData = JSON.parse(session);
        setUser(userData);
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const usersData = localStorage.getItem(USERS_KEY);
    if (!usersData) return false;

    const users = JSON.parse(usersData);
    const foundUser = users.find(
      (u: typeof defaultUsers[0]) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      };
      setUser(userData);
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
