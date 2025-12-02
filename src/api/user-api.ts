import { api, getAuthHeaders } from "./api-axios";

const servicePrefix = "/user";

export interface UserDto {
  id: number;
  username: string;
  isAdmin: boolean;
}

export interface UserStatisticsDto {
  categoryName: string;
  completedChallenges: number;
}

export const getAllUsers = async () => {
  return (await api.get<UserDto[]>(`${servicePrefix}`, getAuthHeaders())).data;
};

export const getUserStatistics = async (username: string) => {
  return (
    await api.get<UserStatisticsDto[]>(
      `${servicePrefix}/statistics/${username}`,
      getAuthHeaders()
    )
  ).data;
};
