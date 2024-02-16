import {
  get,
  // post, put, remove
} from "./ApiCaller";

const token =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1eXN0YWZmQGRvbXVzLmNvbSIsInN1YiI6ImM3MTNhYWNjLTM1ODItNDU5OC04NjcwLTIyNTkwZDgzNzE3OSIsIm5hbWUiOiJkdXlzdGFmZkBkb211cy5jb20iLCJyb2xlIjpbIkNsaWVudCIsIlN0YWZmIl0sIm5iZiI6MTcwODA5MjkzMywiZXhwIjoxNzA4MDkzODMzLCJpYXQiOjE3MDgwOTI5MzMsImlzcyI6Imh0dHA6Ly8yMy4xMDIuMjI2LjExODo0NDMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAifQ.D24cWP-t3rShRz2IpEp8BVDQDAPC2VO0A5Obj8kwlFM";

export const quotationStaffApi = {
  getQuotationsPaging: (pageSize: number, pageIndex: number) => {
    return get(
      `/Quotations?PageSize=${pageSize}&PageIndex=${pageIndex}`,
      {},
      {
        Authorization: token,
      }
    );
  },

  getQuotationById: (id: number) => {
    return get(`/Quotations/${id}`);
  },

  getAllQuotations: () => {
    return get(`/Quotations`);
  },
};

export const quotationCustomerApi = {
  getQuotationsPaging: (pageSize: number, pageIndex: number) => {
    return get(`/Quotations?PageSize=${pageSize}&PageIndex=${pageIndex}`);
  },

  getQuotationById: (id: number) => {
    return get(`/Quotations/${id}`);
  },

  getAllQuotations: () => {
    return get(`/Quotations`);
  },
};
