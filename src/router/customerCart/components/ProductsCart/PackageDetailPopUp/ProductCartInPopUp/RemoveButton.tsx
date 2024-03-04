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
    productIdQuans: any
    // services: any
    // id: string
}

export const RemoveButton: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleRemove() {
        const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") as string) : { productDetails: [] };

        const cartArray = cart.productDetails ? cart.productDetails : [];

        props.productIdQuans.forEach((productIdQuan: any) => {
            const productExists = cartArray.some((cartObject: any) => {
                if (cartObject.id == productIdQuan.id) {
                    cartObject.quantity += 1;
                    return true;
                }
                return false;
            });


            if (!productExists) {
                cartArray.push({ id: productIdQuan.id, price: productIdQuan.displayPrice, quantity: 1 });
            }
        });
        localStorage.setItem("cart", JSON.stringify(cart));

        dispatch(actionsCart.removePackage());
        const cartNumber: any = JSON.parse(localStorage.getItem("cart") as string).productDetails ? JSON.parse(localStorage.getItem("cart") as string).productDetails.length : 0;
        dispatch(actionsCart.setCartNumber(cartNumber));
        window.location.reload();
    }

    return (
        <Dialog>
            <DialogTrigger><Button className="bg-neutral-400 hover:bg-black p-2 rounded-lg">Remove</Button></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>LOSE DISCOUNT?</DialogTitle>
                    <DialogDescription>
                        Remove will make you LOSE THE DISCOUNT! Transfer all products and services to normal cart with 0% discount.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button className="bg-red-800" onClick={handleRemove}>Confirm</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}