import { serviceStaffApi } from "@/utils/api/ServiceApi";

export const sortServicesService = async (
  pageSize: number,
  pageIndex: number,
  sortField: string,
  sortKeyword: boolean,
  token: string
) => {
  return serviceStaffApi.sortServices(
    pageSize,
    pageIndex,
    sortField,
    sortKeyword,
    token
  );
};
