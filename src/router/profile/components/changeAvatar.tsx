import React from "react";
import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button/Button";
interface Props {
    // define your props here
}

const changeAvatar: React.FC<Props> = (props) => {
    return (
        <div>
            <Dialog>
                <DialogTrigger className="underline">
                    Change Password
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Change password</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when
                            you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default changeAvatar;
