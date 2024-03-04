// import { deletePackage } from "../../../usecase"
import { toastError } from "@/components/Toast";
import { Button } from "@/components/ui/Button/Button";
import { ToastAction } from "@/components/ui/Toast/toast";
import { useToast } from "@/components/ui/Toast/use-toast";
import { createQuotation } from "@/router/customerCart/usecase/createQuotation.ts";
import { useNavigate } from "react-router-dom";
import selector from "@/router/packageDetails/slice/selector";
import { useSelector } from "react-redux";

interface Props {
    id: string;
}

export const ConfirmButton: React.FC<Props> = (props) => {
    const packageA: any = useSelector(selector.packageA);

    const { toast } = useToast();
    const navigate = useNavigate();
    const handleClick = async () => {
        try {
            const res = await createQuotation({
                // expireAt: "2024-09-24T06:54:12.762Z",
                packageId: props.id,
                services: packageA.services.map((ser: any) => {
                    return {
                        serviceId: ser.id,
                        price: ser.price,
                    }
                }),
                productDetails: packageA.productDetails.map((productDetail: any) => {
                    return {
                        id: productDetail.id,
                        quantity: productDetail.quantity,
                        price: productDetail.displayPrice,
                    }
                })
            });
            if (res === 200) {
                toast({
                    variant: "success",
                    title: "Request Successfully.",
                    description: "A request was sent.",
                    action: <ToastAction altText="Close">Close</ToastAction>,
                });
                localStorage.removeItem("cart");
                setTimeout(() => {
                    navigate("/customer/settings/quotations");
                }, 2000);
            } else {
                toast({
                    variant: "destructive",
                    title: "Fail to Request.",
                    description: "There was a problem with your request.",
                    action: (
                        <ToastAction altText="Try again">Try again</ToastAction>
                    ),
                });
            }
        } catch (err) {
            navigate("/login");
            toastError("Please Login first");
        }
    };
    return (
        <Button onClick={handleClick} className="bg-red-800">
            Confirm
        </Button>
    );
};
