import { type ReactNode } from 'react';
import { useMe } from '@/features/auth/api/authQueries';
import { AuthContext } from './AuthContext';

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
        isAdmin: user?.role === 'ADMIN',
        isCompany: user?.role === 'COMPANY',
        isApprovedCompany:
          user?.role === 'COMPANY' && company?.status === 'APPROVED',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
