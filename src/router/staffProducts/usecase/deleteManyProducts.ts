import { deleteManyProductsService } from "../service";

export const deleteManyProducts = async (ids: string[]) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await deleteManyProductsService(ids, token);
  return response.status;
};
