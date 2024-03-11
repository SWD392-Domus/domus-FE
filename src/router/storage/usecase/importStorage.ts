import { importService } from "../service";

export const importStorage = (product: any) => {
    const token = 'Bearer ' + localStorage.getItem("Token");
    return importService(product, token);
}