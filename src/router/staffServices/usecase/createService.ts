import { CreateServiceService } from "../service";

export const createService= (data: any)=> {
    const token = "Bearer "+ localStorage.getItem("Token");
    return CreateServiceService(data,token);
}