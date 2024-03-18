import { productStaffApi } from "@/utils/api/ProductApi";

export const getStorageService = (pageSize: number, pageIndex: number, SearchField: string,SearchValue: string,SortField: string, descending: boolean,token: string) => {
    return productStaffApi.getAllImportProducts(pageSize, pageIndex,SearchField,SearchValue,SortField,descending,token);
};

export const getRecentImportService = (pageSize: number, pageIndex: number, descending: boolean,SortField: string,token: string) => {
    return productStaffApi.getRecentImportProducts(pageSize, pageIndex,descending,SortField,token);

}
// export const getStorageImportService = (
//     pageSize: number, 
//     pageIndex: number,
//     searchField: string,
//     searchValue: string, 
//     sortField: string,
//     descending: boolean,
//     token: string
//     ) => {
//         return productStaffApi.getAllImportProducts(pageSize, pageIndex,searchField, search,token);
//     };