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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1eXN0YWZmQGRvbXVzLmNvbSIsInN1YiI6ImM3MTNhYWNjLTM1ODItNDU5OC04NjcwLTIyNTkwZDgzNzE3OSIsIm5hbWUiOiJkdXlzdGFmZkBkb211cy5jb20iLCJyb2xlIjpbIkNsaWVudCIsIlN0YWZmIl0sIm5iZiI6MTcwODA5MjkzMywiZXhwIjoxNzA4MDkzODMzLCJpYXQiOjE3MDgwOTI5MzMsImlzcyI6Imh0dHA6Ly8yMy4xMDIuMjI2LjExODo0NDMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAifQ.D24cWP-t3rShRz2IpEp8BVDQDAPC2VO0A5Obj8kwlFM";
export const productStaffApi = {
  getProductsPaging: (pageSize: number, pageIndex: number) => {
    return get(`/Products?PageSize=${pageSize}&PageIndex=${pageIndex}`);
  },

  getProductById: (id: number) => {
    return get(`/Products/${id}`);
  },

  getAllProducts: () => {
    return get(`/Products`);
  },

  deleteProduct: (id: string) => {
    return remove(`/Products/${id}`, {}, {}, { Authorization: token });
  },
};
