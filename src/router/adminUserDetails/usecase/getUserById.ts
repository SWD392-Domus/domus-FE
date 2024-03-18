import { getUserByIdService } from "../services";

export const getUserById = (id:string)=>{
    const token = 'Bearer '+ localStorage.getItem('Token');
    return getUserByIdService(id, token);
}