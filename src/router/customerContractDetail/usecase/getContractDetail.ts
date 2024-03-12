import { getContractDetailService } from "../service";

export const getContractDetail = (id: string) => {
    const token = localStorage.getItem("Token");
    return getContractDetailService(id, token as string);
};
