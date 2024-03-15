import { deleteUserService } from "../service";

export const deleteUser = async (id: string) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await deleteUserService(id, token);
  return response.status;
};
