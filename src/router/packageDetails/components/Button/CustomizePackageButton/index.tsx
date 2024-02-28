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

export const CustomizePackageButton: React.FC<Props> = (props) => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={'yellowCustom'} className="cursor-pointer w-40">Customize Package</Button></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="mb-2">Customize Package?</DialogTitle>
                    <DialogDescription>
                        Customize This Package will make you lose the discount!
                        Do you really want to Customize?
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