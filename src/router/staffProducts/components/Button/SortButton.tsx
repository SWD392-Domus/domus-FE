import { ChevronDown, ChevronUp } from "lucide-react"

interface Props {
    sortField: string;
    setSortField: React.Dispatch<React.SetStateAction<string>>;
    setDescending: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SortButton: React.FC<Props> = (props) => {
    return (
        <div className="flex flex-col max-w-fit">
            <ChevronUp className="ml-1 h-2 w-2 cursor-pointer"
                onClick={() => { props.setSortField(props.sortField); props.setDescending(false) }} />
            <ChevronDown className="ml-1 h-2 w-2 cursor-pointer"
                onClick={() => { props.setSortField(props.sortField); props.setDescending(true) }} />
        </div>
    )
}