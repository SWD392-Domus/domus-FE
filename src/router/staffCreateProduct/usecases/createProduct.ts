import { createProductService } from "../services";
import { ProductPropsForCreate } from "../type";

export const createProducts = async (product: ProductPropsForCreate) => {
    const token = 'Bearer '+ localStorage.getItem("Token") as string;
    const response = await createProductService(product, token);
    if(response.status === 200){
        return response.data;
    }else{
        return {
            status:400,
            data:[]
        }
    }
}