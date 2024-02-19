import { productStaffApi } from "@/utils/api/ProductApi";

export const getProductsPagingService = async (
  searchField: string,
  searchValue: string,
  sortField: string,
  descending: boolean,
  pageSize: number,
  pageIndex: number
) => {
  return productStaffApi.getProductsPaging(
    searchField,
    searchValue,
    sortField,
    descending,
    pageSize,
    pageIndex
  );
};
