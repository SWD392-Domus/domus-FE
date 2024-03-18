import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const getAllQuotationsService = async (token: string) => {
  return quotationStaffApi.getAllQuotations(token);
};
