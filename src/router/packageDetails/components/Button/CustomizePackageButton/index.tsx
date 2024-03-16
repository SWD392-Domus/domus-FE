import {
    Dialog,
    DialogTrigger,
    // DialogContent,
    // DialogDescription,
    // DialogFooter,
    // DialogHeader,
    // DialogTitle,
    // DialogClose
} from "@/components/ui/Dialog";
// import { ConfirmButton } from "./ConfirmButton";
import { Button } from '@/components/ui/Button/Button';
import PackageDetailPopUp from "../../PackageDetailPopUp";

interface Props {
    id: string
}

export const CustomizePackageButton: React.FC<Props> = () => {
    return (
        // <Dialog>
        //     <DialogTrigger>
        //         <Button variant={'yellowCustom'} className="cursor-pointer w-40">Customize Package</Button></DialogTrigger>
        //     <DialogContent className="sm:max-w-[425px]">
        //         <DialogHeader>
        //             <DialogTitle className="mb-2">Customize Package?</DialogTitle>
        //             <DialogDescription>
        //                 Customize This Package will make you lose the discount!
        //                 Do you really want to Customize?
        //             </DialogDescription>
        //         </DialogHeader>
        //         <DialogFooter>
        //             <DialogClose>
        //                 <ConfirmButton id={props.id}></ConfirmButton>
        //             </DialogClose>
        //         </DialogFooter>
        //     </DialogContent>
        // </Dialog>
        <Dialog>
            <DialogTrigger>
                <Button variant={'yellowCustom'} className="cursor-pointer w-40">Customize Package</Button>
            </DialogTrigger>
            <PackageDetailPopUp></PackageDetailPopUp>
        </Dialog >
    )
}