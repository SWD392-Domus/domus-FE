import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const getQuotationDetail = (id: string, token: string) => {
    return quotationStaffApi.getQuotationById(id, token);
};
