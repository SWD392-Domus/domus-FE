import { get, remove } from "./ApiCaller";

export const productApi = {
  getAllProducts: (pageSize: number, pageIndex: number) => {
    return get(`/Products?PageSize=${pageSize}&PageIndex=${pageIndex}`);
  },
  getOneProduct: (id: string) => {
    return get(`/Products/${id}`);
  },
};
const token =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1eXN0YWZmQGRvbXVzLmNvbSIsInN1YiI6ImM3MTNhYWNjLTM1ODItNDU5OC04NjcwLTIyNTkwZDgzNzE3OSIsIm5hbWUiOiJkdXlzdGFmZkBkb211cy5jb20iLCJyb2xlIjpbIkNsaWVudCIsIlN0YWZmIl0sIm5iZiI6MTcwODE4NzgzMCwiZXhwIjoxNzA4MTg4NzMwLCJpYXQiOjE3MDgxODc4MzAsImlzcyI6Imh0dHA6Ly8yMy4xMDIuMjI2LjExODo0NDMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAifQ.b2S6g3aNMzhI6bma0nl_8Rnk2DgJomRZXrlgFNC5pKs";
export const productStaffApi = {
  deleteProduct: (id: string) => {
    return remove(`/Products/${id}`, {}, {}, { Authorization: token });
  },
  deleteManyProducts: (ids: string[]) => {
    return remove(`/Products/multiple`, ids, {}, { Authorization: token });
  },
  getProductsPaging: (pageSize: number, pageIndex: number) => {
    return get(`/Products?PageSize=${pageSize}&PageIndex=${pageIndex}`);
  },
  getProductById: (id: number) => {
    return get(`/Products/${id}`);
  },
  getAllProducts: () => {
    return get(`/Products`);
  },
};
