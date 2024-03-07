import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const getQuotationRevisions = (id: string, token: string) => {
    return quotationStaffApi.getQuotationVersions(id, token);
};
