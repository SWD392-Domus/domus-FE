import { productStaffApi } from "@/utils/api/ProductApi";

export const getProductByIdService = async (id: number) => {
  return productStaffApi.getProductById(id);
};
