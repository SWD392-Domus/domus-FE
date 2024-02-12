import { productStaffApi } from "@/utils/api/ProductApi";

export const getAllProductsService = async () => {
  return productStaffApi.getAllProducts();
};
