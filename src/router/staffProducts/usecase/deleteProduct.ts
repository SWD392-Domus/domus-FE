import { deleteProductService } from "../service";

export const deleteProduct = async (id: string) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await deleteProductService(id, token);
  return response.status;
};
