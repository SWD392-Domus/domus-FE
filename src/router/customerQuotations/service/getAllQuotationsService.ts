import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const getAllQuotationsService = async () => {
  return quotationStaffApi.getAllQuotations();
};
