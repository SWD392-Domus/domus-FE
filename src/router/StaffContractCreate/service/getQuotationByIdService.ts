import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const getQuotationDetail = (
    id: string,
    versionId: string,
    token: string
) => {
    return quotationStaffApi.getQuotationDetailByVersion(id, versionId, token);
};
