import { contractApi } from "@/utils/api/contractApi";

export const signContractService = (id: string, data: any, token: string) => {
    return contractApi.signContract(id, data, token);
};
