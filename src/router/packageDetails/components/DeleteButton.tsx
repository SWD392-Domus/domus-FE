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
import { ConfirmDeleteButton } from "./ConfirmDeleteButton";
import { Button } from '@/components/ui/Button/Button';

interface Props {
    id: string
}

export const DeleteButton: React.FC<Props> = (props) => {
    return (
        <Dialog>
            <DialogTrigger><Button className="cursor-pointer w-40">Request Quotation</Button></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Request?</DialogTitle>
                    <DialogDescription>
                        Are you really sure that you want to Request Quotation?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <ConfirmDeleteButton id={props.id}></ConfirmDeleteButton>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}