import { productDetailsApi } from "@/utils/api/ProductDetails";

export const getProductDetailByIdService = async (
  id: string,
  token: string
) => {
  return productDetailsApi.getProductDetailById(id, token);
};
