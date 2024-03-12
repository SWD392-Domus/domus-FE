import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const getQuotationDetail = async (
    id: string,
    versionId: string,
    token: string
) => {
    const res = await quotationStaffApi.getQuotationDetailByVersion(
        id,
        versionId,
        token
    );
    return res;
};
