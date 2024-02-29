import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/Dialog";
import { Button } from '@/components/ui/Button/Button';
import { useDispatch, useSelector } from "react-redux";
import { actions as actionsCart } from "@/router/customerCart/slice"
import { useNavigate } from "react-router-dom";

interface Props {
    productIdQuan: any
    // services: any
    // id: string
}

export const AddButton: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleAdd() {
        const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") as string) : { productDetails: [] };

        const cartArray = cart.productDetails ? cart.productDetails : [];

        const productExists = cartArray.some((cartObject: any) => {
            if (cartObject.id == props.productIdQuan.id) {
                cartObject.quantity += 1;
                return true;
            }
            return false;
        });


        if (!productExists) {
            cartArray.push({ id: props.productIdQuan.id, price: props.productIdQuan.displayPrice * 1000, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        const cartNumber: any = JSON.parse(localStorage.getItem("cart") as string).productDetails ? JSON.parse(localStorage.getItem("cart") as string).productDetails.length : 0;
        dispatch(actionsCart.setCartNumber(cartNumber));
        window.location.reload();
    }

    return (
        <Dialog>
            <DialogTrigger><Button className="bg-orange-400 hover:bg-black p-2 rounded-lg">Add</Button></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add?</DialogTitle>
                    <DialogDescription>
                        Add this product to your cart?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button className="bg-red-800" onClick={handleAdd}>Confirm</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}