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

interface Props {
    // id: string
}

function handleRemove() {
    console.log('Remove');
}

export const RemoveButton: React.FC<Props> = (props) => {
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