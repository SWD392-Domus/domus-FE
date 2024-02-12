import { getProductsPagingService } from "../service";

export const getProductsPaging = async (
  pageSize: number,
  pageIndex: number
) => {
  const response = await getProductsPagingService(pageSize, pageIndex);
  if (response.status === 200) {
    return response.data;
  } else {
    return {
      status: 400,
      data: [],
    };
  }
};
