import { userAdminApi } from "@/utils/api/userApi";

export const getUserByIdService = async (id: string, token: string) => {
  return userAdminApi.getUserById(id, token);
};
