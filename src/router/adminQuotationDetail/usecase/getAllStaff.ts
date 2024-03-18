import { getAllStaffService } from "../service";

export const getAllStaff = async (token: string) => {
  const res = await getAllStaffService(token);
  return res.data.data;
};
