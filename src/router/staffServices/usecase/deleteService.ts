import { deleteServiceService } from "../service";

export const deleteService = async (id: string) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await deleteServiceService(id, token);
  return response.status;
};
