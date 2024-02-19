import { getQuotationsPagingService } from "../service";

export const getQuotationsPaging = async (
  pageSize: number,
  pageIndex: number
) => {
  const response = await getQuotationsPagingService(pageSize, pageIndex);
  if (response.status === 200) {
    return response.data;
  } else {
    return {
      status: 400,
      data: [],
    };
  }
};
