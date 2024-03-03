import { Button } from "@/components/ui/Button/Button"
import { ToastAction } from "@/components/ui/Toast/toast"
import { useToast } from "@/components/ui/Toast/use-toast"

export function ToastDestructive() {
    const { toast } = useToast()

    return (
        <Button
            variant="outline"
            onClick={() => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            }}
        >
            Show Toast
        </Button>
    )
}
