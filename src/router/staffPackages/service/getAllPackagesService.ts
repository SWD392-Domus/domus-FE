import { packageStaffApi } from "@/utils/api/PackageApi";

export const getAllPackagesService = async () => {
  return packageStaffApi.getAllPackages();
};
