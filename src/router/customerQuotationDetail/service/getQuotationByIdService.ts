import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const getQuotationByIdService = async (id: string, token: string) => {
  return quotationStaffApi.getQuotationById(id, token);
};
