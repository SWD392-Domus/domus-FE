import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const searchQuotationsService = async (
  pageSize: number,
  pageIndex: number,
  searchField: string,
  searchKeyword: string,
  token: string
) => {
  return quotationStaffApi.searchQuotations(
    pageSize,
    pageIndex,
    searchField,
    searchKeyword,
    token
  );
};
