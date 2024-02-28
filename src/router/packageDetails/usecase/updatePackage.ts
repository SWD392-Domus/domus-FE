import { updatePackageService } from "../service";
// import { PackageProps } from "../types";
export const updatePackage = async (id: string, formData: any) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await updatePackageService(id, formData, token);

  return response.status;
};
