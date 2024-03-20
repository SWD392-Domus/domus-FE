import { userAdminApi } from "@/utils/api/userApi";

export const getAllStaffService = (token: string) => {
  return userAdminApi.getAllStaff(token);
};
