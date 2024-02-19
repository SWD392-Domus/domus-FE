import { deleteManyQuotations } from "../../usecase/deleteManyQuotations"
import { Button } from "@/components/ui/Button/Button"
import { ToastAction } from "@/components/ui/Toast/toast"
import { useToast } from "@/components/ui/Toast/use-toast"

interface Props {
    ids: string[]
}

export const ConfirmDeleteManyButton: React.FC<Props> = (props) => {
    const { toast } = useToast()
    return (
        <Button onClick={() => deleteManyQuotations(props.ids)
            .then(res => {
                if (res === 200) {
                    toast({
                        variant: "success",
                        title: "Delete Successfully.",
                        description: "Multiple quotations were deleted.",
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