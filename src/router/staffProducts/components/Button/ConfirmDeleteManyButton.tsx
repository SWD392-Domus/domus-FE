import { deleteManyProducts } from "../../usecase/deleteManyProducts"
import { Button } from "@/components/ui/Button/Button"
import { ToastAction } from "@/components/ui/Toast/toast"
import { useToast } from "@/components/ui/Toast/use-toast"

interface Props {
    ids: string[]
}

export const ConfirmDeleteManyButton: React.FC<Props> = (props) => {
    const { toast } = useToast()
    return (
        <Button onClick={() => deleteManyProducts(props.ids)
            .then(res => {
                if (res === 200) {
                    window.location.reload();
                    toast({
                        variant: "success",
                        title: "Delete Successfully.",
                        description: "Multiple products were deleted.",
                        action: <ToastAction altText="Close">Close</ToastAction>,
                    })
                }
            })
            .catch(() =>
                toast({
                    variant: "destructive",
                    title: "Fail to Delete.",
                    description: "There was a problem with your request.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            )
        } className="bg-red-600" >Delete</Button>
    )
}