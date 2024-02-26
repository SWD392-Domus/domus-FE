import { productStaffApi } from "@/utils/api/ProductApi";

export const deleteManyProductsService = async (
  ids: string[],
  token: string
) => {
  return productStaffApi.deleteManyProducts(ids, token);
};
