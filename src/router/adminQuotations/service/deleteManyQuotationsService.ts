import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const deleteManyQuotationsService = async (
  ids: string[],
  token: string
) => {
  return quotationStaffApi.deleteManyQuotations(ids, token);
};
