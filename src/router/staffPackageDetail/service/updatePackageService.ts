import { packageStaffApi } from "@/utils/api/PackageApi";

export const updatePackageService = async (
  id: string,
  serviceIds: string[],
  productDetailIds: string[],
  name: string,
  discount: number,
  images: string[]
) => {
  return packageStaffApi.updatePackage(
    id,
    serviceIds,
    productDetailIds,
    name,
    discount,
    images
  );
};
