import { packageStaffApi } from "@/utils/api/PackageApi";

export const sortPackagesService = async (
  pageSize: number,
  pageIndex: number,
  sortField: string,
  sortKeyword: boolean,
  token: string
) => {
  return packageStaffApi.sortPackages(
    pageSize,
    pageIndex,
    sortField,
    sortKeyword,
    token
  );
};
