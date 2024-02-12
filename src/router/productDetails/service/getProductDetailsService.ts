import { productApi } from "@/utils/api/ProductApi";

export const getProductDetailsService = async (id: string) => {
    return productApi.getOneProduct(id);
}
