import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const editQuotationService = (token: string, data: any) => {
  return quotationStaffApi.createQuotationStaff(data, token);
};
