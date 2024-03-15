import { userAdminApi } from "@/utils/api/userApi";

export const getAllUsersService = async () => {
  return userAdminApi.getAllUsers();
};
