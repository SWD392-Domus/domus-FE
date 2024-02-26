import { productDetailsApi } from "@/utils/api/ProductDetails";

export const getProductDetailByIdService = async (id: string) => {
  return productDetailsApi.getProductDetailById(id);
};
