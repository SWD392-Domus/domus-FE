import { getPackageByIdService } from "../service";
// import { PackageProps } from "../types";
export const getPackageById = async (id: string) => {
  const response = await getPackageByIdService(id);

  if (response.status === 200) {
    const resData = response.data.data;
    return resData;
  }
};
