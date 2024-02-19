import { packageStaffApi } from "@/utils/api/PackageApi";

export const getPackagesPagingService = async (
  searchField: string,
  searchValue: string,
  sortField: string,
  descending: boolean,
  pageSize: number,
  pageIndex: number
) => {
  return packageStaffApi.getPackagesPaging(
    searchField,
    searchValue,
    sortField,
    descending,
    pageSize,
    pageIndex
  );
};
