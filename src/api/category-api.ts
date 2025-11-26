import { api } from "./api-axios";

const servicePrefix = '/category';

export const createCategoty = async (name: string) => {
  const accessToken = sessionStorage.getItem("accessToken");
  return api.post(
    servicePrefix,
    { name },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};
