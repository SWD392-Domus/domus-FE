import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select"
interface Props {
    setSearchField: React.Dispatch<React.SetStateAction<string>>
}

type Field = {
    name: string,
    value: string
}

export const SearchByButton: React.FC<Props> = (props) => {
    const handleClick = (field: string) => {
        props.setSearchField(field)
    }
    const searchFields: Field[] =
        [
            { name: "Id", value: "id" },
            { name: "User Name", value: "userName" },
            { name: "Full Name", value: "fullName" },
            { name: "Gender", value: "gender" },
            { name: "Email", value: "email" },
            { name: "Address", value: "address" },
        ]
    return (
        <Select onValueChange={(value) => handleClick(value)}>
            <SelectTrigger className="max-w-fit">
                <SelectValue placeholder="Search By" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Search By </SelectLabel>
                    {searchFields
                        .map((field) => {
                            return (
                                <SelectItem
                                    key={field.value}
                                    value={field.value}
                                >
                                    {field.name}
                                </SelectItem>
                            )
                        })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}