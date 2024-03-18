import { UpdateUserServices } from "../services";

export const UpdateUserById = ( id: string,data: any) => {
    const token = "Bearer " + localStorage.getItem("Token");
    return UpdateUserServices(id, data, token);
}