import { userApi } from "@/utils/api/userApi"

export const UpdateUserServices = (id: string, data: any, token: string) => {
    return userApi.updateUser(id, data, token);
}