import { serviceStaffApi } from "@/utils/api/ServiceApi";

export const searchServicesService = async (
  pageSize: number,
  pageIndex: number,
  searchField: string,
  searchKeyword: string,
  token: string
) => {
  return serviceStaffApi.searchServices(
    pageSize,
    pageIndex,
    searchField,
    searchKeyword,
    token
  );
};
