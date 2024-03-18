import { getStaffService } from "../service";

export const getStaffs = async () => {
    const token = localStorage.getItem("Token") as string;
    const res = await getStaffService(token);
    return res.data;
};
