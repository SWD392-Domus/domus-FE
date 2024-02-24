import { serviceStaffApi } from "@/utils/api/ServiceApi";

export const getAllServicesService = async () => {
  return serviceStaffApi.getAllServices();
};
