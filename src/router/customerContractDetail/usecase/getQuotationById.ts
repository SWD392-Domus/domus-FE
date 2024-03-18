import { getQuotationDetail } from "../service";

export const getQuotationById = (id: string) => {
    const token = localStorage.getItem("Token");
    return getQuotationDetail(id, token as string);
};
