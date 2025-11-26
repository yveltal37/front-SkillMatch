import { api } from "./api-axios";
const servicePrefix = "auth";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}
interface CategoryDto {
  id: number;
  name: string;
}
interface AuthResponse {
  user: {
    username: string;
    isAdmin: boolean;
  };
  tokens: Tokens;
}

export const signup = async (data: {
  username: string;
  password: string;
  categoryIds: number[];
}): Promise<AuthResponse> => {
  console.log(data);
  return (await api.post<AuthResponse>(`${servicePrefix}/signup`, data)).data;
};

export const login = async (data: {
  username: string;
  password: string;
}): Promise<AuthResponse> => {
  return (await api.post<AuthResponse>(`${servicePrefix}/login`, data)).data;
};

export const getCategories = async (): Promise<CategoryDto[]> => {
  return (await api.get<CategoryDto[]>(`${servicePrefix}/categories`)).data;
};

export const refresh = async (refreshToken: string): Promise<Tokens> => {
  const res = await api.post<Tokens>(`${servicePrefix}/refresh`, {
    refreshToken,
  });
  return res.data;
};
