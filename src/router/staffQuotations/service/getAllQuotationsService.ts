import { quotationStaffApi } from "@/utils/api/QuotationCaller";

export const getAllQuotationsService = async () => {
  return quotationStaffApi.getAllQuotations();
};
