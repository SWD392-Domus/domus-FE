import { getProductSearchService, getProductService } from "../service"

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

export const searchProducts = async (pageSize: number, pageIndex: number, searchValue: string, searchField: string) => {
    try {
        // Call the appropriate API function to perform the search
        const response = await getProductSearchService(pageSize, pageIndex, searchValue, searchField);
        if (response.status === 200) {
            return response.data;
        } else {
            return {
                status: 400,
                data: response.data
            }
        }
    } catch (error) {
        console.error(error);
        throw error; // Optionally, re-throw the error to handle it elsewhere
    }
}
