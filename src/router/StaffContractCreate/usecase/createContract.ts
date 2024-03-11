import { createContractService } from "../service";

export const createContract = (data: any) => {
    const token = localStorage.getItem("Token");
    return createContractService(data, token as string);
};
