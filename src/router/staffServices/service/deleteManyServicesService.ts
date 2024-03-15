import { serviceStaffApi } from "@/utils/api/ServiceApi";

export const deleteManyServicesService = async (
  ids: string[],
  token: string
) => {
  return serviceStaffApi.deleteManyServices(ids, token);
};
