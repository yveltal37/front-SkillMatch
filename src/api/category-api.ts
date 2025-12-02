import { api, getAuthHeaders } from "./api-axios";

const servicePrefix = '/category';

export const createCategoty = async (name: string) => {
  return api.post(
    servicePrefix,
    { name },
    getAuthHeaders()
  );
};
