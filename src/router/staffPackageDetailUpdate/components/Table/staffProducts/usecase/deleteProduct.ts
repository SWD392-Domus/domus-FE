import { deleteProductService } from "../service";

export const deleteProduct = async (id: string) => {
  const response = await deleteProductService(id);
  return response.status;
};
