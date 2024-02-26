import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const createQuotationService = async (data: any) => {
  return quotationStaffApi.createQuotation(data);
};
