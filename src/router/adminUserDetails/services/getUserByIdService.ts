import { userApi } from "@/utils/api/userApi"

export const getUserByIdService = (id: string, token: string) => {
    return userApi.getUserById(id, token);
}