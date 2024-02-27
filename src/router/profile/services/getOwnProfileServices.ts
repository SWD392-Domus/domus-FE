import { userApi } from "@/utils/api/userApi";

export const getOwnProfileService = (token: string) => {
    return userApi.getOwnProfile(token);
};
