import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const pushNegotitaionService = (
    id: string,
    token: string,
    data: any
) => {
    return quotationStaffApi.postNegotiative(id, token, data);
};
