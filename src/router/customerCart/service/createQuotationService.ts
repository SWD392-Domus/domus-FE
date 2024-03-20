import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const createQuotationService = async (data: any, token: string) => {
  return quotationStaffApi.createQuotationCustomer(data, token);
};
