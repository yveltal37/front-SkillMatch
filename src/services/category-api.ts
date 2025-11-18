import { api } from "./api-acxios";

const API_URL = "http://localhost:3000/category";

export const createCategoty = async (name: string ) => {
  const accessToken = sessionStorage.getItem("accessToken");
  return api.post(API_URL, { name }, 
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};