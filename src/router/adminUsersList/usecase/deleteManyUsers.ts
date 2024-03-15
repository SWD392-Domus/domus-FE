import { deleteManyUsersService } from "../service";

export const deleteManyUsers = async (ids: string[]) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await deleteManyUsersService(ids, token);
  return response.status;
};
