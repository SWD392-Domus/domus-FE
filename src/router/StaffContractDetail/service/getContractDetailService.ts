import { contractApi } from "@/utils/api/contractApi";

export const getContractDetailService = (id: string, token: string) => {
    return contractApi.getContractDetail(id, token);
};
