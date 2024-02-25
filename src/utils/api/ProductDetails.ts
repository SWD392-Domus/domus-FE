import { post, remove } from "./ApiCaller";

export const productDetailsApi = {
    deleteProductDetails: (id: string, token: string) => {
        return remove(`/ProductDetails/${id}`, {}, {}, { Authorization: token });
    },
    addPhoto: (id: string, photo: FormData, token: string) => {
        return post(`/ProductDetails/${id}/images`, photo, {}, { Authorization: token });
    }, 
}