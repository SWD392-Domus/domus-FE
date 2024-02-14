import { productStaffApi } from "@/utils/api/ProductApi";

export const deleteProductService = async (id: number) => {
  return productStaffApi.deleteProduct(id);
};
