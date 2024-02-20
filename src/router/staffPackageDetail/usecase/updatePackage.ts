import { updatePackageService } from "../service";
// import { PackageProps } from "../types";
export const updatePackage = async (
  id: string,
  serviceIds: string[],
  productDetailIds: string[],
  name: string,
  discount: number,
  images: string[]
) => {
  const response = await updatePackageService(
    id,
    serviceIds,
    productDetailIds,
    name,
    discount,
    images
  );

  return response.status;
};
