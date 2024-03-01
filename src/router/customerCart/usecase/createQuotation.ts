import { createQuotationService } from "../service";
export const createQuotation = async (data: any) => {
    const token = ("Bearer " + localStorage.getItem("Token")) as string;
    const response = await createQuotationService(data, token);

    return response.status;
};
