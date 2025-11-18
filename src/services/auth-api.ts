import axios from 'axios';

const API_URL = "http://localhost:3000/auth";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}
interface CategoryDto {
    id: number;
    name: string;
}

export const signup = async (data: { username: string; password: string; categoryIds: number[] }): Promise<Tokens> => {
  return (await axios.post<Tokens>(`${API_URL}/signup`, data)).data;
};

export const login = async (data: { username: string; password: string }): Promise<Tokens> => {
  return (await axios.post<Tokens>(`${API_URL}/login`, data)).data;
}

export const getCategories = async (): Promise<CategoryDto[]>  => {
  return (await axios.get<CategoryDto[]>(`${API_URL}/categories`)).data;
}

export const refresh = async (refreshToken: string): Promise<Tokens> => {
  const res = await axios.post<Tokens>(`${API_URL}/refresh`, { refreshToken });
  return res.data;
}
