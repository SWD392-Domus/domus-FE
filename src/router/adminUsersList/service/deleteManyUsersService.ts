import { userAdminApi } from "@/utils/api/userApi";

export const deleteManyUsersService = async (ids: string[], token: string) => {
  return userAdminApi.deleteManyUsers(ids, token);
};
