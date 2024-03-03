import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const editQuotationService = (id: string, token: string, data: any) => {
    return quotationStaffApi.editQuotation(id, token, data);
};
