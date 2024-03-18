import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const editStatusQuotationService = (id: string, data: any) => {
    const token = localStorage.getItem("Token");
    return quotationStaffApi.editQuotationStatus(id, data, token as string);
};
