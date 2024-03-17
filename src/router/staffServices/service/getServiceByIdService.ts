import { serviceStaffApi } from "@/utils/api/ServiceApi";

export const getServiceByIdService = async (id: string) => {
  return serviceStaffApi.getServiceById(id);
};
