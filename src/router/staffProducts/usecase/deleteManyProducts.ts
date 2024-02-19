import { deleteManyProductsService } from "../service";

export const deleteManyProducts = async (ids: string[]) => {
  const response = await deleteManyProductsService(ids);
  return response.status;
};
