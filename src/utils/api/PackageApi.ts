import { get, remove } from "./ApiCaller";

const token =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1eXN0YWZmQGRvbXVzLmNvbSIsInN1YiI6ImM3MTNhYWNjLTM1ODItNDU5OC04NjcwLTIyNTkwZDgzNzE3OSIsIm5hbWUiOiJkdXlzdGFmZkBkb211cy5jb20iLCJyb2xlIjpbIkNsaWVudCIsIlN0YWZmIl0sIm5iZiI6MTcwODEwNDkxNywiZXhwIjoxNzA4MTA1ODE3LCJpYXQiOjE3MDgxMDQ5MTcsImlzcyI6Imh0dHA6Ly8yMy4xMDIuMjI2LjExODo0NDMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAifQ.OT8yawPTxntx1rtmUzujet_2yHChS2a6Y8oFkBKQaMM";
export const packageStaffApi = {
  deletePackage: (id: string) => {
    return remove(`/Products/${id}`, {}, {}, { Authorization: token });
  },
  getPackagesPaging: (pageSize: number, pageIndex: number) => {
    return get(`/Products?PageSize=${pageSize}&PageIndex=${pageIndex}`);
  },

  getPackageById: (id: number) => {
    return get(`/Products/${id}`);
  },

  getAllPackages: () => {
    return get(`/Products`);
  },
};
