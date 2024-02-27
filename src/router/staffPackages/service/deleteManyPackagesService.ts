import { packageStaffApi } from "@/utils/api/PackageApi";

export const deleteManyPackagesService = async (
  ids: string[],
  token: string
) => {
  return packageStaffApi.deleteManyPackages(ids, token);
};
