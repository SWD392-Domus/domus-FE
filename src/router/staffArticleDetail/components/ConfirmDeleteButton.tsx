import { deleteArticle } from "../usecase";
import { Button } from "@/components/ui/Button/Button";
import { ToastAction } from "@/components/ui/Toast/toast";
import { useToast } from "@/components/ui/Toast/use-toast";

interface Props {
    id: string;
}

export const ConfirmDeleteButton: React.FC<Props> = (props) => {
    const { toast } = useToast();
    return (
        <Button
            onClick={() =>
                deleteArticle(props.id)
                    .then((res) => {
                        if (res === 200) {
                            toast({
                                variant: "success",
                                title: "Delete Successfully.",
                                description: "A article was deleted.",
                                action: (
                                    <ToastAction altText="Close">
                                        Close
                                    </ToastAction>
                                ),
                            });
                        }
                    })
                    .catch(() =>
                        toast({
                            variant: "destructive",
                            title: "Fail to Delete.",
                            description:
                                "There was a problem with your request.",
                            action: (
                                <ToastAction altText="Try again">
                                    Try again
                                </ToastAction>
                            ),
                        })
                    )
            }
            className="bg-red-800"
        >
            Delete
        </Button>
    );
};
