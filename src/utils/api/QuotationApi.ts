import {
  get,
  // post, put, remove
} from "./ApiCaller";

export const quotationStaffApi = {
  getQuotationsPaging: (pageSize: number, pageIndex: number) => {
    return get(
      `/Quotations?PageSize=${pageSize}&PageIndex=${pageIndex}`,
      {},
      {
        Authorization: "Bearer ",
      }
    );
  },

  getQuotationById: (id: number) => {
    return get(`/Quotations?id=${id}`);
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
    return get(`/Quotations?id=${id}`);
  },

  getAllQuotations: () => {
    return get(`/Quotations`);
  },
};
