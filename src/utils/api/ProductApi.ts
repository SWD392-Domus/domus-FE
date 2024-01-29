import { get, post, put, remove } from "./ApiCaller";

export const productApi = {
    getAllProducts: (pageSize: number, pageIndex: number )=> {
        return get(`/Products?PageSize=${pageSize}&PageIndex=${pageIndex}`);
    }
}
