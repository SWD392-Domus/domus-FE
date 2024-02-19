import { packageStaffApi } from "@/utils/api/PackageApi";

export const searchPackagesService = async (
  pageSize: number,
  pageIndex: number,
  searchField: string,
  searchKeyword: string
) => {
  return packageStaffApi.searchPackages(
    pageSize,
    pageIndex,
    searchField,
    searchKeyword
  );
};
