import { packageStaffApi } from "@/utils/api/PackageApi";

export const updatePackageService = async (
  id: string,
  formData: any,
  token: string
) => {
  return packageStaffApi.updatePackage(id, formData, token);
};
