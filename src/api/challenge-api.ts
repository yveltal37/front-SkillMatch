import { api, getAuthHeaders } from "./api-axios";

const servicePrefix = "/challenge";

export interface CreateChallengeDto {
  name: string;
  description: string;
  expirationDate: string;
  categoryIds: number[];
}
export interface ChallengeDto extends CreateChallengeDto {
  categories: string[];
  id: number;
  isComplete: boolean;
}

export const createChallenge = async (dto: CreateChallengeDto) => {
  return api.post(servicePrefix, dto, getAuthHeaders());
};

export const deleteChallenge = async (name: string) => {
  return api.delete(`${servicePrefix}/delete/${name}`, getAuthHeaders());
};

export const getUserChallenges = async () => {
  return api.get<ChallengeDto[]>(
    `${servicePrefix}/my-challenges`,
    getAuthHeaders()
  );
};

export const toggleChallenge = async (challengeName: string) => {
  return api.post(
    `${servicePrefix}/toggle/${challengeName}`,
    {},
    getAuthHeaders()
  );
};
