import { productStaffApi } from "@/utils/api/ProductApi";

export const deleteProductService = async (id: string, token: string) => {
  return productStaffApi.deleteProduct(id, token);
};
