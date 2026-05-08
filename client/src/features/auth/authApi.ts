import axios from "axios";
import { api } from "../../lib/api";
import type { AuthMeApiResponse, loginType, registerType } from "../../types/authtypes"


export const login = async (data: loginType) => {
  try {
    const res = await api.post("/api/auth/login", data);
    return res.data.data;

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Login failed"
    );
  }
};

export const register = async (data: registerType) => {
  try {
    const res = await api.post("/api/auth/register", data);
    return res.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Register failed"
    );
  }
};

export const logout = async () => {
  const res = await api.post("/api/auth/logout");
  return res.data;
};

export const getMe = async (): Promise<AuthMeApiResponse | null> => {
  try {
    const res = await api.get("/api/auth/me");

    if (!res.data?.success || !res.data?.data) {
      return null;
    }

    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }

    throw error;
  }
};