import { updatePackageService } from "../service";
// import { PackageProps } from "../types";
export const updatePackage = async (id: string, formData: any) => {
  const response = await updatePackageService(id, formData);

  return response.status;
};
