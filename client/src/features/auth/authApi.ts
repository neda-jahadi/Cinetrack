import { api } from "../../lib/api";
import type { AuthMeApiResponse, loginType, registerType } from "../../types/authtypes"


export const login = async (data: loginType) => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

export const register = async (data: registerType) => {
  const res = await api.post("/api/auth/register", data);
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/api/auth/logout");
  return res.data;
};

export const getMe = async (): Promise<AuthMeApiResponse> => {
  const res = await api.get("/api/auth/me");
  return res.data.data;
};