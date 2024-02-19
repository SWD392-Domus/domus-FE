import { deleteManyPackagesService } from "../service";

export const deleteManyPackages = async (ids: string[]) => {
  const response = await deleteManyPackagesService(ids);
  return response.status;
};
