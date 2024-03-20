import { getQuotationByIdService } from "../service";
export const getQuotationById = async (id: string) => {
    const token = localStorage.getItem("Token") as string;
    const response = await getQuotationByIdService(id, token);
    if (response.status === 200) {
        return response.data.data;
    }
};
