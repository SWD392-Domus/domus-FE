import { getAllUserService } from "../service";

export const getAllUser = async (token: string) => {
    const res = await getAllUserService(token);
    return res.data.data;
};
