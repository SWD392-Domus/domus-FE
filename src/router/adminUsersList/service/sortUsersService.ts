import { userAdminApi } from "@/utils/api/userApi";

export const sortUsersService = async (
  pageSize: number,
  pageIndex: number,
  sortField: string,
  sortKeyword: boolean,
  token: string
) => {
  return userAdminApi.sortUsers(
    pageSize,
    pageIndex,
    sortField,
    sortKeyword,
    token
  );
};
