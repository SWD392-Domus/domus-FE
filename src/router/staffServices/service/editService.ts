import { serviceStaffApi } from "@/utils/api/ServiceApi";

export const editServiceService = async (id: string ,data: any) => {
    const token = "Bearer "+ localStorage.getItem("Token");
    return serviceStaffApi.editService(id,data, token);
}