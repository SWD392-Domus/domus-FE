import { productApi } from "@/utils/api/ProductApi";

export const getProductService = async (pageSize: number, pageIndex: number) => {
    return productApi.getAllProducts(pageSize, pageIndex);

}