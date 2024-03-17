import { userApi } from "@/utils/api/userApi";

export const createUserService = (data: any, token: string) => {
    return userApi.createUser(data, token);
}