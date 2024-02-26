import { createPackageService } from "../service";
// import { PackageProps } from "../types";
export const createPackage = async (formData: any) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await createPackageService(formData, token);

  return response.status;
};
