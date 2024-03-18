import { contractApi } from "@/utils/api/contractApi";

export const createContractService = (data: any, token: string) => {
    return contractApi.createContract(data, token);
};
