import { api, getAuthHeaders } from "./api-axios";

const servicePrefix = '/challenge';

export interface ChallengeDto {
    name: string;
    description: string;
    expirationDate: string;
    categoryIds: number[];
}

export const createChallenge = async (dto: ChallengeDto) => {
    return api.post(
        servicePrefix, 
        dto,
        getAuthHeaders()
    );
};

export const deleteChallenge = async (name: string) => {
    return api.delete(
        `${servicePrefix}/delete/${name}`, 
        getAuthHeaders()
    );
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
