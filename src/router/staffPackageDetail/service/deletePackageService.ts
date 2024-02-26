import { packageStaffApi } from "@/utils/api/PackageApi";

export const deletePackageService = async (id: string, token: string) => {
  return packageStaffApi.deletePackage(id, token);
};
