import { deleteProduct } from "../../usecase/deleteProduct"
import { Button } from "@/components/ui/Button/Button"

interface Props {
    id: string
}

export const ConfirmDeleteButton: React.FC<Props> = (props) => {
    return (
        <Button onClick={() => deleteProduct(props.id)} className="bg-red-600" >Delete</Button>
    )
}