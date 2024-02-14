import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const getQuotationsPagingService = async (
  pageSize: number,
  pageIndex: number
) => {
  return quotationStaffApi.getQuotationsPaging(pageSize, pageIndex);
};
