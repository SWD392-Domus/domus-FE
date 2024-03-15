import { serviceStaffApi } from "@/utils/api/ServiceApi";

export const deleteServiceService = async (id: string, token: string) => {
  return serviceStaffApi.deleteService(id, token);
};
