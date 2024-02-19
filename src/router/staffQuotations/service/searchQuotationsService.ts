import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const searchQuotationsService = async (
  pageSize: number,
  pageIndex: number,
  searchField: string,
  searchKeyword: string
) => {
  return quotationStaffApi.searchQuotations(
    pageSize,
    pageIndex,
    searchField,
    searchKeyword
  );
};
