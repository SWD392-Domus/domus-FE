import { getProductDetailsService } from "../service/getProductDetailsService";

export const getProductDetailsHuy = async (id: string) => {
  const response = await getProductDetailsService(id);

  if (response.status === 200) {
    return response.data.data;
  }
};
