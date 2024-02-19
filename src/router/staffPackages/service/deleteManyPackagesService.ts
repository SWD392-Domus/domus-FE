import { packageStaffApi } from "@/utils/api/PackageApi";

export const deleteManyPackagesService = async (ids: string[]) => {
  return packageStaffApi.deleteManyPackages(ids);
};
