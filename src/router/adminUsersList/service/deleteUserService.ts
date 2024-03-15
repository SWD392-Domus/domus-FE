import { userAdminApi } from "@/utils/api/userApi";

export const deleteUserService = async (id: string, token: string) => {
  return userAdminApi.deleteUser(id, token);
};
