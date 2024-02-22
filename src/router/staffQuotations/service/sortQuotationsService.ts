import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const sortQuotationsService = async (
  pageSize: number,
  pageIndex: number,
  sortField: string,
  sortKeyword: boolean
) => {
  return quotationStaffApi.sortQuotations(
    pageSize,
    pageIndex,
    sortField,
    sortKeyword
  );
};
