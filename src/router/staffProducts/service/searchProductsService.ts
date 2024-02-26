import { productStaffApi } from "@/utils/api/ProductApi";

export const searchProductsService = async (
  pageSize: number,
  pageIndex: number,
  searchField: string,
  searchKeyword: string,
  token: string
) => {
  return productStaffApi.searchProducts(
    pageSize,
    pageIndex,
    searchField,
    searchKeyword,
    token
  );
};
