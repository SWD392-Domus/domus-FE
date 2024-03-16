import { productStaffApi } from "@/utils/api/ProductApi";

export const editProductService = async (id: string, product: any, token: string) => {
    return productStaffApi.updateProduct(id, product, token);
};