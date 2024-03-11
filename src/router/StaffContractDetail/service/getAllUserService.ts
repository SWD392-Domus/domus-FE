import { userApi } from "@/utils/api/userApi";

export const getAllUserService = (token: string) => {
    return userApi.getAllUser(token);
};
