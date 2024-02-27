import { packageStaffApi } from "@/utils/api/PackageApi";

export const createPackageService = async (formData: any, token: string) => {
  return packageStaffApi.createPackage(formData, token);
};
