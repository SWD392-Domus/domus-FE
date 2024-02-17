import { productStaffApi } from "@/utils/api/ProductApi";

export const sortProductsService = async (
  pageSize: number,
  pageIndex: number,
  sortField: string,
  sortKeyword: boolean
) => {
  return productStaffApi.sortProducts(
    pageSize,
    pageIndex,
    sortField,
    sortKeyword
  );
};
