import { getOwnProfileService } from "../services";

export const getOwnProfile = (token: string) => {
    return getOwnProfileService(token);
};
