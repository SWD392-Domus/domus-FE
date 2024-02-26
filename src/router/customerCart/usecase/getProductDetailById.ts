import { getProductDetailByIdService } from "../service";

export const getProductDetailById = async (id: string) => {
  const response = await getProductDetailByIdService(id);
  if (response.status === 200) {
    const resData = response.data.data;
    return resData;
  }
};
