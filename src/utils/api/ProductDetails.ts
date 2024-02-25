import { get, post, remove } from "./ApiCaller";
const tokenS = localStorage.getItem("Token") as string;

const token = "Bearer " + tokenS;
export const productDetailsApi = {
  deleteProductDetails: (id: string, token: string) => {
    return remove(`/ProductDetails/${id}`, {}, {}, { Authorization: token });
  },
  addPhoto: (id: string, photo: FormData, token: string) => {
    return post(
      `/ProductDetails/${id}/images`,
      photo,
      {},
      { Authorization: token }
    );
  },
  getProductDetailById: (id: string) => {
    return get(
      `/ProductDetails/${id}`,
      {},
      {
        Authorization: token,
      }
    );
  },
};
