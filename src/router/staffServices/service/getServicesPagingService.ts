import { serviceStaffApi } from "@/utils/api/ServiceApi";

export const getServicesPagingService = async (
  searchField: string,
  searchValue: string,
  sortField: string,
  descending: boolean,
  pageSize: number,
  pageIndex: number,
  token: string
) => {
  return serviceStaffApi.getServicesPaging(
    searchField,
    searchValue,
    sortField,
    descending,
    pageSize,
    pageIndex,
    token
  );
};
