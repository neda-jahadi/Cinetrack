import React from "react";
import { api } from "../lib/api";

type User = { id: string; email: string; name?: string };
type AuthState = {
  user: User | null;
  accessToken: string | null;
  isReady: boolean;
};

const AuthContext = React.createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<string | null>;
}>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AuthState>({
    user: null,
    accessToken: null,
    isReady: false,
  });

  const login = async (email: string, password: string) => {
    const res = await api.post("/api/auth/login", { email, password });
    setState({
      user: res.data.user,
      accessToken: res.data.accessToken,
      isReady: true,
    });
  };

  const logout = async () => {
    await api.post("/api/auth/logout");
    setState({ user: null, accessToken: null, isReady: true });
  };

  const refresh = async () => {
    try {
      const res = await api.post("/api/auth/refresh");
      setState({
        user: res.data.user,
        accessToken: res.data.accessToken,
        isReady: true,
      });
      return res.data.accessToken as string;
    } catch {
      setState({ user: null, accessToken: null, isReady: true });
      return null;
    }
  };

  // silent login on app start
  React.useEffect(() => {
    refresh().finally(() => setState((s) => ({ ...s, isReady: true })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
