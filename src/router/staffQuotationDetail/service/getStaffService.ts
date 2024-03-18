import { userApi } from "@/utils/api/userApi";

export const getStaffService = (token: string) => {
    return userApi.getStaff(token);
};
