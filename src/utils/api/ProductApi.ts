import { get, remove } from "./ApiCaller";

export const productApi = {
  getAllProducts: (pageSize: number, pageIndex: number) => {
    return get(`/Products?PageSize=${pageSize}&PageIndex=${pageIndex}`);
  },
  getOneProduct: (id: string) => {
    return get(`/Products/${id}`);
  },
};

export const productStaffApi = {
  getProductsPaging: (pageSize: number, pageIndex: number) => {
    return get(`/Products?PageSize=${pageSize}&PageIndex=${pageIndex}`);
  },

  getProductById: (id: number) => {
    return get(`/Products?id=${id}`);
  },

  getAllProducts: () => {
    return get(`/Products`);
  },

  deleteProduct: (id: number) => {
    return remove(`/Products?id=${id}`);
  },
};
