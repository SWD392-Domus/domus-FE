import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const sortQuotationsService = async (
  pageSize: number,
  pageIndex: number,
  sortField: string,
  sortKeyword: boolean,
  token: string
) => {
  return quotationStaffApi.sortQuotations(
    pageSize,
    pageIndex,
    sortField,
    sortKeyword,
    token
  );
};
