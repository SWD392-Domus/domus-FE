import { getStorageService } from "../service";
import { getRecentImportService } from "../service/getStorageService";

 export const getStorage = (pageSize: number, pageIndex: number, SearchField: string,
    SearchValue: string,SortField:string ,Descending: boolean) => {
    const token = "Bearer " + localStorage.getItem("Token") as string;
    return getStorageService(pageSize, pageIndex,SearchField,SearchValue,SortField,Descending,token);
}

export const getRecentImport = () => {
    const token = "Bearer " + localStorage.getItem("Token") as string;
    return getRecentImportService(7, 1, true,"createdAt",token);
}