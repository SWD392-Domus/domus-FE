import { deletePackageService } from "../service";

export const deletePackage = async (id: string) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await deletePackageService(id, token);
  return response.status;
};
