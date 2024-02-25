import { productDetailsApi } from "@/utils/api/ProductDetails";

export const addPhotoService = async (id: string, photo: FormData, token: string) => {
    return productDetailsApi.addPhoto(id, photo, token);
}