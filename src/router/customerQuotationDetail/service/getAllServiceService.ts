import { serviceStaffApi } from "@/utils/api/ServiceApi";

export const getALlServiceService = () => {
    return serviceStaffApi.getAllServices();
};
