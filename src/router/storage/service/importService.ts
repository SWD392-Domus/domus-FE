import { productStaffApi } from "@/utils/api/ProductApi";

export const importService = (product: any,token:string) => {
    return productStaffApi.importProducts(product,token);
}