import { packageStaffApi } from "@/utils/api/PackageApi";

export const getPackageByIdService = async (id: string) => {
  return packageStaffApi.getPackageById(id);
};
