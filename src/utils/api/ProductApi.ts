import { get } from "./ApiCaller";

export const productApi = {
    getAllProducts: (pageSize: number, pageIndex: number )=> {
        return get(`/Products?PageSize=${pageSize}&PageIndex=${pageIndex}`);
    },
    getOneProduct: (id: string) => {
        return get(`/Products/${id}`);
    }
}

