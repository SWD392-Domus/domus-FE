import { userAdminApi } from "@/utils/api/userApi";

export const getUsersPagingService = async (
  searchField: string,
  searchValue: string,
  sortField: string,
  descending: boolean,
  pageSize: number,
  pageIndex: number,
  token: string
) => {
  return userAdminApi.getUsersPaging(
    searchField,
    searchValue,
    sortField,
    descending,
    pageSize,
    pageIndex,
    token
  );
};
