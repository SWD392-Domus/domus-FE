import { Button } from "@/components/ui/Button/Button"
import { Link } from "react-router-dom"

import {
    ClipboardIcon, PlusCircledIcon
} from "@radix-ui/react-icons"



function onPrint() {

}



export const CreateButton = () => {
    return (
        <Link to="/staff/contracts/newContract">
            <Button className="">
                <PlusCircledIcon className="my-auto mr-2" />
                Contract
            </Button>
        </Link>
    )
}

export const PrintButton = () => {
    return (
        <Button onClick={onPrint} className="h-8" >
            <ClipboardIcon className="my-auto mr-1" /> Print
        </Button>
    )
}
