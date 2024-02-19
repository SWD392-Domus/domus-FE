import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const deleteQuotationService = async (id: string) => {
  return quotationStaffApi.deleteQuotation(id);
};
