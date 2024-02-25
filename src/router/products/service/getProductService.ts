import { productApi } from "@/utils/api/ProductApi";

export const getProductService = async (pageSize: number, pageIndex: number) => {
    return productApi.getAllProducts(pageSize, pageIndex);
}

export const getProductSearchService = async (pageSize: number, pageIndex: number, searchValue: string, searchField: string) => {
    return productApi.searchProduct(pageSize, pageIndex, searchValue, searchField);
}