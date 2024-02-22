import { productDetailsApi } from "@/utils/api/ProductDetails";

export const deleteProductDetailsService = async (id: string, token: string) => {
    return productDetailsApi.deleteProductDetails(id, token);
}