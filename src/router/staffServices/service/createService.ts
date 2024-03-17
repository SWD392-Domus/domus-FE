import { serviceStaffApi } from "@/utils/api/ServiceApi";

export const CreateServiceService = (data: any, token: string) => {
    return serviceStaffApi.creaetService(data, token);
}