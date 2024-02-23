import { productDetailsApi } from "@/utils/api/ProductDetails";

export const deleteDetails = async (id: string) => {
    const token = ("Bearer " + localStorage.getItem("Token")) as string;

    const response = await productDetailsApi.deleteProductDetails(id, token);
    if(response.status === 200){
        return response.data;
    }else{
        return {
            status:400,
            data:[]
        }
    }
}