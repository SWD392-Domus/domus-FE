import { quotationStaffApi } from "@/utils/api/QuotationCaller";

export const getQuotationByIdService = async (id: number) => {
  return quotationStaffApi.getQuotationById(id);
};
