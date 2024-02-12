import { productStaffApi } from "@/utils/api/ProductApi";

export const getProductsPagingService = async (
  pageSize: number,
  pageIndex: number
) => {
  return productStaffApi.getProductsPaging(pageSize, pageIndex);
};
