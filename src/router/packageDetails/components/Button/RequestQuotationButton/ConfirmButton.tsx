// import { deletePackage } from "../../../usecase"
import { Button } from "@/components/ui/Button/Button"
import { ToastAction } from "@/components/ui/Toast/toast"
import { useToast } from "@/components/ui/Toast/use-toast"
import { createQuotation } from '@/router/customerCart/usecase/createQuotation.ts';

interface Props {
    id: string
}

export const ConfirmButton: React.FC<Props> = (props) => {
    const { toast } = useToast()
    const handleClick = async () => {
        const res = await createQuotation(
            {
                expireAt: "2024-09-24T06:54:12.762Z",
                packageId: props.id,
            }
        );
        if (res === 200) {
            toast({
                variant: "success",
                title: "Request Successfully.",
                description: "A request was sent.",
                action: <ToastAction altText="Close">Close</ToastAction>,
            });
            localStorage.removeItem("cart");
            setTimeout(() => { window.location.reload(); }, 2000);
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
    }
    return (
        <Button
            onClick={handleClick}
            className="bg-red-800" >Confirm</Button>
    )
}