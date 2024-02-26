import { getProductDetailByIdService } from "../service";

export const getProductDetailById = async (id: string) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await getProductDetailByIdService(id, token);
  if (response.status === 200) {
    const resData = response.data.data;
    return resData;
  }
};
