import { packageStaffApi } from "@/utils/api/PackageApi";

export const deletePackageService = async (id: string) => {
  return packageStaffApi.deletePackage(id);
};
