import { getProductService } from "../service"

export const getProducts = async (pageSize: number, pageIndex: number) => {
    const response = await getProductService(pageSize, pageIndex);
    if(response.status === 200){
        return response.data;
    }else{
        return {
            status:400,
            data:[]
        }
    }
}