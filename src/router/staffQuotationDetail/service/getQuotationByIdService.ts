import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const getQuotationByIdService = async (id: string) => {
  return quotationStaffApi.getQuotationById(id);
};
