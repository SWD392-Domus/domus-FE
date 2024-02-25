import { productDetailsApi } from "@/utils/api/ProductDetails";

export const addPhoto = async (id: string, photo: FormData) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await productDetailsApi.addPhoto(id, photo, token);
  if (response.status === 200) {
    return response.data;
  } else {
    return {
      status: 400,
      data: [],
    };
  }
};
