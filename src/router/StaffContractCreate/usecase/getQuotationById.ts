import { getQuotationDetail } from "../service";

export const getQuotationById = (id: string, versionId: string) => {
    const token = localStorage.getItem("Token");
    return getQuotationDetail(id, versionId, token as string);
};
