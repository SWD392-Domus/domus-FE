import { Input } from "@/components/ui/Input"
import { SearchByButton } from "../Button/SearchByButton";

interface Props {
    setSearchField: React.Dispatch<React.SetStateAction<string>>;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchField: React.FC<Props> = (props) => {
    return (
        <>
            <SearchByButton setSearchField={props.setSearchField}></SearchByButton>
            <Input
                placeholder="Search"
                onChange={(e) => props.setSearchValue(e.target.value)}
                className="basis-1/2"
            />
        </>

    )
}