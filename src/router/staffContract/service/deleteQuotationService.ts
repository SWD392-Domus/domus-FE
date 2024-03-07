import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const deleteQuotationService = async (id: string, token: string) => {
  return quotationStaffApi.deleteQuotation(id, token);
};
