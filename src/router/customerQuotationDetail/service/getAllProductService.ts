import { productApi } from "@/utils/api/ProductApi";

export const getAllProductService = async () => {
    return productApi.getAllInOneProduct();
};
