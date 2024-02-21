import { editProductService } from "../service";

export const editProduct = async (id: string, product) => {
    const token = ("Bearer " + localStorage.getItem("Token")) as string;
    const res = await editProductService(id, product, token);
    if(res.status === 200){
        return res.data;
    }else{
        return {
            status:400,
            data:[]
        }
    }
};