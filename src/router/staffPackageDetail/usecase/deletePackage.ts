import { deletePackageService } from "../service";

export const deletePackage = async (id: string) => {
  const response = await deletePackageService(id);
  return response.status;
};
