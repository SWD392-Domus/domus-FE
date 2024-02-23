import { productStaffApi } from "@/utils/api/ProductApi";
import { ProductPropsForCreate } from "../type";

export const createProductService = async (product: ProductPropsForCreate, token: string) => {
    return productStaffApi.createProduct(product, token);
}
