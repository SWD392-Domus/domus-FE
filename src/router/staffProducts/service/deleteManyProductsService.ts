import { productStaffApi } from "@/utils/api/ProductApi";

export const deleteManyProductsService = async (ids: string[]) => {
  return productStaffApi.deleteManyProducts(ids);
};
