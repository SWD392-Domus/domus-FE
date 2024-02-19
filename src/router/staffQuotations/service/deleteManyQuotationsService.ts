import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const deleteManyQuotationsService = async (ids: string[]) => {
  return quotationStaffApi.deleteManyQuotations(ids);
};
