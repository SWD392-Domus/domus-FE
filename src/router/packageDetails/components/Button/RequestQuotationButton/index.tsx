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
import { ConfirmButton } from "./ConfirmButton";
import { Button } from '@/components/ui/Button/Button';

interface Props {
    id: string
}

export const RequestQuotationButton: React.FC<Props> = (props) => {
    return (
        <Dialog>
            <DialogTrigger><Button className="cursor-pointer w-40">Request Quotation</Button></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="mb-2">Request Quotation?</DialogTitle>
                    <DialogDescription>
                        Are you really sure that you want to Request Quotation?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <ConfirmButton id={props.id}></ConfirmButton>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}