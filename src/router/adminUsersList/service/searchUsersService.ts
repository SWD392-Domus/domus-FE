import { userAdminApi } from "@/utils/api/userApi";

export const searchUsersService = async (
  pageSize: number,
  pageIndex: number,
  searchField: string,
  searchKeyword: string,
  token: string
) => {
  return userAdminApi.searchUsers(
    pageSize,
    pageIndex,
    searchField,
    searchKeyword,
    token
  );
};
