import { createContext } from 'react';
import type {
  AuthCompany,
  AuthUser,
  UserRole,
} from '../features/auth/types/authtypes';

export type AuthContextType = {
  user: AuthUser | null;
  company: AuthCompany | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  role: UserRole | undefined;
  isAdmin: boolean;
  isCompany: boolean;
  isApprovedCompany: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
