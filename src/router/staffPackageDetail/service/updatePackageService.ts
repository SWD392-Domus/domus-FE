import { packageStaffApi } from "@/utils/api/PackageApi";

export const updatePackageService = async (id: string, formData: any) => {
  return packageStaffApi.updatePackage(id, formData);
};
