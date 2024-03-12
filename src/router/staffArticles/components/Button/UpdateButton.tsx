import {
    DropdownMenuItem,
} from "@/components/ui/Dropdown-menu"
import { useNavigate, useLocation } from "react-router-dom"

interface Props {
    id: string
}

export const UpdateButton: React.FC<Props> = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <DropdownMenuItem onClick={() => navigate(`${location.pathname}/${props.id}/update`)}>Update</DropdownMenuItem>
    )
}