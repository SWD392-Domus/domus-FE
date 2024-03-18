import { deleteManyServicesService } from "../service";

export const deleteManyServices = async (ids: string[]) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await deleteManyServicesService(ids, token);
  return response.status;
};
