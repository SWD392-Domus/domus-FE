import { packageApi } from "@/utils/api/PackageApi";

export const getPackageService = async (
  pageSize: number,
  pageIndex: number
) => {
  return packageApi.getAllPackages(pageSize, pageIndex);
};

export const getPackageSearchService = async (
  pageSize: number,
  pageIndex: number,
  searchValue: string,
  searchField: string
) => {
  return packageApi.searchPackage(
    pageSize,
    pageIndex,
    searchValue,
    searchField
  );
};
