import { quotationStaffApi } from "@/utils/api/QuotationCaller";

export const getQuotationsPagingService = async (
  pageSize: number,
  pageIndex: number
) => {
  return quotationStaffApi.getQuotationsPaging(pageSize, pageIndex);
};
