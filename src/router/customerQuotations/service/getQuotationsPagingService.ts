import { quotationCustomerApi } from "@/utils/api/QuotationApi";

export const getQuotationsPagingService = async (
  searchField: string,
  searchValue: string,
  sortField: string,
  descending: boolean,
  pageSize: number,
  pageIndex: number,
  token: string
) => {
  return quotationCustomerApi.getMyQuotationPaging(
    searchField,
    searchValue,
    sortField,
    descending,
    pageSize,
    pageIndex,
    token
  );
};
