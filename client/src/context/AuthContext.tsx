import { createContext, useContext, type ReactNode } from "react";
import { useMe } from "../features/auth/authQueries";
import type { AuthCompany, AuthUser, UserRole } from "../types/authtypes";

type AuthContextType = {
  user: AuthUser | null;
  company: AuthCompany | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  role: UserRole | undefined;
  isAdmin: boolean;
  isCompany: boolean;
  isApprovedCompany: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data, isLoading, isError } = useMe();

  const user = data?.user ?? null;
  const company = data?.company ?? null;

  return (
    <AuthContext.Provider
      value={{
        user,
        company,
        isLoading,
        isAuthenticated: !!user && !isError,
        role: user?.role,
        isAdmin: user?.role === "ADMIN",
        isCompany: user?.role === "COMPANY",
        isApprovedCompany:
          user?.role === "COMPANY" && company?.status === "APPROVED",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
