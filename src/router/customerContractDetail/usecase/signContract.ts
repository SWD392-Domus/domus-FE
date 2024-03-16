import { signContractService } from "../service";

export const signContract = (id: string, data: any) => {
    const token = `Bearer ${localStorage.getItem("Token")}`;
    return signContractService(id, data, token as string);
};
