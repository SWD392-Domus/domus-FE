import { createUserService } from "../services";


export const CreateUserByAdmin = (data: any)=>{
    const token = "Bearer "+ localStorage.getItem("Token");
    console.log(token)
    return createUserService(data,token);
}