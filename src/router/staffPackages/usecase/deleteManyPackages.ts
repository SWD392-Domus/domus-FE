import { deleteManyPackagesService } from "../service";

export const deleteManyPackages = async (ids: string[]) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await deleteManyPackagesService(ids, token);
  return response.status;
};
