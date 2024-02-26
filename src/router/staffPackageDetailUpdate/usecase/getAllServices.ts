import { getAllServicesService } from "../service";

export const getAllServices = async () => {
  const response = await getAllServicesService();
  if (response.status === 200) {
    const resData = response.data.data;
    return resData;
  }
};
