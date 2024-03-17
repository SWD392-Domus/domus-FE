// import { deletePackage } from "../../../usecase"
import { Button } from "@/components/ui/Button/Button"
// import { ToastAction } from "@/components/ui/Toast/toast"
// import { useToast } from "@/components/ui/Toast/use-toast"
// import { actions as actionsCart } from "@/router/customerCart/slice"
import { useSelector } from "react-redux";
import selector from "@/router/packageDetails/slice/selector";
import { useNavigate } from "react-router-dom"

interface Props {
    id: string
}

export const ConfirmButton: React.FC<Props> = () => {
    // const { toast } = useToast()
    const navigate = useNavigate()
    const id = useSelector(selector.id);
    const name = useSelector(selector.name);
    const estimatedPrice = useSelector(selector.estimatedPrice);
    const discount = useSelector(selector.discount);
    const productDetails: any = useSelector(selector.productDetails);
    const packageImages = useSelector(selector.packageImages);
    const handleAddToCart = async () => {
        const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") as string) : { productDetails: [] };
        console.log(cart);

        cart.package = {
            id: id,
            name: name,
            estimatedPrice: estimatedPrice,
            discount: discount,
            productDetails: productDetails,
            packageImages: packageImages
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        navigate("/customer/settings/cart");
    }

    return (
        <Button
            onClick={handleAddToCart}
            className="bg-red-800" >Confirm</Button>
    )
}