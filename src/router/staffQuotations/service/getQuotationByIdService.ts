import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const getQuotationByIdService = async (id: number) => {
  return quotationStaffApi.getQuotationById(id);
};
