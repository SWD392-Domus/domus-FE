import { packageStaffApi } from "@/utils/api/PackageApi";

export const getPackageByIdService = async (id: number) => {
  return packageStaffApi.getPackageById(id);
};
