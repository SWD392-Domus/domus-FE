import { getProductDetailsService } from "../service/getProductDetailsService";

export const getProductDetails = async (id: string) => {
  const response = await getProductDetailsService(id);
  if (response.status === 200) {
    return response.data.data;
  } else {
    return {
      status: 400,
      data: [],
    };
  }
};
