import { productStaffApi } from "@/utils/api/ProductApi";

export const deleteProductService = async (id: string) => {
  return productStaffApi.deleteProduct(id);
};
