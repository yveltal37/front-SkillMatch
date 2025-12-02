import { api } from "./api-axios";

const servicePrefix = "/user";

export interface UserDto {
  id: number;
  username: string;
}

export interface UserStatisticsDto {
  categoryName: string;
  completedChallenges: number;
}

export const getAllUsers = async () => {
  const accessToken = sessionStorage.getItem("accessToken");
  return (
    await api.get<UserDto[]>(`${servicePrefix}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  ).data;
};

export const getUserStatistics = async (username: string) => {
  const accessToken = sessionStorage.getItem("accessToken");
  return (
    await api.get<UserStatisticsDto[]>(
      `${servicePrefix}/statistics/${username}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
  ).data;
};
