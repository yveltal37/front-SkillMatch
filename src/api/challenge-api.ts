import { api } from "./api-axios";

const servicePrefix = '/challenge';

export interface CreateChallengeDto {
    name: string;
    description: string;
    expirationDate: string;
    categoryIds: number[];
}

export const createChallenge = async (dto: CreateChallengeDto) => {
    const accessToken = sessionStorage.getItem("accessToken");

    return api.post(
        servicePrefix, 
        dto,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );
};