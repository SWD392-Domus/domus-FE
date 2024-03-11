import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const getQuotationDetailByVersionService = async (
    quotationId: string,
    versionId: string,
    token: string
) => {
    const res = await quotationStaffApi.getQuotationDetailByVersion(
        quotationId,
        versionId,
        token
    );
    return res.data.data;
};
