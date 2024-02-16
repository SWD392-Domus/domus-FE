import { ToastDestructive } from "../components/Toast";
import { deleteProductService } from "../service";

export const deleteProduct = async (id: string) => {
  const response = await deleteProductService(id);
  if (response.status === 200) {
    return ToastDestructive;
  } else {
    return ToastDestructive;
  }
};
